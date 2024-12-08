<template>
  <section
    class="w-full py-10 bg-[url('/assets/images/backgrounds/quote.jpg')] bg-cover flex justify-center items-center relative "
  >
    <!-- Carousel Container -->
    <div class="w-11/12 md:w-8/12 text-center">
      <h4 class="text-white text-[24px] md:text-[36px] font-medium leading-[200%] mb-6">What Our Members Say</h4>
      <!-- Quote Slide -->
      <div
        v-for="(quote, index) in quotes"
        :key="index"
        v-show="currentIndex === index"
        class="p-6 transition-opacity duration-500 mb-6"
      >
        <p class="text-white text-[16px] md:text-[24px] font-medium leading-[200%] italic">{{ quote }}</p>
      </div>

      <!-- Navigation -->
      <div class="flex justify-center items-center space-x-4 mt-6">
        <div
          v-for="(quote, index) in quotes"
          :key="index"
          class="h-[4px] w-16 rounded-full cursor-pointer"
          :class="{
            'bg-gray-800': currentIndex === index,
            'bg-gray-300': currentIndex !== index
          }"
          @click="navigateToSlide(index)"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Quotes Array
const quotes = ref([
  "“My personal assistant lifted the way I travel to new level.”",
  "“The resources and tools provided by this organization have been invaluable in helping me achieve my personal and professional goals”",
  "“I've met some incredible people through this community, and the connections I've made here have opened up so many doors for me.”",
]);

// Current index of the quote
const currentIndex = ref(0);

// Auto-rotation interval
let autoplayInterval;

// Navigate to specific slide
const navigateToSlide = (index) => {
  currentIndex.value = index;
};

// Start auto-rotation
const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % quotes.value.length;
  }, 5000); // Change every 5 seconds
};

// Stop auto-rotation
const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

// Lifecycle hooks
onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>