<template>
  <div class="w-full mx-auto">
    <div class="relative">
      <!-- Input Field -->
      <input
        v-model="query"
        type="text"
        placeholder="Enter airport name or city..."
        class="w-full p-4 border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
        :class="bookingStore.errors.airport || bookingStore.errors.airportSecondary ? 'border-red-400 focus:ring-red-400' : ''"
        @input="fetchAirports"
      />

      <!-- Suggestions Dropdown -->
      <ul
        v-if="loading || airports.length > 0"
        class="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto z-20 shadow-lg"
      >
        <!-- Loading State -->
        <li v-if="loading" class="p-3 text-gray-500 flex items-center">
          <i class="bx bx-loader-alt animate-spin mr-2"></i>
          Searching airports...
        </li>

        <!-- No Results Found -->
        <li v-if="!loading && airports.length === 0 && query.length > 2" class="p-3 text-gray-500">
          <i class="bx bx-search mr-2"></i>
          No airports found for "{{ query }}"
        </li>

        <!-- Airport Suggestions -->
        <li
          v-for="(airport, index) in airports"
          :key="index"
          @click="selectAirport(airport)"
          @keydown.enter="selectAirport(airport)"
          class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200"
          tabindex="0"
        >
          <div class="font-medium text-gray-900">{{ airport.name }}</div>
          <div class="text-sm text-gray-600">{{ airport.city }}, {{ airport.country }} ({{ airport.code }})</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";
import { useBookingStore } from '@/stores/booking';

type Airport = {
  name: string;
  code: string;
  city: string;
  country: string;
};

const bookingStore = useBookingStore();

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const query = ref("");
const airports = ref<Airport[]>([]);
const selectedAirport = ref<Airport | null>(null);
const loading = ref(false);
let debounceTimeout: number | null = null;
let cancelToken: axios.CancelTokenSource | null = null;

// Fetch airports from the API
const fetchAirports = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    if (query.value.trim() === "") {
      airports.value = [];
      return;
    }

    if (cancelToken) cancelToken.cancel();
    cancelToken = axios.CancelToken.source();

    loading.value = true;
    try {
      const response = await axios.get("https://api.vipairassist.com/api/v1/search-airport/", {
        params: { search_query: query.value },
        cancelToken: cancelToken.token,
      });
      airports.value = response.data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Failed to fetch airports:", error);
      }
    } finally {
      loading.value = false;
    }
  }, 300); // Adjust debounce delay
};

// Handle selecting an airport
const selectAirport = (airport: Airport) => {
  selectedAirport.value = airport;
  airports.value = []; // Clear suggestions
  query.value = airport.name; // Populate input with the selected airport
  bookingStore.formData.step1.airport = airport
  emit("update:modelValue", airport);
};


</script>
