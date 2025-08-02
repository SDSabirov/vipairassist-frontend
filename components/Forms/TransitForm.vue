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
      <!--Name-->
      <div class="relative w-full">
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.name ? 'text-red-500' : ''"
          >Full Name *
        </label>
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
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.email ? 'text-red-500' : ''"
          >Email Address *</label
        >
        <input
          v-model="bookingStore.formData.step1.email"
          type="email"
          placeholder="your.email@example.com"
          class="w-full p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
          :class="
            bookingStore.errors.email ? 'border-red-400 focus:ring-red-400' : ''
          "
        />
        <p v-if="bookingStore.errors.email" class="text-red-500 text-sm mt-1">{{ bookingStore.errors.email }}</p>
      </div>

      <!-- Phone -->
      <div class="relative w-full md:col-span-2">
        <label
          for="phone"
          class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.phone ? 'text-red-500' : ''"
          >Phone Number *</label
        >
        <div class="flex">
          <select class="px-3 py-4 border border-r-0 border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200">
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+33">🇫🇷 +33</option>
            <option value="+49">🇩🇪 +49</option>
            <option value="+971">🇦🇪 +971</option>
            <option value="+966">🇸🇦 +966</option>
            <option value="+65">🇸🇬 +65</option>
          </select>
          <input
            v-model="bookingStore.formData.step1.phone"
            type="tel"
            placeholder="555 123 4567"
            class="flex-1 p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            :class="
              bookingStore.errors.phone ? 'border-red-400 focus:ring-red-400' : ''
            "
          />
        </div>
        <p v-if="bookingStore.errors.phone" class="text-red-500 text-sm mt-1">{{ bookingStore.errors.phone }}</p>
      </div>

      <!-- Number of Passengers -->
      <div class="flex flex-col w-full">
        <label
          for="passengers"
          class="block text-sm font-medium text-gray-700 mb-2"
          >Number of Passengers *</label
        >
        <FormsPassengerSelector />
      </div>

      <!-- Number of Bags -->
      <div class="relative w-full">
        <label
          for="bags"
          class="block text-sm font-medium text-gray-600 mb-2"
          >Number of Bags (Optional)</label
        >
        <input
          v-model="bookingStore.formData.step1.numberOfBags"
          type="number"
          min="0"
          placeholder="0"
          class="w-full p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
        />
        <p class="text-xs text-gray-500 mt-1">Leave blank if no checked bags</p>
      </div>
    </div>
    </div>

    <!-- Departure Flight Section -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-1 flex items-center">
        <i class="bx bx-plane-take-off mr-2 text-gray-600"></i>
        Departure Flight
      </h3>
      <p class="text-sm text-gray-500 mb-6">Details about your departure flight</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!--Departure Airport-->

      <div class="flex flex-col w-full">
        <label
          for="airport"
          class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.airport ? 'text-red-500' : ''"
          >Departure Airport *</label
        >
        <FormsAirportSearch v-model="bookingStore.formData.step1.airport" />
        <p v-if="bookingStore.errors.airport" class="text-red-500 text-sm mt-1">{{ bookingStore.errors.airport }}</p>
      </div>

      <!--departure Flight Number -->
      <div class="relative w-full">
        <label
          for="flightNumber"
          class="block text-sm font-medium text-gray-600 mb-2"
          >Departure Flight Number (Optional)</label
        >
        <input
          v-model="bookingStore.formData.step1.flight"
          type="text"
          placeholder="e.g. AA123, BA456"
          class="w-full p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
        />
      </div>

      <!--Departure Date & Time -->
      <div class="w-full md:col-span-2">
        <label
          class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.date || bookingStore.errors.time ? 'text-red-500' : ''"
          >Departure Date & Time *</label
        >
        <FormsDateTimePicker 
          :dateValue="bookingStore.formData.step1.date"
          :timeValue="bookingStore.formData.step1.time"
          @update:dateValue="bookingStore.formData.step1.date = $event"
          @update:timeValue="bookingStore.formData.step1.time = $event"
        />
      </div>
    </div>
    </div>

    <!-- Arrival Flight Section -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-1 flex items-center">
        <i class="bx bx-plane-land mr-2 text-gray-600"></i>
        Arrival Flight
      </h3>
      <p class="text-sm text-gray-500 mb-6">Details about your arrival flight</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!--Arrival Airport -->
      <div class="flex flex-col w-full">
        <label
          for="airport"
          class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.airportSecondary ? 'text-red-500' : ''"
          >Arrival Airport *</label
        >
        <FormsAirportSearch v-model="bookingStore.formData.step1.airportSecondary"/>
        <p v-if="bookingStore.errors.airportSecondary" class="text-red-500 text-sm mt-1">{{ bookingStore.errors.airportSecondary }}</p>
      </div>

      <!--Arrival Flight Number -->
      <div class="relative w-full">
        <label
          for="flightNumber"
          class="block text-sm font-medium text-gray-600 mb-2"
          >Arrival Flight Number (Optional)</label
        >
        <input
          v-model="bookingStore.formData.step1.flightSecondary"
          type="text"
          placeholder="e.g. BA789, LH321"
          class="w-full p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
        />
      </div>

      <!--Arrival Date & Time -->
      <div class="w-full md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2"
          :class="bookingStore.errors.dateSecondary || bookingStore.errors.timeSecondary ? 'text-red-500' : ''">Arrival Date & Time *</label>
          <FormsDateTimePicker 
            :dateValue="bookingStore.formData.step1.dateSecondary"
            :timeValue="bookingStore.formData.step1.timeSecondary"
            @update:dateValue="bookingStore.formData.step1.dateSecondary = $event"
            @update:timeValue="bookingStore.formData.step1.timeSecondary = $event"
          />
        </div>

      <!--Notes Extra requests-->
      <div class="relative md:col-span-2">
        <label for="Description" class="block text-sm font-medium text-gray-600 mb-2"
          >Special Requests (Optional)</label
        >
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
