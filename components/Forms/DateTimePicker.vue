<template>
  <div class="w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Date Selection -->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <i class="bx bx-calendar text-gray-500"></i>
        </div>
        <input
          :value="dateValue"
          @input="updateDate($event.target.value)"
          ref="datepickerInput"
          type="date"
          placeholder="Select date"
          class="w-full pl-10 p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
          :class="(bookingStore.errors.date || error) ? 'border-red-400 focus:ring-red-400' : ''"
          :min="getTodayDate()"
        />
      </div>

      <!-- Time Selection -->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <i class="bx bx-time text-gray-500"></i>
        </div>
        <input
          :value="timeValue"
          @input="updateTime($event.target.value)"
          type="time"
          class="w-full pl-10 p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
          :class="(bookingStore.errors.time || error) ? 'border-red-400 focus:ring-red-400' : ''"
        />
      </div>
    </div>
    
    <!-- Combined Display -->
    <div v-if="dateValue && timeValue" class="mt-3 p-3 bg-gray-50 border border-gray-200 rounded">
      <div class="flex items-center text-sm text-gray-700">
        <i class="bx bx-check-circle text-green-600 mr-2"></i>
        <span class="font-medium">Selected:</span>
        <span class="ml-2">{{ formatDateTime(dateValue, timeValue) }}</span>
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="bookingStore.errors.date || bookingStore.errors.time || error" class="text-red-500 text-sm mt-1">
      {{ bookingStore.errors.date || bookingStore.errors.time || error }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBookingStore } from '@/stores/booking';

const bookingStore = useBookingStore();

// Props
const props = defineProps({
  dateValue: String,
  timeValue: String,
  error: String
});

// Emit
const emit = defineEmits(["update:dateValue", "update:timeValue"]);

// Refs
const datepickerInput = ref(null);

// Update functions
const updateDate = (value) => {
  emit("update:dateValue", value);
};

const updateTime = (value) => {
  emit("update:timeValue", value);
};

// Get today's date in YYYY-MM-DD format for min attribute
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Format date and time for display
const formatDateTime = (date, time) => {
  if (!date || !time) return '';
  
  try {
    const dateObj = new Date(date + 'T' + time);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    }) + ' at ' + dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return `${date} at ${time}`;
  }
};

// No longer needed - using native HTML5 date input
</script>