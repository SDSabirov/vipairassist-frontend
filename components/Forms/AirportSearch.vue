<template>
  <div class="w-full h-full mx-auto">
    <div class="relative h-full">
      <!-- Input Field -->
      <input
        v-model="query"
        type="text"
        placeholder="Enter airport name..."
        class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
        :class="bookingStore.errors.airport || bookingStore.errors.airportSecondary ? 'border-red-500 ring-red-500' : ''"
        @input="fetchAirports"
      />

      <!-- Suggestions Dropdown -->
      <ul
        v-if="loading || airports.length > 0"
        class="absolute left-0 right-0 bg-white border border-gray-300 rounded-sm mt-1 max-h-60 overflow-y-auto z-20"
      >
        <!-- Loading State -->
        <li v-if="loading" class="p-2 text-gray-500">Loading...</li>

        <!-- No Results Found -->
        <li v-if="!loading && airports.length === 0" class="p-2 text-gray-500">
          No results found.
        </li>

        <!-- Airport Suggestions -->
        <li
          v-for="(airport, index) in airports"
          :key="index"
          @click="selectAirport(airport)"
          @keydown.enter="selectAirport(airport)"
          class="p-2 hover:bg-blue-100 cursor-pointer"
          tabindex="0"
        >
          {{ airport.city }}, {{ airport.name }}, {{ airport.country }} ({{ airport.code }})
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
      const response = await axios.get("http://127.0.0.1:8000/api/v1/search-airport/", {
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
