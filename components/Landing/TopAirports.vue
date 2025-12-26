<template>
  <section class="w-full flex flex-col justify-center items-center py-12 md:py-16 relative overflow-hidden">
    <!-- Optimized Background Image -->
    <div class="absolute inset-0 -z-10">
      <img
        class="w-full h-full object-cover"
        src="/assets/images/backgrounds/topairports.webp"
        alt="background airports section"
        loading="lazy"
        width="1920"
        height="800"
      />
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Section Title -->
    <div class="text-center mb-8 md:mb-12 px-4">
      <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide">
        Our Top Airports
      </h2>
      <p class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
        Discover premium VIP services at the world's leading airports
      </p>
    </div>

    <!-- Modern Divider -->
    <div class="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-8 md:mb-12"></div>

    <!-- Loading Spinner -->
    <LoadingAnimationWhite v-if="loading" />

    <!-- Enhanced Carousel -->
    <div v-else ref="carouselRef" class="flex flex-col w-full relative items-center justify-center px-4 md:px-8">
      <!-- Left Arrow -->
      <button
        @click="prevSlide"
        class="absolute top-1/2 left-2 md:left-8 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 z-10 border border-white/20"
        :disabled="currentIndex === 0"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
        aria-label="Previous slide"
      >
        <i class="bx bx-chevron-left text-2xl"></i>
      </button>

      <!-- Improved Card Grid -->
      <div class="w-full max-w-7xl px-8 md:px-0">
        <div class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="item in visibleItems"
            :key="item.code || item.link"
            class="transition-all duration-500 transform hover:scale-105"
          >
            <NuxtLink :to="`/airports/${item.link}`">
              <div class="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                <!-- Optimized Image Container -->
                <div class="relative h-64 md:h-56 overflow-hidden">
                  <div
                    v-if="!imageLoaded[index]"
                    class="absolute inset-0 flex items-center justify-center bg-gray-100"
                  >
                    <div class="animate-pulse bg-gray-300 w-full h-full"></div>
                  </div>
                  <img
                    v-if="item.cover_image_url"
                    :src="item.cover_image_url"
                    :alt="`${item.name}, ${item.city}, ${item.country}`"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    width="400"
                    height="256"
                    @load="markImageLoaded(index)"
                    @error="markImageLoaded(index)"
                  />
                  <!-- Gradient Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <!-- Enhanced Content -->
                <div class="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 class="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2 line-clamp-2">
                      {{ item.name }}
                    </h3>
                    <div class="flex items-center text-gray-500 mb-3">
                      <i class="bx bx-map text-blue-500 mr-2"></i>
                      <span class="text-sm font-medium">{{ item.city }}, {{ item.country }}</span>
                    </div>
                    <p class="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                      {{ item.description }}
                    </p>
                  </div>
                  
                  <!-- CTA -->
                  <div class="mt-4 pt-4 border-t border-gray-100">
                    <span class="text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors duration-300">
                      Explore Services →
                    </span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Right Arrow -->
      <button
        @click="nextSlide"
        class="absolute top-1/2 right-2 md:right-8 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 z-10 border border-white/20"
        :disabled="currentIndex === maxIndex"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex === maxIndex }"
        aria-label="Next slide"
      >
        <i class="bx bx-chevron-right text-2xl"></i>
      </button>

      <!-- Enhanced Pagination -->
      <div class="flex justify-center mt-8 space-x-3">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentIndex = page - 1"
          :class="[
            'w-3 h-3 rounded-full cursor-pointer transition-all duration-300',
            page - 1 === currentIndex 
              ? 'bg-white scale-125 shadow-lg' 
              : 'bg-white/50 hover:bg-white/75'
          ]"
        ></button>
      </div>

      <!-- Enhanced CTA Button -->
      <div class="flex justify-center items-center mt-8 md:mt-12">
        <NuxtLink
          to="/airports"
          class="group relative overflow-hidden bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <span class="relative z-10 flex items-center">
            Explore All Airports
            <i class="bx bx-right-arrow-alt ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <span class="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="flex items-center">
              Explore All Airports
              <i class="bx bx-right-arrow-alt ml-2"></i>
            </span>
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import axios from "~/api/drf";
import { useApiCache } from "~/composables/useApiCache";

// State
const items = ref([]);
const loading = ref(true);
const imageLoaded = ref([]);
const currentIndex = ref(0);
const carouselRef = ref(null);
const isCarouselVisible = ref(true);
let observer = null;

// Responsive card count
const visibleCardCount = ref(1);
const visibleCards = computed(() => visibleCardCount.value);

// Only show visible items
const visibleItems = computed(() => {
  const start = currentIndex.value * visibleCards.value;
  return items.value.slice(start, start + visibleCards.value);
});

const maxIndex = computed(() => totalPages.value - 1);
const totalPages = computed(() => Math.ceil(items.value.length / visibleCards.value));

// Image state
const markImageLoaded = (index) => {
  imageLoaded.value[index] = true;
};

// Resize debounce
let resizeTimeout;
const updateVisibleCards = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    visibleCardCount.value =
      window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  }, 100);
};

// API Caching
const { getCached, setCache } = useApiCache();

// Fetch data with caching
const fetchAirportData = async () => {
  const cacheKey = 'top-airports';
  const cached = getCached(cacheKey);

  if (cached) {
    items.value = cached;
    imageLoaded.value = Array(cached.length).fill(false);
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(`top-airports/`);
    items.value = response.data;
    setCache(cacheKey, response.data, 10 * 60 * 1000); // 10 min cache
    imageLoaded.value = Array(response.data.length).fill(false);
  } catch (error) {
    console.error("Error fetching airport data:", error);
  } finally {
    loading.value = false;
  }
};

// Navigation
const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) currentIndex.value++;
};

// Autoplay
let autoplayInterval;

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    currentIndex.value = currentIndex.value < maxIndex.value ? currentIndex.value + 1 : 0;
  }, 8000);
};

const stopAutoplay = () => clearInterval(autoplayInterval);

// Lifecycle
onMounted(() => {
  updateVisibleCards();
  fetchAirportData();
  window.addEventListener("resize", updateVisibleCards);

  observer = new IntersectionObserver(
    ([entry]) => {
      isCarouselVisible.value = entry.isIntersecting;
      if (isCarouselVisible.value) startAutoplay();
      else stopAutoplay();
    },
    { threshold: 0.3 }
  );
  if (carouselRef.value) observer.observe(carouselRef.value);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateVisibleCards);
  stopAutoplay();
  clearTimeout(resizeTimeout);
  observer?.disconnect();
});
</script>
