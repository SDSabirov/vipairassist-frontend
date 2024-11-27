<template>
    <div class="w-full h-full mx-auto">
      <div class="relative h-full">
        <!-- Input Field -->
        <input
          v-model="query"
          type="text"
          placeholder="Enter airport name..."
          class="w-full h-full p-3  bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
          @input="fetchAirports"
        />
  
        <!-- Suggestions Dropdown -->
        <ul
          v-if="airports.length > 0"
          class="absolute left-0 right-0 bg-white border border-gray-300 rounded-sm mt-1 max-h-60 overflow-y-auto z-20"
        >
          <li
            v-for="(airport, index) in airports"
            :key="index"
            @click="selectAirport(airport)"
            class="p-2 hover:bg-blue-100 cursor-pointer"
          >
          {{ airport.city }}, {{ airport.name }}, {{ airport.country }}, ({{ airport.code }})
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup="ts">
  import { ref } from "vue";
  import axios from "axios";
  
  // State variables
  const query = ref("");
  const airports = ref([]);
  const selectedAirport = ref(null);
  let cancelToken;
  
  // Fetch airports from the API
  const fetchAirports = async () => {
    if (query.value.trim() === "") {
      airports.value = [];
      return;
    }
  
    // Cancel the previous request if a new one is made
    if (cancelToken) {
      cancelToken.cancel();
    }
    cancelToken = axios.CancelToken.source();
  
    try {
      const response = await axios.get("https://api.vipairassist.com/api/v1/search-airport/", // Replace with your actual API endpoint
        {
          params: { search_query: query.value },
          cancelToken: cancelToken.token,
        }
      );
      airports.value = response.data; // Assuming the API returns an array of airports
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Failed to fetch airports:", error);
      }
    }
  };
  
  // Handle selecting an airport
  const selectAirport = (airport) => {
    selectedAirport.value = airport;
    airports.value = []; // Clear suggestions
    query.value = airport.name; // Populate input with the selected airport
  };
  </script>