<template>
    <section class="relative h-screen bg-black text-white font-heading">
      <!-- Lazy Loaded Video -->
      <div class="absolute inset-0 z-0">
        <video
          v-if="isVisible"
          autoplay
          muted
          loop
          playsinline
          class="w-full h-full object-cover"
        >
          <source src="/assets/video/mainvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
  
      <!-- Hero Content -->
      <div class="max-w-screen-xl relative z-10 flex flex-col items-center justify-center h-[70%] px-4 text-center mx-auto">
        <h1 class="text-4xl md:text-6xl ">
            Elevate Your Airport Experience with VIP Services Worldwide.
        </h1>
        <p class="mt-4 text-lg md:text-2xl max-w-2xl">
          
        </p>
        <div class="mt-10">
          <a
            href="#services"
            class="px-6 py-3 border border-white  text-white text-2xl leading-xl   transition bg-black/20 hover:text-black hover:bg-white hover:animate-fill-left-to-right"

          >
           Book Your Service Now
          </a>
        </div>
      </div>
  
      <!-- Overlay for better text readability -->
      <div class="absolute inset-0 bg-black opacity-5 z-5"></div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const isVisible = ref(false);
  
  const handleScroll = () => {
    const hero = document.querySelector('.h-screen'); // Target the hero section
    const rect = hero.getBoundingClientRect();
  
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      isVisible.value = true; // Video loads only when the hero section is visible
    }
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  /* Optional: Add styles for smooth transitions */
  video {
    filter: brightness(1); /* Darken video slightly for better text readability */
  }
  </style>
  