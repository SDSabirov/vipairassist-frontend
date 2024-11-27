
<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div class="flex flex-col relative h-[62px]">
            <label for="Airport" class="absolute -top-2 bg-white px-2 text-sm z-10">Airport</label>
            <FormsAirportSearch/>
        </div>
        <div class="relative h-[62px]">
          <label for="flightNumber" class="absolute -top-2 bg-white px-2 text-sm">Flight Number</label>
          <input
            type="text"
            placeholder="Flight Number"
            class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div class="flex w-full h-[62px] bg-gray-200 p-3 space-x-6 relative">
         <label for="dateTime" class="absolute -top-3 left-0 bg-white px-2 text-sm z-10">Date & Time</label>
          <FormsDatepicker />
          <FormsTimepicker />
        </div>
        <div class="flex w-full h-[62px] relative">
          <label for="dateTime" class="absolute -top-2 bg-white px-2 text-sm z-10">Number of passengers</label>
          <FormsPassengerSelector />
        </div>
        <div class="relative h-[62px]">
          <!-- Input Field -->
          <label for="name" class="absolute -top-2 bg-white px-2 text-sm">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div class="relative h-[62px]">
          <!-- Input Field -->
          <label for="bags" class="absolute -top-2 bg-white px-2 text-sm">Number of bags</label>
          <input
            type="number"
            placeholder="Number of bags"
            class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div class="relative h-[124px] md:col-span-2">
          <!-- Input Field -->
          <label for="Description" class="absolute -top-2 bg-white px-2 text-sm">Any extra request?</label>
          <input
            type="text"
            placeholder="Flight Number"
            class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        
    
    </div>
</template>

<script setup lang="ts">

</script>