<template>
  <div class="relative inline-block text-left w-full mt-6">
    <!-- Toggle Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="flex py-4 px-8 bg-gray-200 text-black text-lg space-x-6 items-center justify-between w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-black"
    >
      <span>Show Extra Services</span>
      <span>
        <span class="material-icons"
          ><i
            class="bx bxs-down-arrow transition-all duration-300 ease-in"
            :class="{ 'rotate-180': isOpen }"
          ></i
        ></span>
      </span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="relative top-0 mt-1 w-full bg-gray-200 ring-1 ring-black ring-opacity-5 z-10"
    >
      <div class="p-4 space-y-4">
        <!-- Available Services -->
        <div
          v-for="(service, index) in modelValue"
          :key="index"
          class="border border-gray-300 p-3"
        >
          <h3 class="text-lg font-semibold">{{ service.name }}</h3>
          <p class="text-sm text-gray-500">{{ service.description }}</p>
          <div class="flex justify-between items-center mt-2">
            <span
              v-if="service.prices?.length"
              class="text-gray-700 font-medium"
            >
              {{ service.prices[0].per_unit_price }} USD
            </span>
            <div class="flex items-center space-x-4">
              
              <button
              @click="addService(service)"
              :disabled="selectedExtras.some((item) => item.id === service.id)"
              class="px-4 py-2 bg-black text-white text-sm hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
            <button
              @click="removeService(service)"
              :disabled="selectedExtras.length == 0"
              class="px-4 py-2 bg-red-500 text-white text-sm hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <i class='bx bx-trash'></i> Remove
            </button>
            
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBookingStore } from "@/stores/booking";
const bookingStore = useBookingStore();

const isOpen = ref(false);
let selectedExtras=ref([])
// Toggle the dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => [],
  },
});


const addService = (service) => {
  
  selectedExtras.value.push({ ...service, quantity: 1 });
  bookingStore.formData.step2.extras = selectedExtras.value
  console.log(bookingStore.formData.step2)
  
}



// const updateQuantity = (id, change) => {
//   const service = selectedExtras.value.find((item) => item.id === id);
//   if (service) {
//     service.quantity = Math.max(1, service.quantity + change); // Ensure quantity never drops below 1
//     emit("update:selectedExtras", [...selectedExtras.value]);
//   }
// };

const removeService = (id) => {
  selectedExtras.value.pop(id);
  bookingStore.formData.step2.extras.pop(id)
  console.log(selectedExtras)
  console.log(bookingStore.formData.step2)
};
</script>
