<template>
  <div class="grid grid-cols-1 md:grid-cols-3 w-full">
    <!-- Step 1: Journey -->
    <div
      class="flex items-center justify-center py-4 cursor-pointer"
      :class="modelValue === 1 ? 'bg-white' : 'bg-gray-200'"
    >
      <h3
        class="text-lg"
        :class="modelValue === 1 ? 'text-black' : 'text-gray-500'"
      >
        Journey
      </h3>
    </div>

    <!-- Step 2: Services -->
    <div
      class="flex items-center justify-center py-4 cursor-pointer"
      :class="modelValue === 2 ? 'bg-white' : 'bg-gray-200'"
    >
      <h3
        class="text-lg"
        :class="modelValue === 2 ? 'text-black' : 'text-gray-500'"
      >
        Services
      </h3>
    </div>

    <!-- Step 3: Summary -->
    <div
      class="flex items-center justify-center py-4 cursor-pointer"
      :class="modelValue === 3 ? 'bg-white' : 'bg-gray-200'"
    >
      <h3
        class="text-lg"
        :class="modelValue === 3 ? 'text-black' : 'text-gray-500'"
      >
        Summary
      </h3>
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
