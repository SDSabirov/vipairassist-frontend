<template>
  <section
    class="relative h-screen bg-black text-white font-heading overflow-hidden"
  >
    <!-- Background Media Container -->
    <div class="absolute inset-0 z-0">
      <!-- Loading placeholder - absolute positioned to prevent CLS -->
      <div
        v-if="!imageLoaded && !videoReady"
        class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center"
      >
        <div class="animate-pulse text-white/50">
          <div class="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
        </div>
      </div>

      <!-- Fallback Image - absolute positioned to prevent CLS -->
      <NuxtImg
        v-show="!videoReady"
        src="/assets/images/backgrounds/fasttracksign.webp"
        alt="Airport VIP Services - Premium Concierge Experience"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        :class="{
          'opacity-0': videoReady,
          'opacity-100': !videoReady,
        }"
        loading="eager"
        fetchpriority="high"
        width="1920"
        height="1080"
        sizes="100vw"
        format="webp"
        quality="75"
        @load="onImageLoad"
        @error="onImageError"
      />

      <!-- Video - Desktop: High quality WebM | Mobile: Lower quality MP4 -->
      <ClientOnly>
        <video
          v-if="isHydrated && isVisible"
          :key="videoSrc"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          @loadeddata="onVideoReady"
          @error="onVideoError"
          class="hero-video w-full h-full object-cover absolute top-0 left-0 transition-all duration-[1800ms] ease-[cubic-bezier(0.25, 1, 0.5, 1)]"
          :class="{
            'translate-x-0 opacity-100': videoReady,
            'translate-x-full opacity-0': !videoReady,
          }"
        >
          <source :src="videoSrc" :type="videoType" />
          Your browser does not support the video tag.
        </video>
      </ClientOnly>
    </div>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/30 z-1"></div>

    <!-- Enhanced Hero Content -->
    <div
      class="max-w-screen-xl relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-6 text-center mx-auto"
    >
      <!-- Animated Title -->
      <h1
        class="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight md:leading-tight lg:leading-tight will-change-transform transition-all duration-1000"
        :class="{ 'animate-fade-in-up': isVisible }"
        style="contain: layout; min-height: 3.5rem"
      >
        <span class="block">Elevate Your</span>
        <span class="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-extrabold">
          Airport Experience
        </span>
        <span class="block text-2xl md:text-4xl lg:text-5xl font-medium mt-2">
          with VIP Services Worldwide
        </span>
      </h1>
      
      <!-- Enhanced Subtitle -->
      <p class="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed text-white/90 transition-all duration-1000 delay-300"
         :class="{ 'animate-fade-in-up': isVisible }">
        Experience seamless travel with premium meet & greet, fast-track security, and exclusive lounge access at airports worldwide.
      </p>
      
      <!-- CTA Section -->
      <div class="mt-10 md:mt-12 transition-all duration-1000 delay-500"
           :class="{ 'animate-fade-in-up': isVisible }">
        <ButtonsBookNow />
        
        <!-- Secondary CTA -->
        <div class="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <NuxtLink 
            to="/services" 
            class="text-white/80 hover:text-white text-sm md:text-base font-medium transition-colors duration-300 flex items-center group"
          >
            <span>Explore Our Services</span>
            <i class="bx bx-right-arrow-alt ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
          </NuxtLink>
          <span class="hidden sm:block text-white/40">|</span>
          <NuxtLink 
            to="/contact" 
            class="text-white/80 hover:text-white text-sm md:text-base font-medium transition-colors duration-300"
          >
            Contact Support
          </NuxtLink>
        </div>
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
import { ref, computed, onMounted, onUnmounted } from "vue";

const showScrollHint = ref(true);
const isVisible = ref(false);
const videoReady = ref(false);
const isMobile = ref(false);
const imageLoaded = ref(false);
const isHydrated = ref(false);

// Video URLs (S3 direct - replace with CloudFront URLs when CDN is configured)
const CDN_VIDEO_DESKTOP = 'https://vip-air.s3.eu-central-1.amazonaws.com/mainvideo.webm';
const CDN_VIDEO_MOBILE = 'https://vip-air.s3.eu-central-1.amazonaws.com/mainvideo.mp4';

// Select video source based on device
const videoSrc = computed(() => {
  return isMobile.value ? CDN_VIDEO_MOBILE : CDN_VIDEO_DESKTOP;
});

const videoType = computed(() => {
  return isMobile.value ? 'video/mp4' : 'video/webm';
});

const hideScrollHintOnScroll = () => {
  if (window.scrollY > 100) showScrollHint.value = false;
};

// Use ref for hero element to avoid DOM queries
const heroRef = ref(null);
let visibilityObserver = null;

const onVideoReady = () => {
  videoReady.value = true;
};

const onImageLoad = () => {
  imageLoaded.value = true;
};

const onImageError = () => {
  imageLoaded.value = true; // Still show content even if image fails
  console.warn('Hero background image failed to load');
};

const onVideoError = () => {
  console.warn('Hero video failed to load, falling back to image');
};

onMounted(() => {
  // Detect mobile to load appropriate video quality
  isMobile.value = window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Mark as hydrated - enables video loading
  isHydrated.value = true;

  // Use IntersectionObserver instead of scroll handler to avoid forced reflows
  visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
      }
    },
    { threshold: 0.1 }
  );

  // Observe the hero section
  const heroElement = document.querySelector(".h-screen");
  if (heroElement) {
    visibilityObserver.observe(heroElement);
  }

  window.addEventListener("scroll", hideScrollHintOnScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", hideScrollHintOnScroll);
  visibilityObserver?.disconnect();
});
</script>

<style scoped>
/* Enhanced animations and transitions */
video {
  filter: brightness(0.9); /* Slightly darken video for better text readability */
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Gradient text fallback for older browsers */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Loading spinner enhancement */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Improve text rendering */
h1, p {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
