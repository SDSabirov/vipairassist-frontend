<template>
    <div class=" relative inline-block text-left w-full mt-6">
      <!-- Toggle Dropdown Button -->
      <button
        @click="toggleDropdown"
        class="flex py-4 px-8 bg-gray-200 text-black text-lg space-x-6 items-center justify-between w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-black"
      >
        <span>Show Extra Services</span>
        <span>
            <span class="material-icons"><i class='bx bxs-down-arrow transition-all duration-300 ease-in' :class="{'rotate-180':isOpen}"></i></span>
        </span>
      </button>
  
      <!-- Dropdown -->
      <div
        v-if="isOpen"
        class="relative top-0 mt-1 w-full bg-gray-200  ring-1 ring-black ring-opacity-5 z-10"
      >
        <div class="p-4 space-y-4">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="border border-gray-300 p-3"
          >
            <h3 class="text-lg font-semibold">{{ service.title }}</h3>
            <p class="text-sm text-gray-500">{{ service.description }}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-gray-700 font-medium">${{ service.price }}</span>
              <button
                @click="addService(service)"
                class="px-4 py-2 bg-black text-white text-sm hover:bg-black/70"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref } from "vue";

// Reactive state for dropdown visibility
const isOpen = ref(false);

// Toggle the dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Example list of services
const services = ref([
  {
    title: "Priority Boarding",
    description: "Skip the line and board your flight first.",
    price: 25,
  },
  {
    title: "Lounge Access",
    description: "Enjoy exclusive lounge access while you wait for your flight.",
    price: 50,
  },
  {
    title: "Extra Legroom Seat",
    description: "Upgrade your seat for a more comfortable journey.",
    price: 15,
  },
]);

// Add service handler
const addService = (service) => {
  console.log("Service added:", service);
  // Add logic to update cart or backend as needed
};
</script>
