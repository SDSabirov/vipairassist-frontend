<template>
  <div class="flex flex-col w-full items-center justify-center">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <!-- Full Name -->
        <div class="relative h-[62px]">
          <label for="name" class="absolute -top-2 bg-white px-2 text-sm" 
          :class="bookingStore.errors.name ? 'text-red-500' : ''">Full Name </label>
          <input
            v-model="bookingStore.formData.step1.name"
            type="text"
            placeholder="Full Name"
            class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
            :class="bookingStore.errors.name ? 'border-red-500 ring-red-500' : ''"
          />
        </div>

        <!-- Email -->
        <div class="relative h-[62px]">
          <label for="email" class="absolute -top-2 bg-white px-2 text-sm"
          :class="bookingStore.errors.email ? 'text-red-500' : ''">Email</label>
          <input
            v-model="bookingStore.formData.step1.email"
            type="email"
            placeholder="Email"
            class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
            :class="bookingStore.errors.email ? 'border-red-500 ring-red-500' : ''"
          />
        </div>

        <!-- Phone -->
        <div class="relative h-[62px]">
          <label for="phone" class="absolute -top-2 bg-white px-2 text-sm"
          :class="bookingStore.errors.phone ? 'text-red-500' : ''">Phone</label>
          <input
            v-model="bookingStore.formData.step1.phone"
            type="text"
            placeholder="Phone"
            class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
            :class="bookingStore.errors.phone ? 'border-red-500 ring-red-500' : ''"
          />
        </div>

        <!-- Airport -->
        <div class="flex flex-col relative h-[62px]">
          <label for="airport" class="absolute -top-2 bg-white px-2 text-sm z-10"
          :class="bookingStore.errors.airport ? 'text-red-500' : ''">Airport</label>
          <FormsAirportSearch />
        </div>

        <!-- Flight Number -->
        <div class="relative h-[62px]">
          <label for="flightNumber" class="absolute -top-2 bg-white px-2 text-sm"
          :class="bookingStore.errors.flight ? 'text-red-500' : ''">Flight Number</label>
          <input
            v-model="bookingStore.formData.step1.flight"
            type="text"
            placeholder="Flight Number"
            class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
            :class="bookingStore.errors.flight ? 'border-red-500 ring-red-500' : ''"
          />
        </div>

        <!-- Number of Passengers -->
        <div class="flex w-full h-[62px] relative">
          <label for="passengers" class="absolute -top-2 bg-white px-2 text-sm z-10">Number of Passengers</label>
          <FormsPassengerSelector />
        </div>

        <!-- Number of Bags -->
        <div class="relative h-[62px]">
          <label for="bags" class="absolute -top-2 bg-white px-2 text-sm"
          :class="bookingStore.errors.numberOfBags ? 'text-red-500' : ''">Number of Bags</label>
          <input
            v-model="bookingStore.formData.step1.numberOfBags"
            type="number"
            placeholder="Number of Bags"
            class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
            :class="bookingStore.errors.numberOfBags ? 'border-red-500 ring-red-500' : ''"
          />
        </div>

        <!-- Date & Time -->
        <div class="flex w-full h-[62px] bg-gray-200 p-3 space-x-6 relative">
          <label for="dateTime" class="absolute -top-3 left-0 bg-white px-2 text-sm z-10">Date & Time</label>
          <FormsDatepicker v-model="bookingStore.formData.step1.date" />
          <FormsTimepicker v-model="bookingStore.formData.step1.time" />
        </div>

        <!-- Notes / Extra Requests -->
        <div class="relative h-[124px] md:col-span-2">
          <label for="extraRequest" class="absolute -top-2 bg-white px-2 text-sm">Any Extra Request?</label>
          <input
            v-model="bookingStore.formData.step1.extraRequest"
            type="text"
            placeholder="Extra Request"
            class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          />
        </div>
      </div>
   
  </div>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";

// Use the store in this component
const bookingStore = useBookingStore();
</script>
