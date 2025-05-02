<template>
  <section class="w-full flex flex-col justify-center items-center py-10 relative overflow-hidden">
    <!-- Background Image -->
    <img
      class="object-fit absolute top-0 -z-10 w-full h-full"
      src="/assets/images/backgrounds/topairports.webp"
      alt="background airports section"
    />

    <!-- Section Title -->
    <h2 class="text-2xl md:text-6xl text-center font-medium leading-xl md:leading-4xl uppercase text-white my-4">
      Our Top Airports
    </h2>

    <!-- Divider -->
    <div class="border bg-white w-1/6 h-2 mb-8"></div>

    <!-- Loading Spinner -->
    <LoadingAnimationWhite v-if="loading" />

    <!-- Carousel -->
    <div v-else ref="carouselRef" class="flex flex-col w-full relative items-center justify-center px-8 md:px-0">
      <!-- Left Arrow -->
      <button
        @click="prevSlide"
        class="absolute top-1/2 left-2 md:left-12 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10"
        :disabled="currentIndex === 0"
        aria-label="Previous slide"
      >
        <i class="bx bx-chevron-left text-2xl"></i>
      </button>

      <!-- Visible Slides Only -->
      <div class="w-full max-w-screen-xl flex">
        <div
          v-for="(item, index) in visibleItems"
          :key="index"
          class="w-full md:w-1/2 lg:w-1/3 px-4 transition-opacity duration-500"
        >
          <NuxtLink :to="`/airports/${item.name.replace(/\s+/g, '-')}`">
            <div class="h-[500px] flex flex-col bg-white rounded-xl overflow-hidden group">
              <!-- Image with loading -->
              <div class="relative h-[60%] bg-cover bg-center bg-black/60">
                <div
                  v-if="!imageLoaded[index]"
                  class="absolute inset-0 flex items-center justify-center bg-gray-200"
                >
                  <LoadingAnimationWhite />
                </div>
                <img
                  loading="lazy"
                  v-if="item.cover_image_url"
                  :src="item.cover_image_url"
                  :alt="`${item.name}, ${item.city}, ${item.country}`"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  @load="markImageLoaded(index)"
                  @error="markImageLoaded(index)"
                />
              </div>

              <!-- Details -->
              <div class="h-[40%] p-4">
                <h3 class="text-xl lg:text-2xl font-semibold text-gray-600 group-hover:text-gray-800 transition-all duration-300">
                  {{ item.name }}, {{ item.city }}, {{ item.country }}
                </h3>
                <p class="text-sm md:text-base lg:text-lg text-gray-600 mt-2">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Right Arrow -->
      <button
        @click="nextSlide"
        class="absolute top-1/2 right-2 md:right-12 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10"
        :disabled="currentIndex === maxIndex"
        aria-label="Next slide"
      >
        <i class="bx bx-chevron-right text-2xl"></i>
      </button>

      <!-- Pagination -->
      <div class="flex justify-center mt-4 space-x-2">
        <span
          v-for="page in totalPages"
          :key="page"
          @click="currentIndex = page - 1"
          :class="[
            'w-3 h-3 rounded-full cursor-pointer',
            page - 1 === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
          ]"
        ></span>
      </div>

      <!-- CTA Button -->
      <div class="flex justify-center items-center mt-4 py-4">
        <a
          href="/airports"
          class="text-black text-2xl py-4 px-6 bg-white hover:bg-black hover:text-white"
        >
          Explore All Airports
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import axios from "~/api/drf";

// State
const items = ref([]);
const loading = ref(true);
const imageLoaded = ref([]);
const currentIndex = ref(0);
const carouselRef = ref(null);
const isCarouselVisible = ref(true);

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

// Fetch data
const fetchAirportData = async () => {
  try {
    const response = await axios.get(`top-airports/`);
    items.value = response.data;
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

  const observer = new IntersectionObserver(
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
});
</script>
