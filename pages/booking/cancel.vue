<template>
  <div>
    <navbar />
    <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div class="max-w-2xl w-full">
        <!-- Cancel Card -->
        <div class="bg-white shadow-2xl border border-gray-100 overflow-hidden text-center">
          <div class="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-8">
            <div class="flex items-center justify-center w-20 h-20 bg-white rounded-full mx-auto mb-4">
              <i class="bx bx-x text-4xl text-red-500"></i>
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Payment Cancelled</h1>
            <p class="text-orange-100">Your payment was not processed</p>
          </div>

          <div class="p-8">
            <!-- Cancellation Message -->
            <div class="bg-orange-50 border border-orange-200 p-6 mb-6">
              <h3 class="text-lg font-semibold text-orange-800 mb-3 flex items-center justify-center">
                <i class="bx bx-info-circle mr-2 text-orange-600"></i>
                What Happened?
              </h3>
              <p class="text-orange-700 mb-4">
                Your payment was cancelled and no charges were made to your account. 
                Your booking is still available and you can complete the payment at any time.
              </p>
            </div>

            <!-- Booking Status -->
            <div v-if="bookingStore.bookingConfirmed" class="bg-gray-50 border border-gray-200 p-6 mb-6 text-left">
              <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i class="bx bx-calendar mr-2 text-gray-600"></i>
                Your Booking Status
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label class="font-medium text-gray-500 uppercase tracking-wide">Booking Reference</label>
                  <p class="text-lg font-bold text-gray-800">{{ bookingStore.bookingConfirmed.bookingReference }}</p>
                </div>
                <div>
                  <label class="font-medium text-gray-500 uppercase tracking-wide">Status</label>
                  <p class="text-orange-600 font-semibold">Payment Pending</p>
                </div>
                <div>
                  <label class="font-medium text-gray-500 uppercase tracking-wide">Service Type</label>
                  <p class="text-gray-800 capitalize">{{ bookingStore.bookingType }}</p>
                </div>
                <div>
                  <label class="font-medium text-gray-500 uppercase tracking-wide">Total Amount</label>
                  <p class="text-lg font-bold text-gray-800">${{ bookingStore.bookingConfirmed.totalPrice?.toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <!-- Next Steps -->
            <div class="bg-blue-50 border border-blue-200 p-6 mb-6 text-left">
              <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <i class="bx bx-lightbulb mr-2 text-blue-600"></i>
                What Can You Do?
              </h3>
              <ul class="space-y-3 text-sm text-blue-700">
                <li class="flex items-start">
                  <i class="bx bx-right-arrow-alt mr-2 mt-0.5 text-blue-600"></i>
                  <span>Try the payment again with the same or different payment method</span>
                </li>
                <li class="flex items-start">
                  <i class="bx bx-right-arrow-alt mr-2 mt-0.5 text-blue-600"></i>
                  <span>Contact our support team if you experienced any technical issues</span>
                </li>
                <li class="flex items-start">
                  <i class="bx bx-right-arrow-alt mr-2 mt-0.5 text-blue-600"></i>
                  <span>Your booking details are saved and won't be lost</span>
                </li>
                <li class="flex items-start">
                  <i class="bx bx-right-arrow-alt mr-2 mt-0.5 text-blue-600"></i>
                  <span>Payment must be completed at least 24 hours before your flight</span>
                </li>
              </ul>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col md:flex-row gap-4 mb-6">
              <NuxtLink
                to="/booking"
                class="flex-1 relative px-6 py-4 bg-green-600 text-white text-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <i class="bx bx-credit-card"></i>
                <span>Try Payment Again</span>
              </NuxtLink>
              
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
            </div>

            <!-- Support Info -->
            <div class="pt-6 border-t border-gray-200 text-center">
              <p class="text-sm text-gray-600 mb-2">Need help with your payment?</p>
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
              <p class="text-xs text-gray-500 mt-3">
                Our support team is available 24/7 to assist you with any payment issues
              </p>
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

// Set page title
useHead({
  title: 'Payment Cancelled - VIP Air Assist',
  meta: [
    { name: 'description', content: 'Your payment was cancelled. You can try again or contact support for assistance.' }
  ]
});
</script>