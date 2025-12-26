<template>
  <section class="w-full py-16 md:py-20 flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Enhanced Header -->
    <div class="text-center mb-12 md:mb-16 max-w-4xl px-4">
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
        What Our <span class="text-blue-600">Clients</span> Say
      </h1>
      <p class="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
        Real experiences from travelers who chose VIP Air Assist for their journey
      </p>
    </div>

    <div class="flex flex-col justify-center items-center w-full relative overflow-hidden px-4 md:px-8">
      <!-- Enhanced Navigation Arrows -->
      <button
        @click="prevSlide"
        class="absolute top-1/2 left-2 md:left-8 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        :disabled="currentIndex === 0"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
      >
        <i class="bx bx-chevron-left text-2xl"></i>
      </button>

      <!-- Enhanced Slider -->
      <div class="overflow-hidden w-full py-8 max-w-screen-xl">
        <div
          class="flex transition-transform duration-700 ease-out"
          :style="{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }"
        >
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="min-w-full md:min-w-[50%] lg:min-w-[33.33%] px-4"
          >
            <!-- Enhanced Testimonial Card -->
            <div class="bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-auto min-h-[320px] flex flex-col hover:-translate-y-1">
              <!-- Quote Icon -->
              <div class="flex w-full items-start justify-start mb-6">
                <div class="w-12 h-12 bg-blue-100 flex items-center justify-center">
                  <img src="/assets/images/icons/quote.svg" alt="quote icon" class="w-6 h-6 text-blue-600" />
                </div>
              </div>
              
              <!-- Testimonial Message -->
              <p class="text-gray-700 text-base md:text-lg leading-relaxed mb-6 flex-grow italic">
                "{{ testimonial.message }}"
              </p>
              
              <!-- Rating Stars -->
              <div class="flex items-center mb-4">
                <div class="flex text-yellow-400 mr-2">
                  <i class="bx bxs-star text-lg"></i>
                  <i class="bx bxs-star text-lg"></i>
                  <i class="bx bxs-star text-lg"></i>
                  <i class="bx bxs-star text-lg"></i>
                  <i class="bx bxs-star text-lg"></i>
                </div>
                <span class="text-sm text-gray-500 font-medium">5.0</span>
              </div>
              
              <!-- Avatar, Name, and Date -->
              <div class="flex items-center">
                <div class="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-4 shadow-md">
                  <img
                    src="/assets/images/icons/userProfile.svg"
                    alt="Testimonial Avatar"
                    class="w-8 h-8 brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-800 mb-1">
                    {{ testimonial.name }}
                  </h3>
                  <p class="text-sm text-gray-500 font-medium">
                    {{ testimonial.date }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Right Arrow -->
      <button
        @click="nextSlide"
        class="absolute top-1/2 right-2 md:right-8 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        :disabled="currentIndex === maxIndex"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex === maxIndex }"
      >
        <i class="bx bx-chevron-right text-2xl"></i>
      </button>
    </div>

    <!-- Enhanced Pagination Dots -->
    <div class="flex justify-center mt-8 space-x-3">
      <button
        v-for="(testimonial, index) in testimonials"
        :key="index"
        @click="currentIndex = index"
        :class="[
          'w-3 h-3 cursor-pointer transition-all duration-300',
          index === currentIndex 
            ? 'bg-blue-600 scale-125 shadow-lg' 
            : 'bg-gray-300 hover:bg-gray-400'
        ]"
      ></button>
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
  // Update max index when visible cards change
  currentIndex.value = Math.min(currentIndex.value, maxIndex.value);
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

// Debounced resize handler to avoid forced reflows
let resizeTimeout;
const debouncedUpdateVisibleCards = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateVisibleCards, 100);
};

onMounted(() => {
  updateVisibleCards();
  window.addEventListener("resize", debouncedUpdateVisibleCards, { passive: true });
  startAutoplay();
});

onUnmounted(() => {
  window.removeEventListener("resize", debouncedUpdateVisibleCards);
  clearTimeout(resizeTimeout);
  stopAutoplay();
});
</script>
