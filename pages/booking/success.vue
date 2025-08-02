<template>
  <div>
    <navbar />
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div class="max-w-2xl w-full">
        <!-- Success Card -->
        <div class="bg-white shadow-2xl border border-gray-100 overflow-hidden text-center">
          <div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8">
            <div class="flex items-center justify-center w-20 h-20 bg-white rounded-full mx-auto mb-4">
              <i class="bx bx-check text-4xl text-green-500"></i>
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p class="text-green-100">Your VIP service has been confirmed</p>
          </div>

          <div class="p-8">
            <!-- Booking Details -->
            <div v-if="bookingStore.bookingConfirmed" class="bg-gray-50 border border-gray-200 p-6 mb-6 text-left">
              <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i class="bx bx-receipt mr-2 text-gray-600"></i>
                Booking Confirmation
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label class="font-medium text-gray-500 uppercase tracking-wide">Booking Reference</label>
                  <p class="text-lg font-bold text-gray-800">{{ bookingStore.bookingConfirmed.bookingReference }}</p>
                </div>
                <div>
                  <label class="font-medium text-gray-500 uppercase tracking-wide">Total Paid</label>
                  <p class="text-lg font-bold text-green-600">${{ bookingStore.bookingConfirmed.totalPrice?.toFixed(2) }}</p>
                </div>
                <div>
                  <label class="font-medium text-gray-500 uppercase tracking-wide">Service Type</label>
                  <p class="text-gray-800 capitalize">{{ bookingStore.bookingType }}</p>
                </div>
                <div>
                  <label class="font-medium text-gray-500 uppercase tracking-wide">Status</label>
                  <p class="text-gray-800">{{ bookingStore.bookingConfirmed.bookingStatus }}</p>
                </div>
              </div>
            </div>

            <!-- What Happens Next -->
            <div class="bg-blue-50 border border-blue-200 p-6 mb-6 text-left">
              <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <i class="bx bx-info-circle mr-2 text-blue-600"></i>
                What Happens Next?
              </h3>
              <ul class="space-y-3 text-sm text-blue-700">
                <li class="flex items-start">
                  <i class="bx bx-check-circle mr-2 mt-0.5 text-blue-600"></i>
                  <span>A confirmation email has been sent to your email address</span>
                </li>
                <li class="flex items-start">
                  <i class="bx bx-check-circle mr-2 mt-0.5 text-blue-600"></i>
                  <span>Our VIP team will contact you 24-48 hours before your flight</span>
                </li>
                <li class="flex items-start">
                  <i class="bx bx-check-circle mr-2 mt-0.5 text-blue-600"></i>
                  <span>Look out for SMS updates about your service details</span>
                </li>
                <li class="flex items-start">
                  <i class="bx bx-check-circle mr-2 mt-0.5 text-blue-600"></i>
                  <span>Need help? Contact our support team anytime</span>
                </li>
              </ul>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col md:flex-row gap-4">
              <NuxtLink
                to="/"
                class="flex-1 relative px-6 py-4 text-black border border-black text-lg leading-[108%] group overflow-hidden transition-all duration-300"
              >
                <span class="absolute inset-0 w-0 bg-black/70 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                <div class="flex items-center justify-center space-x-2 relative z-10 transition-colors duration-500 group-hover:text-white">
                  <i class="bx bx-home"></i>
                  <span>Return Home</span>
                </div>
              </NuxtLink>
              
              <button
                @click="downloadConfirmation"
                class="flex-1 px-6 py-4 bg-green-600 text-white text-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <i class="bx bx-download"></i>
                <span>Download Confirmation</span>
              </button>
            </div>

            <!-- Support Info -->
            <div class="mt-8 pt-6 border-t border-gray-200 text-center">
              <p class="text-sm text-gray-600 mb-2">Need assistance with your booking?</p>
              <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                <a href="mailto:info@vipairassist.com" class="flex items-center text-blue-600 hover:text-blue-800">
                  <i class="bx bx-envelope mr-1"></i>
                  info@vipairassist.com
                </a>
                <a href="tel:+971506964878" class="flex items-center text-blue-600 hover:text-blue-800">
                  <i class="bx bx-phone mr-1"></i>
                  +971506964878
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();

// Download confirmation function
const downloadConfirmation = () => {
  // Create a simple confirmation PDF or text file
  const confirmationData = {
    bookingReference: bookingStore.bookingConfirmed?.bookingReference,
    totalPrice: bookingStore.bookingConfirmed?.totalPrice,
    bookingType: bookingStore.bookingType,
    status: bookingStore.bookingConfirmed?.bookingStatus,
    customerName: bookingStore.formData.step1.name,
    email: bookingStore.formData.step1.email,
    date: new Date().toLocaleDateString()
  };

  const confirmationText = `
VIP Air Assist - Booking Confirmation

Booking Reference: ${confirmationData.bookingReference || 'N/A'}
Customer Name: ${confirmationData.customerName || 'N/A'}
Email: ${confirmationData.email || 'N/A'}
Service Type: ${confirmationData.bookingType || 'N/A'}
Total Paid: $${confirmationData.totalPrice?.toFixed(2) || '0.00'}
Status: ${confirmationData.status || 'N/A'}
Date: ${confirmationData.date}

Thank you for choosing VIP Air Assist!
Our team will contact you 24-48 hours before your flight.

For support: info@vipairassist.com | +971506964878
  `;

  // Create and download the file
  const element = document.createElement('a');
  const file = new Blob([confirmationText], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `VIP-Confirmation-${confirmationData.bookingReference || 'Unknown'}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// Set page title
useHead({
  title: 'Payment Successful - VIP Air Assist',
  meta: [
    { name: 'description', content: 'Your VIP Air Assist booking has been confirmed. Thank you for your payment.' }
  ]
});
</script>
