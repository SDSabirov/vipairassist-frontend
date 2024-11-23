<template>
    <section class="w-full flex flex-col justify-center items-center py-10 relative overflow-hidden ">
      <!-- Background Image -->
      <img
        class="object-fit absolute top-0 -z-10 w-full h-full"
        src="/assets/images/backgrounds/topairports.webp"
        alt="background airports section"
      />
        <h2 class="text-2xl md:text-6xl text-center font-medium leading-xl md:leading-4xl uppercas text-white my-4">Our Top Airports</h2>
        <div class="border bg-white w-1/6 h-2 mb-8"></div>
      <div class="flex flex-col w-full  relative items-center justify-center px-8 md:px-0">
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
              <div class="h-[500px] flex flex-col bg-white rounded-xl overflow-hidden ">
                <!-- Background Image (70%) -->
                <div
                  class="h-[60%] bg-cover bg-center"
                  :style="{ backgroundImage: `url(${item.image})` }"
                ></div>
  
                <!-- Title and Description (30%) -->
                <div class="h-[40%] p-4">
                  <h3 class="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                    {{ item.title }}
                  </h3>
                  <p class="text-sm md:text-base lg:text-lg text-gray-600 mt-2">
                    {{ item.description }}
                  </p>
                </div>
              </div>
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
            v-for="(item, index) in items"
            :key="index"
            @click="currentIndex = index"
            :class="[ 'w-3 h-3 rounded-full cursor-pointer', index === currentIndex ? 'bg-gray-800' : 'bg-gray-300' ]"
          ></span>
        </div>
        <div class="flex justify-center itmes-center mt-4 space-x-2 mt-4 py-4">
            <a href="" class="text-black text-2xl py-4 px-6 bg-white hover:bg-black hover:text-white">Explore All Airports </a>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  
  // Example card data
  import placeholder from "~/assets/images/services/vipterminal.webp";
  
  const items = ref([
    { title: "Heathrow, London, UK, LHR ", image: placeholder, description: "All terminals" },
    { title: "Heathrow, London, UK, LHR ", image: placeholder, description: "All terminals" },
    { title: "Heathrow, London, UK, LHR ", image: placeholder, description: "All terminals"},
    {title: "Heathrow, London, UK, LHR ", image: placeholder, description: "All terminals" },
    { title: "Heathrow, London, UK, LHR ", image: placeholder, description: "All terminals" },
    { title: "Heathrow, London, UK, LHR ", image: placeholder, description: "All terminals" },
    { title: "Heathrow, London, UK, LHR ", image: placeholder, description: "All terminals" },
    { title: "Heathrow, London, UK, LHR ", image: placeholder, description: "All terminals" },
  ]);
  
  const currentIndex = ref(0);
  
  // Calculate the max index based on visible cards
  const maxIndex = computed(() => items.value.length - 3);
  
  // Slide to the previous set of items
  const prevSlide = () => {
    if (currentIndex.value > 0) currentIndex.value--;
  };
  
  // Slide to the next set of items
  const nextSlide = () => {
    if (currentIndex.value < maxIndex.value) currentIndex.value++;
  };
  
  // Autoplay functionality
  let autoplayInterval;
  
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      if (currentIndex.value < maxIndex.value) {
        currentIndex.value++;
      } else {
        currentIndex.value = 0;
      }
    }, 3000); // Adjust interval (3 seconds here)
  };
  
  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };
  
  onMounted(() => {
    startAutoplay();
  });
  
  onUnmounted(() => {
    stopAutoplay();
  });
  </script>
  