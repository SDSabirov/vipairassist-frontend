<template>
  <div class="w-full">
    <!-- Main Selector -->
    <div class="relative">
      <button
        @click="isOpen = !isOpen"
        class="w-full p-4 border border-gray-300 bg-white text-gray-900 text-left focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 flex items-center justify-between"
      >
        <span class="font-medium">{{ displayText }}</span>
        <i class="bx" :class="isOpen ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
      </button>

      <!-- Dropdown Panel -->
      <div
        v-if="isOpen"
        class="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 z-20 shadow-lg"
      >
        <div class="p-4 space-y-4">
          <!-- Adults -->
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900">Adults</div>
              <div class="text-sm text-gray-600">Ages 12+</div>
            </div>
            <div class="flex items-center gap-3">
              <button
                @click="decrement('adults')"
                :disabled="adults === 1"
                class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:border-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="bx bx-minus text-gray-600"></i>
              </button>
              <span class="w-8 text-center font-semibold">{{ adults }}</span>
              <button
                @click="increment('adults')"
                class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:border-gray-400 transition-colors duration-200"
              >
                <i class="bx bx-plus text-gray-600"></i>
              </button>
            </div>
          </div>

          <!-- Children -->
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900">Children</div>
              <div class="text-sm text-gray-600">Ages 2-11</div>
            </div>
            <div class="flex items-center gap-3">
              <button
                @click="decrement('children')"
                :disabled="children === 0"
                class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:border-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="bx bx-minus text-gray-600"></i>
              </button>
              <span class="w-8 text-center font-semibold">{{ children }}</span>
              <button
                @click="increment('children')"
                class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:border-gray-400 transition-colors duration-200"
              >
                <i class="bx bx-plus text-gray-600"></i>
              </button>
            </div>
          </div>

          <!-- Infants -->
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900">Infants</div>
              <div class="text-sm text-gray-600">Ages 0-2</div>
            </div>
            <div class="flex items-center gap-3">
              <button
                @click="decrement('infants')"
                :disabled="infants === 0"
                class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:border-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="bx bx-minus text-gray-600"></i>
              </button>
              <span class="w-8 text-center font-semibold">{{ infants }}</span>
              <button
                @click="increment('infants')"
                class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:border-gray-400 transition-colors duration-200"
              >
                <i class="bx bx-plus text-gray-600"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Done Button -->
        <div class="p-4 border-t border-gray-200 bg-gray-50">
          <button
            @click="isOpen = false"
            class="w-full py-2 px-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>

    <!-- Helpful Info -->
    <div class="mt-2 text-xs text-gray-500">
      <p>Children and infants may have different pricing. At least 1 adult is required.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();

// State variables
const adults = ref(bookingStore.formData.step1.adults || 1);
const children = ref(bookingStore.formData.step1.children || 0);
const infants = ref(bookingStore.formData.step1.infants || 0);
const isOpen = ref(false);

// Update store immediately when values change
watch([adults, children, infants], () => {
  bookingStore.formData.step1.adults = adults.value;
  bookingStore.formData.step1.children = children.value;
  bookingStore.formData.step1.infants = infants.value;
}, { immediate: true });

// Increment function
function increment(type) {
  if (type === "adults") {
    adults.value++;
  } else if (type === "children") {
    children.value++;
  } else if (type === "infants") {
    infants.value++;
  }
}

// Decrement function
function decrement(type) {
  if (type === "adults" && adults.value > 1) {
    adults.value--;
  } else if (type === "children" && children.value > 0) {
    children.value--;
  } else if (type === "infants" && infants.value > 0) {
    infants.value--;
  }
}

// Calculate total passengers
const totalPassengers = computed(() => {
  return adults.value + children.value + infants.value;
});

// Display text for the button
const displayText = computed(() => {
  const parts = [];
  if (adults.value > 0) parts.push(`${adults.value} Adult${adults.value > 1 ? "s" : ""}`);
  if (children.value > 0) parts.push(`${children.value} Child${children.value > 1 ? "ren" : ""}`);
  if (infants.value > 0) parts.push(`${infants.value} Infant${infants.value > 1 ? "s" : ""}`);
  
  if (parts.length === 0) return "Select passengers";
  
  const result = parts.join(", ");
  return `${totalPassengers.value} ${totalPassengers.value === 1 ? 'Passenger' : 'Passengers'} (${result})`;
});
</script>