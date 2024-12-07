<template>
    <div class="relative w-full h-full">
      <!-- Button to Open Dropdown -->
      <button
        @click="toggleDropdown"
        type="button"
        class="flex items-center border border-black justify-between bg-gray-200 px-4 py-2 w-full h-full"
        :class="bookingStore.errors.adults > 0 ? 'border-red-500 ring-red-500' : ''"
    
      >
        <span>{{ selectionSummary }}</span>
        <span class="material-icons"><i class='bx bxs-down-arrow'></i></span>
      </button>
  
      <!-- Dropdown -->
      <div
        v-if="isDropdownOpen"
        class="absolute mt-2 w-full bg-gray-300 border  shadow-md z-50 p-4"
      >
        <!-- Adults -->
        <div class="flex justify-between items-center mb-4">
          <span>Adults</span>
          <div class="flex items-center gap-2">
            <button
              class="px-3 py-1 bg-gray-200 rounded-full"
              @click="decrement('adults')"
              :disabled="adults === 1"
            >
              -
            </button>
            <span>{{ adults }}</span>
            <button
              class="px-3 py-1 bg-gray-200 rounded-full"
              @click="increment('adults')"
            >
              +
            </button>
          </div>
        </div>
  
        <!-- Children -->
        <div class="flex justify-between items-center mb-4">
          <span>Children</span>
          <div class="flex items-center gap-2">
            <button
              class="px-3 py-1 bg-gray-200 rounded-full"
              @click="decrement('children')"
              :disabled="children === 0"
            >
              -
            </button>
            <span>{{ children }}</span>
            <button
              class="px-3 py-1 bg-gray-200 rounded-full"
              @click="increment('children')"
            >
              +
            </button>
          </div>
        </div>
  
        <!-- Infants -->
        <div class="flex justify-between items-center mb-4">
          <span>Infants</span>
          <div class="flex items-center gap-2">
            <button
              class="px-3 py-1 bg-gray-200 rounded-full"
              @click="decrement('infants')"
              :disabled="infants === 0"
            >
              -
            </button>
            <span>{{ infants }}</span>
            <button
              class="px-3 py-1 bg-gray-200 rounded-full"
              @click="increment('infants')"
            >
              +
            </button>
          </div>
        </div>
  
        <!-- Apply Button -->
        <button
          @click="applySelection"
          type="button"
          class="w-full bg-black text-white py-2 rounded-sm"
        >
          Apply
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed } from "vue";
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();

// State variables
const isDropdownOpen = ref(false);
const adults = ref(bookingStore.formData.step1.adults || 1); // Default to 1 adult
const children = ref(bookingStore.formData.step1.children || 0);
const infants = ref(bookingStore.formData.step1.infants || 0);

// Toggles dropdown visibility
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

// Increment function
function increment(type) {
  if (type === "adults") {
    adults.value++;
    bookingStore.formData.step1.adults = adults.value;
  }
  if (type === "children") {
    children.value++;
    bookingStore.formData.step1.children = children.value;
  }
  if (type === "infants") {
    infants.value++;
    bookingStore.formData.step1.infants = infants.value;
  }
}

// Decrement function
function decrement(type) {
  if (type === "adults" && adults.value > 1) {
    adults.value--;
    bookingStore.formData.step1.adults = adults.value;
  }
  if (type === "children" && children.value > 0) {
    children.value--;
    bookingStore.formData.step1.children = children.value;
  }
  if (type === "infants" && infants.value > 0) {
    infants.value--;
    bookingStore.formData.step1.infants = infants.value;
  }
}

// Generates summary string
const selectionSummary = computed(() => {
  return `${adults.value} Adult${adults.value > 1 ? "s" : ""}, ${
    children.value
  } Child${children.value > 1 ? "ren" : ""}, ${
    infants.value
  } Infant${infants.value > 1 ? "s" : ""}`;
});

// Apply selection (close dropdown)
function applySelection() {
  // Update booking store with final values
  bookingStore.formData.step1.adults = adults.value;
  bookingStore.formData.step1.children = children.value;
  bookingStore.formData.step1.infants = infants.value;

  // Close dropdown
  isDropdownOpen.value = false;
}
</script>
  
  <style scoped>
  .material-icons {
    font-family: "Material Icons";
    font-size: 18px;
  }
  </style>
  