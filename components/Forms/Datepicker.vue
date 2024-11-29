<template>
  <div class="relative max-w-sm">
    <div
      class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
    >
      <svg
        class="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
        />
      </svg>
    </div>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      ref="datepickerInput"
      id="datepicker-actions"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-black block w-full ps-10 p-2.5"
      placeholder="Select date"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFlowbite } from "~/composables/useFlowbite";

// Props and Emit
defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

// Refs
const datepickerInput = ref(null);

// Flowbite Datepicker Initialization
onMounted(() => {
  useFlowbite(() => {
    const datepicker = new Datepicker(datepickerInput.value, {
      autohide: true, // Optional: Auto-hide on date select
    });

    // Sync Flowbite Datepicker value with v-model
    datepickerInput.value.addEventListener("changeDate", (e) => {
      emit("update:modelValue", e.target.value);
    });
  });
});
</script>
