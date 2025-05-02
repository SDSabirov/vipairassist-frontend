<template>
  <section class="w-full py-10 flex flex-col justify-center items-center">
    <h1
      class="text-2xl md:text-4xl text-center font-semibold leading-2xl md:leading-[!00%] capitalize"
    >
      What Our Clients Say
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
                  <!-- <p class="text-[14px] font-normal leading-[19px] mt-1">
                    {{ testimonial.date }}
                  </p> -->
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


const testimonials = ref([
  {
    name: "Nadia E.",
    date: "November 15, 2024",
    message: "VIPAIRASSIST totally changed the way I travel! Skipped the security lines at Heathrow, relaxed in a fancy lounge—everything was smooth and stress-free.",
    image: "/path-to-avatar1.jpg",
  },
  {
    name: " Khalid R.",
    date: "November 2, 2024",
    message: "The VIP service at LAX was amazing! No lines, no hassle, and the concierge took care of everything. Definitely using VIPAIRASSIST again!",
    image: "/path-to-avatar5.jpg",
  },
  {
    name: "Lars B.",
    date: "October 8, 2024",
    message: "Arriving in Dubai was smooth and stress-free thanks to VIPAIRASSIST! They handled everything while I relaxed in a private suite before my next flight. Amazing service!",
    image: "/path-to-avatar2.jpg",
  },
  {
    name: "Anastasia K.",
    date: "October 5, 2024",
    message: "Traveling with kids can be challenging, but VIPAIRASSIST made it a breeze. They handled all our luggage, got us through security in minutes, and even had a play area in the lounge!",
    image: "/path-to-avatar4.jpg",
  },
  {
    name: " Nikolai Z.",
    date: "September 10, 2024",
    message: "As a frequent business traveler, every minute counts. I’ve used VIPAIRASSIST three times now, and they never disappoint! They got me through check-in and security at Istanbul in record time, leaving me plenty of time to relax before my flight",
    image: "/path-to-avatar3.jpg",
  },
  
  
]);
const visibleCards = ref(1);
const currentIndex = ref(0);
const maxIndex = computed(() => testimonials.value.length - visibleCards.value);
const updateVisibleCards = () => {
  if (window.innerWidth >= 1024) {
    visibleCards.value = 3;
  } else if (window.innerWidth >= 768) {
    visibleCards.value = 2;
  } else {
    visibleCards.value = 1;
  }
};


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
  }, 5000); 
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

onMounted(() => {
  updateMaxIndex()
  window.addEventListener("resize", updateMaxIndex);
  
});

onUnmounted(() => {
  window.removeEventListener("resize", updateMaxIndex);
});

// Update the max index on resize
const updateMaxIndex = () => {
  currentIndex.value = Math.min(currentIndex.value, maxIndex.value);
};
</script>
