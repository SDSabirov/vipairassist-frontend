<template>
  <div class="max-w-[12rem] mx-auto flex space-x-2 items-center">
    <label
      for="time"
      class="block text-sm font-medium text-gray-900"
      >Select time:</label
    >
    <div class="relative">
      <div
        class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="time"
        id="time"
        class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm focus:ring-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :class="bookingStore.errors.time ? 'border-red-500 ring-red-500' : ''"
      />
    </div>
  </div>
</template>

<script setup>
import { useBookingStore } from '@/stores/booking';

const bookingStore = useBookingStore();

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

</script>