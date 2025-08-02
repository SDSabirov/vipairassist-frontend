<template>
  <div class="flex w-full bg-gray-50 border-b border-gray-200">
    <!-- Step 1: Journey -->
    <div class="flex-1 relative">
      <div
        class="flex items-center justify-center py-6 px-4 transition-all duration-300"
        :class="modelValue === 1 ? 'bg-white border-b-2 border-black' : 'bg-gray-50 hover:bg-gray-100'"
      >
        <div class="flex items-center space-x-3">
          <div 
            class="w-8 h-8 flex items-center justify-center text-sm font-bold transition-all duration-300"
            :class="modelValue === 1 ? 'bg-black text-white' : modelValue > 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'"
          >
            <i v-if="modelValue > 1" class="bx bx-check"></i>
            <span v-else>1</span>
          </div>
          <div>
            <h3
              class="font-semibold transition-all duration-300"
              :class="modelValue === 1 ? 'text-black' : modelValue > 1 ? 'text-green-600' : 'text-gray-500'"
            >
              Journey Details
            </h3>
            <p class="text-xs text-gray-500">Flight & contact info</p>
          </div>
        </div>
      </div>
      <!-- Connection Line -->
      <div v-if="modelValue >= 2" class="absolute top-1/2 right-0 w-4 h-0.5 bg-green-500 transform translate-x-2 -translate-y-1/2 hidden md:block"></div>
      <div v-else class="absolute top-1/2 right-0 w-4 h-0.5 bg-gray-300 transform translate-x-2 -translate-y-1/2 hidden md:block"></div>
    </div>

    <!-- Step 2: Services -->
    <div class="flex-1 relative">
      <div
        class="flex items-center justify-center py-6 px-4 transition-all duration-300"
        :class="modelValue === 2 ? 'bg-white border-b-2 border-black' : 'bg-gray-50 hover:bg-gray-100'"
      >
        <div class="flex items-center space-x-3">
          <div 
            class="w-8 h-8 flex items-center justify-center text-sm font-bold transition-all duration-300"
            :class="modelValue === 2 ? 'bg-black text-white' : modelValue > 2 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'"
          >
            <i v-if="modelValue > 2" class="bx bx-check"></i>
            <span v-else>2</span>
          </div>
          <div>
            <h3
              class="font-semibold transition-all duration-300"
              :class="modelValue === 2 ? 'text-black' : modelValue > 2 ? 'text-green-600' : 'text-gray-500'"
            >
              Select Services
            </h3>
            <p class="text-xs text-gray-500">Choose your VIP services</p>
          </div>
        </div>
      </div>
      <!-- Connection Line -->
      <div v-if="modelValue >= 3" class="absolute top-1/2 right-0 w-4 h-0.5 bg-green-500 transform translate-x-2 -translate-y-1/2 hidden md:block"></div>
      <div v-else class="absolute top-1/2 right-0 w-4 h-0.5 bg-gray-300 transform translate-x-2 -translate-y-1/2 hidden md:block"></div>
    </div>

    <!-- Step 3: Summary -->
    <div class="flex-1">
      <div
        class="flex items-center justify-center py-6 px-4 transition-all duration-300"
        :class="modelValue === 3 ? 'bg-white border-b-2 border-black' : 'bg-gray-50 hover:bg-gray-100'"
      >
        <div class="flex items-center space-x-3">
          <div 
            class="w-8 h-8 flex items-center justify-center text-sm font-bold transition-all duration-300"
            :class="modelValue === 3 ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'"
          >
            3
          </div>
          <div>
            <h3
              class="font-semibold transition-all duration-300"
              :class="modelValue === 3 ? 'text-black' : 'text-gray-500'"
            >
              Review & Confirm
            </h3>
            <p class="text-xs text-gray-500">Final confirmation</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const changeStep = (step) => {
  emit("update:modelValue", step);
};

</script>
