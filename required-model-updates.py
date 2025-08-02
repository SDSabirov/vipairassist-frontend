# Required updates to your Booking model
# Add these fields to both Booking and BookingTransit models:

"""
# In your booking/models.py, add these fields to your Booking model:

class Booking(models.Model):
    # ... your existing fields ...
    
    # Add these new payment-related fields:
    payment_status = models.CharField(
        max_length=20, 
        choices=[
            ('PENDING', 'Pending'),
            ('PAID', 'Paid'),
            ('FAILED', 'Failed'),
            ('REFUNDED', 'Refunded')
        ],
        default='PENDING'
    )
    payment_method = models.CharField(
        max_length=20,
        choices=[
            ('paypal', 'PayPal'),
            ('card', 'Credit Card')
        ],
        blank=True,
        null=True
    )
    payment_transaction_id = models.CharField(max_length=100, blank=True, null=True)
    payment_date = models.DateTimeField(blank=True, null=True)
    
    # Update booking_status choices if needed:
    booking_status = models.CharField(
        max_length=20,
        choices=[
            ('PENDING', 'Pending'),
            ('PENDING_PAYMENT', 'Pending Payment'),
            ('CONFIRMED', 'Confirmed'),
            ('CANCELLED', 'Cancelled'),
            ('COMPLETED', 'Completed')
        ],
        default='PENDING'
    )

# Also add the same fields to BookingTransit model

class BookingTransit(models.Model):
    # ... your existing fields ...
    
    # Add the same payment fields here
    payment_status = models.CharField(max_length=20, default='PENDING')
    payment_method = models.CharField(max_length=20, blank=True, null=True)
    payment_transaction_id = models.CharField(max_length=100, blank=True, null=True)
    payment_date = models.DateTimeField(blank=True, null=True)

# Create this new model for passenger data:
class BookingPassenger(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='passengers', null=True, blank=True)
    booking_transit = models.ForeignKey(BookingTransit, on_delete=models.CASCADE, related_name='passengers', null=True, blank=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'booking_passengers'
    
    def __str__(self):
        return f"{self.name} (Age: {self.age})"

# To create these model changes, run:
# python manage.py makemigrations
# python manage.py migrate
"""