<template>
    <section class="w-full h-[50vh] bg-gray-900 relative">
    <!-- Image Container -->
    <div class="flex h-full w-full">
      <!-- Image 1 -->
      <div class="h-full w-1/3 relative overflow-hidden">
        <img
          src="/assets/images/services/lounge.jpg"
          alt="Image 1"
          class="h-full w-full object-cover transform transition-transform duration-500 hover:scale-110"
          style="clip-path: polygon(0% 0%, 100% 10%, 100% 90%, 0% 100%)"
        />
      </div>

      

      <!-- Image 3 -->
      <div class="h-full w-1/3 relative overflow-hidden">
        <img
          src="/assets/images/services/planecar.jpg"
          alt="Image 3"
          class="h-full w-full object-cover transform transition-transform duration-500 hover:scale-110"
          style="clip-path: polygon(0% 10%, 100% 0%, 100% 100%, 0% 90%)"
        />
      </div>

      <!-- Image 2 -->
      <div class="h-full w-1/3 relative overflow-hidden">
        <img
          src="/assets/images/services/terminal.jpg"
          alt="Image 2"
          class="h-full w-full object-cover transform transition-transform duration-500 hover:scale-110"
          style="clip-path: polygon(0% 10%, 100% 0%, 100% 90%, 0% 100%)"
        />
      </div>
    </div>
    <!--Overlay for nav visibility-->
    <div class="w-full h-full absolute top-0 bg-gradient-to-b from-black/80 to-transparent"></div>
  </section>
</template>
<script setup>

</script>

<style>
/* Ensure the diagonal cuts are consistent across all browsers */
img {
  clip-path: inherit; /* Inherit clip-path from inline style */
}
</style>