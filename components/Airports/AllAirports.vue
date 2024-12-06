<template>
  <section class="flex flex-col w-full items-center justify-center py-10">
    <div
      class="flex flex-col max-w-screen-xl items-center justify-center space-y-10"
    >
      <h2
        class="text-2xl md:text-4xl text-center font-medium leading-xl md:leading-4xl uppercase text-black my-4"
      >
        Explore Our Global Network of Airports
      </h2>
      <p class="text-xl text-center">
        Discover a curated list of world-class airports designed to elevate your
        travel experience. From luxury lounges to seamless VIP services, each
        airport offers unique amenities tailored to meet the needs of discerning
        travelers. Whether you're arriving, departing, or transiting, our
        selection ensures a smooth and stress-free journey at every step.
      </p>
      <!-- Airports Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(airport, index) in visibleAirports"
          :key="index"
          class="bg-white p-6 shadow-md rounded-md text-center border border-gray-300"
        >
          <h3 class="text-xl font-semibold text-gray-800">
            {{ airport.name }}
          </h3>
          <p class="text-sm text-gray-500">{{ airport.city }} {{airport.country}}</p>
        </div>
      </div>

      <!-- Expand/Collapse Button -->
      <div class="flex justify-center mt-8">
        <button
          @click="toggleExpanded"
          class="px-8 py-4 bg-black text-white text-lg font-semibold  hover:bg-black/80 transition"
        >
          {{ isExpanded ? "Show Less" : "Show More" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
const airports = ref([
  { name: "Heathrow Airport", location: "London, UK" },
  { name: "JFK Airport", location: "New York, USA" },
  { name: "Changi Airport", location: "Singapore" },
  { name: "Dubai Airport", location: "Dubai, UAE" },
  { name: "Tokyo Haneda Airport", location: "Tokyo, Japan" },
  { name: "Charles de Gaulle Airport", location: "Paris, France" },
  { name: "Munich Airport", location: "Munich, Germany" },
  { name: "Incheon Airport", location: "Seoul, South Korea" },
  { name: "Sydney Airport", location: "Sydney, Australia" },
  { name: "Toronto Pearson Airport", location: "Toronto, Canada" },
  { name: "Heathrow Airport", location: "London, UK" },
  { name: "JFK Airport", location: "New York, USA" },
  { name: "Changi Airport", location: "Singapore" },
  { name: "Dubai Airport", location: "Dubai, UAE" },
  { name: "Tokyo Haneda Airport", location: "Tokyo, Japan" },
  { name: "Charles de Gaulle Airport", location: "Paris, France" },
  { name: "Munich Airport", location: "Munich, Germany" },
  { name: "Incheon Airport", location: "Seoul, South Korea" },
  { name: "Sydney Airport", location: "Sydney, Australia" },
  { name: "Toronto Pearson Airport", location: "Toronto, Canada" },
]);

const isExpanded = ref(false);

const visibleAirports = computed(() =>
  isExpanded.value ? airports.value : airports.value.slice(0, 12)
);

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};
const fetchAirports = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/all-airports/`
    );
    airports.value = response.data; 
    console.log(airports)
  } catch (error) {
    console.error("Error fetching airport data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAirports();
});
</script>

<style scoped>
/* Optional: Additional styling for the section */
</style>
