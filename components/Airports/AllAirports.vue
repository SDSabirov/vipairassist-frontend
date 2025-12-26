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
          v-for="airport in visibleAirports"
          :key="airport.code || airport.name"
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
import axios from "~/api/drf";
import { useApiCache } from "~/composables/useApiCache";

const airports = ref([]);
const { getCached, setCache } = useApiCache();

const isExpanded = ref(false);

const visibleAirports = computed(() =>
  isExpanded.value ? airports.value : airports.value.slice(0, 12)
);

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};
const fetchAirports = async () => {
  const cacheKey = 'all-airports';
  const cached = getCached(cacheKey);

  if (cached) {
    airports.value = cached;
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(`all-airports/`);
    airports.value = response.data;
    setCache(cacheKey, response.data, 10 * 60 * 1000); // 10 min cache
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
