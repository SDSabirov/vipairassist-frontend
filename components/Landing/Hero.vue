<template>
  <section
    class="relative h-screen bg-black text-white font-heading overflow-hidden"
  >
    <!-- Background Media Container -->
    <div class="absolute inset-0 z-0">
      <!-- Fallback Image -->
      <img
        v-show="!videoReady || isMobile"
        src="/assets/images/backgrounds/fasttracksign.webp"
        alt="Airport VIP Services"
        class="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        :class="{
          'opacity-0': videoReady && !isMobile,
          'opacity-100': !videoReady || isMobile,
        }"
      />

      <!-- Desktop Video -->
      <video
        v-if="!isMobile && isVisible"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        @loadeddata="onVideoReady"
        class="w-full h-full object-cover absolute top-0 left-0 transition-all duration-[1800ms] ease-[cubic-bezier(0.25, 1, 0.5, 1)]"
        :class="{
          'translate-x-0 opacity-100': videoReady,
          'translate-x-full opacity-0': !videoReady,
        }"
      >
        <source src="/assets/video/mainvideo.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/30 z-1"></div>

    <!-- Hero Content -->
    <div
      class="max-w-screen-xl relative z-10 flex flex-col items-center justify-center h-full px-4 text-center mx-auto"
    >
      <h1
        class="text-2xl md:text-6xl will-change-transform"
        style="contain: layout; min-height: 3.5rem"
      >
        Elevate Your Airport Experience with VIP Services Worldwide.
      </h1>
      <p class="mt-4 text-lg md:text-2xl max-w-2xl"></p>
      <div class="mt-10">
        <ButtonsBookNow />
      </div>
    </div>

    <!-- Scroll Down Indicator -->
    <div
      v-show="showScrollHint"
      class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center text-white transition-opacity duration-500"
    >
      <div class="animate-bounce bg-white/10 p-3 rounded-full backdrop-blur-md">
        <svg
          class="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <span class="text-sm mt-2 opacity-90">Scroll Down</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showScrollHint = ref(true);
const isVisible = ref(false);
const videoReady = ref(false);
const isMobile = ref(false);

const hideScrollHintOnScroll = () => {
  if (window.scrollY > 100) showScrollHint.value = false;
};

const handleScroll = () => {
  const hero = document.querySelector(".h-screen");
  const rect = hero.getBoundingClientRect();
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    isVisible.value = true;
  }
};

const onVideoReady = () => {
  videoReady.value = true;
};

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", hideScrollHintOnScroll);
  handleScroll(); // Run once
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("scroll", hideScrollHintOnScroll);
});
</script>

<style scoped>
/* Optional: Add styles for smooth transitions */
video {
  filter: brightness(1); /* Darken video slightly for better text readability */
}
</style>
