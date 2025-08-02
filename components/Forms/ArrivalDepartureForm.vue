<template>
  <div class="flex flex-col w-full">
    <!-- Personal Information Section -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-1 flex items-center">
        <i class="bx bx-user mr-2 text-gray-600"></i>
        Personal Information
      </h3>
      <p class="text-sm text-gray-500 mb-6">We'll use this information to contact you about your booking</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Full Name -->
        <div class="relative w-full">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2" 
          :class="bookingStore.errors.name ? 'text-red-500' : ''">Full Name *</label>
          <input
            v-model="bookingStore.formData.step1.name"
            type="text"
            placeholder="Enter your full name"
            class="w-full p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            :class="bookingStore.errors.name ? 'border-red-400 focus:ring-red-400' : ''"
          />
          <p v-if="bookingStore.errors.name" class="text-red-500 text-sm mt-1">{{ bookingStore.errors.name }}</p>
        </div>

        <!-- Email -->
        <div class="relative w-full">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.email ? 'text-red-500' : ''">Email Address *</label>
          <input
            v-model="bookingStore.formData.step1.email"
            type="email"
            placeholder="your.email@example.com"
            class="w-full p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            :class="bookingStore.errors.email ? 'border-red-400 focus:ring-red-400' : ''"
          />
          <p v-if="bookingStore.errors.email" class="text-red-500 text-sm mt-1">{{ bookingStore.errors.email }}</p>
        </div>

        <!-- Phone -->
        <div class="relative w-full md:col-span-2">
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.phone ? 'text-red-500' : ''">Phone Number *</label>
          <div class="flex">
            <select class="px-3 py-4 border border-r-0 border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200">
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+33">🇫🇷 +33</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+39">🇮🇹 +39</option>
              <option value="+34">🇪🇸 +34</option>
              <option value="+31">🇳🇱 +31</option>
              <option value="+41">🇨🇭 +41</option>
              <option value="+43">🇦🇹 +43</option>
              <option value="+32">🇧🇪 +32</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+966">🇸🇦 +966</option>
              <option value="+65">🇸🇬 +65</option>
              <option value="+86">🇨🇳 +86</option>
              <option value="+81">🇯🇵 +81</option>
              <option value="+82">🇰🇷 +82</option>
              <option value="+91">🇮🇳 +91</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+1">🇨🇦 +1</option>
            </select>
            <input
              v-model="bookingStore.formData.step1.phone"
              type="tel"
              placeholder="555 123 4567"
              class="flex-1 p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              :class="bookingStore.errors.phone ? 'border-red-400 focus:ring-red-400' : ''"
            />
          </div>
          <p v-if="bookingStore.errors.phone" class="text-red-500 text-sm mt-1">{{ bookingStore.errors.phone }}</p>
        </div>
      </div>
    </div>
    
    <!-- Flight Information Section -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-1 flex items-center">
        <i class="bx bx-plane mr-2 text-gray-600"></i>
        Flight Information
      </h3>
      <p class="text-sm text-gray-500 mb-6">Tell us about your flight details</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Airport -->
        <div class="flex flex-col w-full">
          <label for="airport" class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.airport || bookingStore.errors.airportSecondary ? 'text-red-500' : ''">Airport *</label>
          <FormsAirportSearch />
          <p v-if="bookingStore.errors.airport || bookingStore.errors.airportSecondary" class="text-red-500 text-sm mt-1">
            {{ bookingStore.errors.airport || bookingStore.errors.airportSecondary }}
          </p>
        </div>

        <!-- Flight Number -->
        <div class="relative w-full">
          <label for="flightNumber" class="block text-sm font-medium text-gray-600 mb-2">Flight Number (Optional)</label>
          <input
            v-model="bookingStore.formData.step1.flight"
            type="text"
            placeholder="e.g. AA123, BA456"
            class="w-full p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
          />
          <p class="text-xs text-gray-500 mt-1">You can add this later if you don't have it yet</p>
        </div>

        <!-- Date & Time -->
        <div class="w-full md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.date || bookingStore.errors.time ? 'text-red-500' : ''">Flight Date & Time *</label>
          <FormsDateTimePicker 
            :dateValue="bookingStore.formData.step1.date"
            :timeValue="bookingStore.formData.step1.time"
            @update:dateValue="bookingStore.formData.step1.date = $event"
            @update:timeValue="bookingStore.formData.step1.time = $event"
          />
        </div>
      </div>
    </div>
    
    <!-- Service Details Section -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-1 flex items-center">
        <i class="bx bx-cog mr-2 text-gray-600"></i>
        Service Details
      </h3>
      <p class="text-sm text-gray-500 mb-6">Additional information about your service needs</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Number of Passengers -->
        <div class="flex flex-col w-full">
          <label for="passengers" class="block text-sm font-medium text-gray-700 mb-2">Number of Passengers *</label>
          <FormsPassengerSelector />
        </div>
        
        <!-- Number of Bags -->
        <div class="relative w-full">
          <label for="bags" class="block text-sm font-medium text-gray-600 mb-2">Number of Bags (Optional)</label>
          <input
            v-model="bookingStore.formData.step1.numberOfBags"
            type="number"
            min="0"
            placeholder="0"
            class="w-full p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
          />
          <p class="text-xs text-gray-500 mt-1">Leave blank if no checked bags</p>
        </div>


        <!-- Notes / Extra Requests -->
        <div class="relative md:col-span-2 w-full">
          <label for="extraRequest" class="block text-sm font-medium text-gray-600 mb-2">Special Requests (Optional)</label>
          <textarea
            v-model="bookingStore.formData.step1.extraRequest"
            rows="4"
            placeholder="Any special requirements, dietary restrictions, accessibility needs, or other requests..."
            class="w-full p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">Help us provide the best service for your needs</p>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";

// Use the store in this component
const bookingStore = useBookingStore();
</script>
