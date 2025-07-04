<template>
    <section
      class="w-full flex flex-col justify-center items-center py-10 relative overflow-hidden bg-[#faf7e3]"
    >

      <!-- Section Title -->
      <h2
        class="text-2xl md:text-4xl text-center font-medium leading-xl md:leading-4xl uppercase text-black my-4"
      >
        Our Top Airports Offering Premium Passenger Services 
      </h2>
  
      <!-- Divider -->
      <div class="border bg-black w-1/6 h-2 mb-8"></div>
  
      <!-- Loading Animation -->
      <LoadingAnimationBlack v-if="loading" />
  
      <!-- Carousel -->
      <div
        v-else
        class="flex flex-col w-full relative items-center justify-center  px-8 md:px-0"
      >
        <!-- Left Arrow -->
        <button
          @click="prevSlide"
          class="absolute top-1/2 left-2 md:left-12 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10"
          :disabled="currentIndex === 0"
        >
          <i class="bx bx-chevron-left text-2xl"></i>
        </button>
  
        <!-- Slider -->
        <div class="overflow-hidden w-full max-w-screen-xl">
          <div
            class="flex transition-transform duration-500"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(item, index) in items"
              :key="index"
              class="min-w-full md:min-w-[50%] lg:min-w-[33.33%] px-4"
            >
              <!-- Card -->
              <NuxtLink :to="`/airports/${item.link.toLowerCase()}`">
                <div 
                  class="h-[500px] flex flex-col bg-black rounded-xl overflow-hidden group "
                >
  
                  <!-- Background Image with Loading State -->
                  <div class="relative h-[60%] bg-cover bg-center bg-black/60">
                    <div
                      v-if="!imageLoaded[index]"
                      class="absolute inset-0 flex items-center justify-center bg-gray-200"
                    >
                      <LoadingAnimationWhite />
                    </div>
                    <img
                      v-if="item.cover_image_url"
                      :src="item.cover_image_url"
                      alt="Airport"
                      class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-300 "
                      @load="markImageLoaded(index)"
                      @error="markImageLoaded(index)"
                    />
                  </div>
  
                  <!-- Title and Description -->
                  <div class="h-[40%] p-4">
                    <h3
                      class="text-xl  lg:text-2xl font-semibold text-gray-400 group-hover:text-gray-200 transition-all duration-300"
                    >
                      {{ item.name }}, {{ item.city }}, {{ item.country }}
                    </h3>
                    <p
                      class="text-sm md:text-base lg:text-lg text-gray-600 mt-2"
                    >
                      {{ item.description }}
                    </p>
                  </div>
                </div>
               </NuxtLink>
            </div>
          </div>
        </div>
  
        <!-- Right Arrow -->
        <button
          @click="nextSlide"
          class="absolute top-1/2 right-2 md:right-12 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10"
          :disabled="currentIndex === maxIndex"
        >
          <i class="bx bx-chevron-right text-2xl"></i>
        </button>
  
        <!-- Dots -->
        <div class="flex justify-center mt-4 space-x-2">
          <span
            v-for="(item, index) in items.length"
            :key="index"
            @click="currentIndex = index"
            :class="[ 'w-3 h-3 rounded-full cursor-pointer',
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-300',
            ]"
          ></span>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import axios from "~/api/drf";
  
  // Carousel state
  const items = ref([]);
  const loading = ref(true);
  const currentIndex = ref(0);
  const imageLoaded = ref([]); // Track loaded images
  
  // Calculate the max index based on visible cards
  const maxIndex = computed(() => items.value.length - 3);
  
  // Fetch data from API
  const fetchAirportData = async () => {
    try {
      const response = await axios.get(`top-airports/`);
      items.value = response.data; // Replace with actual API response fields
      imageLoaded.value = Array(response.data.length).fill(false); // Initialize loading state
    } catch (error) {
      console.error("Error fetching airport data:", error);
    } finally {
      loading.value = false;
    }
  };
  
  // Navigation functions
  const prevSlide = () => {
    if (currentIndex.value > 0) currentIndex.value--;
  };
  
  const nextSlide = () => {
    if (currentIndex.value < maxIndex.value) currentIndex.value++;
  };
  
  // Mark image as loaded
  const markImageLoaded = (index) => {
    imageLoaded.value[index] = true;
  };
  
  // Autoplay
  let autoplayInterval;
  
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      if (currentIndex.value < maxIndex.value) {
        currentIndex.value++;
      } else {
        currentIndex.value = 0;
      }
    }, 15000); // 8 seconds
  };
  
  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };
  
  // Lifecycle
  onMounted(() => {
    fetchAirportData();
    startAutoplay();
  });
  
  onUnmounted(() => {
    stopAutoplay();
  });
  </script>
  
  