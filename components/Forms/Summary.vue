<template>
  <div class="w-full">
    <!-- Enhanced Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Review Your Booking</h2>
      <p class="text-gray-600 text-lg">Please confirm all details before proceeding to payment</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Journey Details Card -->
        <div class="bg-white shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gray-50 p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 flex items-center">
              <i class="bx bx-plane mr-2 text-gray-600"></i>
              Journey Details
            </h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Service Type</label>
                  <p class="text-lg font-semibold text-gray-800 capitalize">{{ bookingStore.bookingType }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Airport</label>
                  <p class="text-lg font-semibold text-gray-800">{{ bookingStore.formData.step1.airport.name }} ({{ bookingStore.formData.step1.airport.code }})</p>
                </div>
              </div>
              <div class="space-y-4">
                <div v-if="bookingStore.formData.step1.flight">
                  <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Flight Number</label>
                  <p class="text-lg font-semibold text-gray-800">{{ bookingStore.formData.step1.flight }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Date & Time</label>
                  <p class="text-lg font-semibold text-gray-800">{{ bookingStore.formData.step1.date }} at {{ bookingStore.formData.step1.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Selected Services Card -->
        <div class="bg-white shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gray-50 p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 flex items-center">
              <i class="bx bx-cog mr-2 text-gray-600"></i>
              Selected Services
            </h3>
          </div>
          <div class="p-6">
            <!-- Main Services -->
            <div v-if="bookingStore.formData.step2.services.length > 0" class="space-y-4 mb-6">
              <h4 class="font-semibold text-gray-700 mb-3">VIP Services:</h4>
              <div 
                v-for="(service, index) in bookingStore.formData.step2.services" 
                :key="index"
                class="flex items-center justify-between p-4 bg-gray-50 border-l-4 border-black"
              >
                <div class="flex items-center">
                  <i class="bx bx-check-circle text-green-600 mr-3"></i>
                  <span class="font-medium text-gray-800">{{ service.name }}</span>
                </div>
                <span class="text-green-600 font-bold">${{ service.total_price }}</span>
              </div>
            </div>
            
            <!-- Extra Services -->
            <div v-if="bookingStore.formData.step2.extras && bookingStore.formData.step2.extras.length > 0" class="space-y-4">
              <h4 class="font-semibold text-gray-700 mb-3">Add-on Services:</h4>
              <div 
                v-for="(extra, index) in bookingStore.formData.step2.extras" 
                :key="index"
                class="flex items-center justify-between p-4 bg-blue-50 border-l-4 border-blue-500"
              >
                <div class="flex items-center">
                  <i class="bx bx-plus-circle text-blue-600 mr-3"></i>
                  <span class="font-medium text-gray-800">{{ extra.name }}</span>
                </div>
                <span class="text-blue-600 font-bold">${{ (extra.prices[0].per_unit_price * extra.number_of_units).toFixed(2) }}</span>
              </div>
            </div>
            
            <div v-if="bookingStore.formData.step2.services.length === 0 && (!bookingStore.formData.step2.extras || bookingStore.formData.step2.extras.length === 0)" class="text-center py-8 text-gray-500">
              <i class="bx bx-info-circle text-4xl mb-2"></i>
              <p>No services selected yet</p>
            </div>
          </div>
        </div>
        
        <!-- Contact Information -->
        <div class="bg-white shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gray-50 p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 flex items-center">
              <i class="bx bx-user mr-2 text-gray-600"></i>
              Contact Information
            </h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Full Name</label>
                <p class="text-lg font-semibold text-gray-800">{{ bookingStore.formData.step1.name }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</label>
                <p class="text-lg font-semibold text-gray-800">{{ bookingStore.formData.step1.email }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Phone</label>
                <p class="text-lg font-semibold text-gray-800">{{ bookingStore.formData.step1.phone }}</p>
              </div>
              <div v-if="bookingStore.formData.step1.extraRequest">
                <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Special Requests</label>
                <p class="text-lg font-semibold text-gray-800">{{ bookingStore.formData.step1.extraRequest }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Passenger Summary -->
        <div class="bg-white shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gray-50 p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 flex items-center">
              <i class="bx bx-group mr-2 text-gray-600"></i>
              Passengers
            </h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Adults (12+ years)</span>
              <span class="font-bold text-gray-800">{{ bookingStore.formData.step1.adults }}</span>
            </div>
            <div v-if="bookingStore.formData.step1.children > 0" class="flex justify-between items-center">
              <span class="text-gray-600">Children (2-11 years)</span>
              <span class="font-bold text-gray-800">{{ bookingStore.formData.step1.children }}</span>
            </div>
            <div v-if="bookingStore.formData.step1.infants > 0" class="flex justify-between items-center">
              <span class="text-gray-600">Infants (0-2 years)</span>
              <span class="font-bold text-gray-800">{{ bookingStore.formData.step1.infants }}</span>
            </div>
            <div class="border-t pt-4 mt-4">
              <div class="flex justify-between items-center">
                <span class="font-semibold text-gray-800">Total Passengers</span>
                <span class="font-bold text-lg text-gray-800">
                  {{ bookingStore.formData.step1.adults + bookingStore.formData.step1.children + bookingStore.formData.step1.infants }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Price Summary -->
        <div class="bg-white shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gray-50 p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 flex items-center">
              <i class="bx bx-credit-card mr-2 text-gray-600"></i>
              Price Summary
            </h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Service Total</span>
              <span class="font-bold text-gray-800">${{ bookingStore.totalPrice ? bookingStore.totalPrice.toFixed(2) : '0.00' }}</span>
            </div>
            <div v-if="bookingStore.extrasTotal > 0" class="flex justify-between items-center">
              <span class="text-gray-600">Add-ons Total</span>
              <span class="font-bold text-gray-800">${{ bookingStore.extrasTotal.toFixed(2) }}</span>
            </div>
            <div class="border-t pt-4 mt-4">
              <div class="flex justify-between items-center">
                <span class="font-bold text-lg text-gray-800">Total Amount</span>
                <span class="font-bold text-2xl text-green-600">
                  ${{ (bookingStore.totalPrice + bookingStore.extrasTotal).toFixed(2) }}
                </span>
              </div>
              <p class="text-xs text-gray-500 mt-1">All taxes and fees included</p>
            </div>
          </div>
        </div>

        <!-- Ready to Proceed Section -->
        <div class="bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-xl border border-gray-100 overflow-hidden">
          <div class="p-8 text-center">
            <div class="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-4">
              <i class="bx bx-check-double text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold mb-2">Ready to Complete Your Booking?</h3>
            <p class="text-green-100 mb-4">
              Review all details above, then click "Review Complete" to proceed to secure payment.
            </p>
            <div class="flex items-center justify-center text-sm text-green-100">
              <i class="bx bx-shield-check mr-2"></i>
              <span>Your information is secure and encrypted</span>
            </div>
          </div>
        </div>
        
        <!-- Passenger Details Form -->
        <div class="bg-white shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gray-50 p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 flex items-center">
              <i class="bx bx-edit mr-2 text-gray-600"></i>
              Passenger Details
            </h3>
            <p class="text-sm text-gray-600 mt-1">Please provide details for all passengers</p>
          </div>
          <div class="p-6">
            <FormsPassengerInput />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();
</script>