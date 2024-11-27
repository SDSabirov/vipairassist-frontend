<template>
    
      <div class="grid grid-cols-1 md:grid-cols-3">
        <!-- Step 1: Journey -->
        <div
          @click="changeStep(1)"
          class="flex items-center justify-center py-4 cursor-pointer"
          :class="currentStep === 1 ? 'bg-white' : 'bg-gray-200'"
        >
          <h3
            class="text-lg"
            :class="currentStep === 1 ? 'text-black' : 'text-gray-500'"
          >
            Journey
          </h3>
        </div>
  
        <!-- Step 2: Services -->
        <div
          @click="changeStep(2)"
          class="flex items-center justify-center py-4 cursor-pointer"
          :class="currentStep === 2 ? 'bg-white' : 'bg-gray-200'"
        >
          <h3
            class="text-lg"
            :class="currentStep === 2 ? 'text-black' : 'text-gray-500'"
          >
            Services
          </h3>
        </div>
  
        <!-- Step 3: Summary -->
        <div
          @click="changeStep(3)"
          class="flex items-center justify-center py-4 cursor-pointer"
          :class="currentStep === 3 ? 'bg-white' : 'bg-gray-200'"
        >
          <h3
            class="text-lg"
            :class="currentStep === 3 ? 'text-black' : 'text-gray-500'"
          >
            Summary
          </h3>
        </div>
      </div>
    
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Track the current step
  const currentStep = ref(1);
  
  // Function to change the step
  const changeStep = (step) => {
    currentStep.value = step;
  };
  </script>
  