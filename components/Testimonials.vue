<template>
  <section class="w-full py-10 flex flex-col justify-center items-center">
    <h1
      class="text-2xl md:text-4xl text-center font-semibold leading-2xl md:leading-[!00%] capitalize"
    >
      What Our Clieants Say
    </h1>
    <div class="flex flex-col justify-center items-center w-full relative overflow-hidden px-8 md:px-0">
      <!-- Left Arrow -->
      <button
        @click="prevSlide"
        class="absolute top-1/2 left-2 md:left-12 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10"
        :disabled="currentIndex === 0"
      >
        <i class="bx bx-chevron-left text-2xl"></i>
      </button>

      <!-- Slider -->
      <div class="overflow-hidden w-full py-4 max-w-screen-xl">
        <div
          class="flex transition-transform duration-500"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="min-w-full md:min-w-[50%] lg:min-w-[33.33%] px-4"
          >
            <!-- Testimonial Card -->
            <div
              class="bg-white border border-black rounded-md p-6 flex flex-col justify-between h-[300px]"
            >
              <!-- Testimonial Message -->
              <div class="flex w-full items-center justify-start">
                <img src="/assets/images/icons/quote.svg" alt="quote icon" />
              </div>
              <p class="text-[14px] mt-6 font-normal leading-[160%]">
                {{ testimonial.message }}
              </p>
              <!-- Avatar, Name, and Date -->
              <div class="flex items-center mt-auto">
                <div class="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="/assets/images/icons/userProfile.svg"
                    alt="Testimonial Avatar"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 class="text-[14px] font-bold leading-[19px]">
                    {{ testimonial.name }}
                  </h3>
                  <p class="text-[14px] font-normal leading-[19px] mt-1">
                    {{ testimonial.date }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Arrow -->
      <button
        @click="nextSlide"
        class="absolute top-1/2 right-2 md:right-12 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10"
        :disabled="currentIndex === maxIndex"
      >
        <i class="bx bx-chevron-right text-2xl"></i>
      </button>
    </div>

    <!-- Dots -->
    <div class="flex justify-center mt-6 space-x-2">
      <span
        v-for="(testimonial, index) in testimonials"
        :key="index"
        @click="currentIndex = index"
        :class="[
          'w-3 h-3 rounded-full cursor-pointer',
          index === currentIndex ? 'bg-gray-800' : 'bg-gray-300',
        ]"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// Example testimonials
const testimonials = ref([
  {
    name: "John Doe",
    date: "July 15, 2023",
    message: "This service is fantastic! Highly recommended.",
    image: "/path-to-avatar1.jpg",
  },
  {
    name: "Jane Smith",
    date: "August 8, 2023",
    message: "Excellent support and great results!",
    image: "/path-to-avatar2.jpg",
  },
  {
    name: "Sam Wilson",
    date: "September 10, 2023",
    message: "A truly wonderful experience from start to finish.",
    image: "/path-to-avatar3.jpg",
  },
  {
    name: "Alice Johnson",
    date: "October 5, 2023",
    message: "The best decision I've ever made.",
    image: "/path-to-avatar4.jpg",
  },
  {
    name: "Michael Brown",
    date: "November 2, 2023",
    message: "Their professionalism and expertise stand out.",
    image: "/path-to-avatar5.jpg",
  },
]);

const currentIndex = ref(0);

// Calculate the maximum index based on the number of cards visible
const maxIndex = computed(() => {
  const visibleCards =
    window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  return testimonials.value.length - visibleCards;
});

// Handle navigation
const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) currentIndex.value++;
};

// Autoplay functionality
let autoplayInterval;
const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    if (currentIndex.value < maxIndex.value) {
      nextSlide();
    } else {
      currentIndex.value = 0;
    }
  }, 5000); // Adjust interval (5 seconds here)
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

onMounted(() => {
  startAutoplay();
  window.addEventListener("resize", updateMaxIndex);
  
});

onUnmounted(() => {
  stopAutoplay();
  window.removeEventListener("resize", updateMaxIndex);
});

// Update the max index on resize
const updateMaxIndex = () => {
  currentIndex.value = Math.min(currentIndex.value, maxIndex.value);
};
</script>
