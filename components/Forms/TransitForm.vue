<template>
  <div class="flex flex-col w-full space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <!--Name-->
      <div class="relative h-[62px]">
        <label
          for="name"
          class="absolute -top-2 bg-white px-2 text-sm"
          :class="bookingStore.errors.name ? 'text-red-500' : ''"
          >Full Name
        </label>
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
        <label
          for="email"
          class="absolute -top-2 bg-white px-2 text-sm"
          :class="bookingStore.errors.email ? 'text-red-500' : ''"
          >Email</label
        >
        <input
          v-model="bookingStore.formData.step1.email"
          type="email"
          placeholder="Email"
          class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          :class="
            bookingStore.errors.email ? 'border-red-500 ring-red-500' : ''
          "
        />
      </div>

      <!-- Phone -->
      <div class="relative h-[62px]">
        <label
          for="phone"
          class="absolute -top-2 bg-white px-2 text-sm"
          :class="bookingStore.errors.phone ? 'text-red-500' : ''"
          >Phone</label
        >
        <input
          v-model="bookingStore.formData.step1.phone"
          type="text"
          placeholder="Phone"
          class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          :class="
            bookingStore.errors.phone ? 'border-red-500 ring-red-500' : ''
          "
        />
      </div>

      <!-- Number of Passengers -->
      <div class="flex w-full h-[62px] relative">
        <label
          for="passengers"
          class="absolute -top-2 bg-white px-2 text-sm z-10"
          >Number of Passengers</label
        >
        <FormsPassengerSelector />
      </div>

      <!-- Number of Bags -->
      <div class="relative h-[62px]">
        <label
          for="bags"
          class="absolute -top-2 bg-white px-2 text-sm"
          :class="bookingStore.errors.numberOfBags ? 'text-red-500' : ''"
          >Number of Bags</label
        >
        <input
          v-model="bookingStore.formData.step1.numberOfBags"
          type="number"
          placeholder="Number of Bags"
          class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          :class="
            bookingStore.errors.numberOfBags
              ? 'border-red-500 ring-red-500'
              : ''
          "
        />
      </div>
    </div>

    <div class="flex items-center py-4">
      <div class="border border-black w-full"></div>
      <h4 class="text-md font-normal leading-6 w-full text-center">
        Departure Details
      </h4>
      <div class="border border-black w-full"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <!--Departure Airport-->

      <div class="flex flex-col relative h-[62px]">
        <label
          for="airport"
          class="absolute -top-2 bg-white px-2 text-sm z-10"
          :class="bookingStore.errors.airport ? 'text-red-500' : ''"
          >Departure Airport</label
        >
        <FormsAirportSearch v-model="bookingStore.formData.step1.airport" />
      </div>

      <!--departure Flight Number -->
      <div class="relative h-[62px]">
        <label
          for="flightNumber"
          class="absolute -top-2 bg-white px-2 text-sm"
          :class="bookingStore.errors.flight ? 'text-red-500' : ''"
          >Departure Flight Number</label
        >
        <input
          v-model="bookingStore.formData.step1.flight"
          type="text"
          placeholder="Flight Number"
          class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          :class="
            bookingStore.errors.flight ? 'border-red-500 ring-red-500' : ''
          "
        />
      </div>

      <!--Departure Date & Time -->
      <div class="flex w-full h-[62px] bg-gray-200 p-3 space-x-6 relative">
        <label
          for="dateTime"
          class="absolute -top-3 left-0 bg-white px-2 text-sm z-10"
          >Departure Date & Time</label
        >
        <FormsDatepicker v-model="bookingStore.formData.step1.date" />
        <FormsTimepicker v-model="bookingStore.formData.step1.time" />
      </div>
    </div>

    <div class="flex items-center py-4">
      <div class="border border-black w-full"></div>
      <h4 class="text-md font-normal leading-6 w-full text-center">
        Arrival Details
      </h4>
      <div class="border border-black w-full"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <!--Arrival Airport -->
      <div class="flex flex-col relative h-[62px]">
        <label
          for="airport"
          class="absolute -top-2 bg-white px-2 text-sm z-10"
          :class="bookingStore.errors.airport ? 'text-red-500' : ''"
          >Arrival Airport</label
        >
        <FormsAirportSearch v-model="bookingStore.formData.step1.airportSecondary"/>
      </div>

      <!--Arrival Flight Number -->
      <div class="relative h-[62px]">
        <label
          for="flightNumber"
          class="absolute -top-2 bg-white px-2 text-sm"
          :class="bookingStore.errors.flight ? 'text-red-500' : ''"
          >Arrival Flight Number</label
        >
        <input
          v-model="bookingStore.formData.step1.flightSecondary"
          type="text"
          placeholder="Flight Number"
          class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          :class="
            bookingStore.errors.flightSecondary
              ? 'border-red-500 ring-red-500'
              : ''
          "
        />
      </div>

      <!--Arrival Date & Time -->
      <div class="flex w-full h-[62px] bg-gray-200 p-3 space-x-6 relative">
          <label for="dateTime" class="absolute -top-3 left-0 bg-white px-2 text-sm z-10">Arrival Date & Time</label>
          <FormsDatepicker v-model="bookingStore.formData.step1.dateSecondary" />
          <FormsTimepicker v-model="bookingStore.formData.step1.timeSecondary" />
        </div>

      <!--Notes Extra requests-->
      <div class="relative h-[124px] md:col-span-2">
        <label for="Description" class="absolute -top-2 bg-white px-2 text-sm"
          >Any extra request?</label
        >
        <input
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
