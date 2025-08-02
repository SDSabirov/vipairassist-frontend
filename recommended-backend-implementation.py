# Recommended Backend Implementation
# Add this to your Django views.py

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
import paypalrestsdk
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class ProcessPaymentAndFinalizeBooking(APIView):
    """
    Process payment and finalize booking in a single atomic transaction.
    This ensures data consistency and proper error handling.
    """
    
    def post(self, request, *args, **kwargs):
        data = request.data
        booking_reference = data.get('booking_reference')
        payment_method = data.get('payment_method')
        payment_data = data.get('payment_data')
        passenger_data = data.get('passenger_data', [])
        
        logger.info(f"Processing payment for booking: {booking_reference}")
        
        try:
            # 1. Get the booking
            try:
                booking = Booking.objects.get(booking_reference=booking_reference)
            except Booking.DoesNotExist:
                try:
                    booking = BookingTransit.objects.get(booking_reference=booking_reference)
                except BookingTransit.DoesNotExist:
                    return Response({'error': 'Booking not found'}, status=404)
            
            # 2. Verify payment with payment provider
            payment_verified = False
            payment_transaction_id = None
            
            if payment_method == 'paypal':
                payment_verified, payment_transaction_id = self.verify_paypal_payment(
                    payment_data.get('orderID'),
                    payment_data.get('payerID')
                )
            elif payment_method == 'card':
                # Card payments are also processed through PayPal
                payment_verified, payment_transaction_id = self.verify_paypal_payment(
                    payment_data.get('orderID'),
                    payment_data.get('payerID')
                )
            
            # 3. Update booking with passenger data and payment status
            if passenger_data:
                # Save passenger information
                for passenger in passenger_data:
                    BookingPassenger.objects.create(
                        booking=booking,
                        name=passenger.get('name'),
                        age=passenger.get('age')
                    )
            
            # 4. Update booking status based on payment result
            if payment_verified:
                booking.payment_status = 'PAID'
                booking.booking_status = 'CONFIRMED'
                booking.payment_transaction_id = payment_transaction_id
                booking.payment_method = payment_method
                booking.payment_date = datetime.now()
                
                # Send confirmation email
                self.send_confirmation_email(booking)
                
                logger.info(f"Payment successful for booking: {booking_reference}")
            else:
                booking.payment_status = 'FAILED'
                booking.booking_status = 'PENDING_PAYMENT'
                
                logger.warning(f"Payment failed for booking: {booking_reference}")
            
            booking.save()
            
            # 5. Calculate final totals (same logic as step 3)
            services = booking.selected_services.all()  # Adjust based on your model
            total_price = self.calculate_total_price(booking, services)
            
            # 6. Return response
            return Response({
                'success': payment_verified,
                'booking_reference': booking.booking_reference,
                'booking_status': booking.booking_status,
                'payment_status': booking.payment_status,
                'payment_transaction_id': payment_transaction_id,
                'services': self.serialize_services(services),
                'total_price': total_price,
                'message': 'Payment processed successfully' if payment_verified else 'Payment failed'
            }, status=200)
            
        except Exception as e:
            logger.error(f"Error processing payment for booking {booking_reference}: {str(e)}")
            return Response({
                'error': 'Payment processing failed',
                'details': str(e)
            }, status=500)
    
    def verify_paypal_payment(self, order_id, payer_id):
        """
        Verify PayPal payment by capturing the order
        Returns (is_verified, transaction_id)
        """
        try:
            # Configure PayPal
            paypalrestsdk.configure({
                "mode": settings.PAYPAL_MODE,  # sandbox or live
                "client_id": settings.PAYPAL_CLIENT_ID,
                "client_secret": settings.PAYPAL_CLIENT_SECRET
            })
            
            # Get the payment/order
            payment = paypalrestsdk.Payment.find(order_id)
            
            if payment:
                # Execute the payment
                if payment.execute({"payer_id": payer_id}):
                    logger.info(f"PayPal payment executed successfully: {payment.id}")
                    return True, payment.id
                else:
                    logger.error(f"PayPal payment execution failed: {payment.error}")
                    return False, None
            else:
                logger.error(f"PayPal payment not found: {order_id}")
                return False, None
                
        except Exception as e:
            logger.error(f"PayPal verification error: {str(e)}")
            return False, None
    
    def send_confirmation_email(self, booking):
        """Send booking confirmation email"""
        # Implement your email sending logic here
        pass
    
    def calculate_total_price(self, booking, services):
        """Calculate total price including services and extras"""
        # Implement your pricing calculation logic here
        # This should match the logic from your step 3 calculation
        return 0.0
    
    def serialize_services(self, services):
        """Serialize services for response"""
        # Return serialized services data
        return []

# Add to your urls.py:
# path('process-payment-and-finalize/', ProcessPaymentAndFinalizeBooking.as_view(), name='process-payment-and-finalize'),