<template>
  <div
    class="relative w-full h-[60vh] bg-gray-200 flex items-center justify-center overflow-hidden flex-col"
  >
    <!-- Background Hero Text -->
    <h1
      class="text-2xl md:text-5xl text-center font-medium leading-xl md:leading-4xl text-white z-10 mb-8"
    >
      Find Services at Your Preferred Airports
    </h1>
    
    <ButtonsBookNow  class="z-10"/>
    <!-- Tilted Images -->
    <div class="absolute w-full h-full flex items-center justify-center">
      <!-- Top Left Image -->
      <img
        class="absolute top-10 left-10 w-[200px] md:w-[300px] transform rotate-[-30deg] shadow-lg"
        src="/assets/images/backgrounds/viproom.webp"
        alt="Image 1"
      />
      <!-- Top Right Image -->
      <img
        class="absolute top-16 right-10 w-[200px] md:w-[300px] transform rotate-[15deg] shadow-lg"
        src="/assets/images/backgrounds/bookingPage.webp"
        alt="Image 2"
      />
      <!-- Bottom Left Image -->
      <img
        class="absolute bottom-16 left-16 w-[200px] md:w-[400px] transform rotate-[35deg] shadow-lg"
        src="/assets/images/backgrounds/bookingPage.webp"
        alt="Image 3"
      />
      <!-- Bottom Right Image -->
      <img
        class="absolute bottom-10 right-10 w-[200px] md:w-[350px] transform rotate-[-40deg] shadow-lg"
        src="/assets/images/backgrounds/about.webp"
        alt="Image 4"
      />
      <!-- Top Middle Image -->
      <img
        class="absolute top-5 left-1/2 transform -translate-x-1/2 w-[250px] md:w-[400px] transform rotate-[-15deg] shadow-lg"
        src="/assets/images/backgrounds/aboutBackground.webp"
        alt="Image 5"
      />
      <!-- Bottom Middle Image -->
      <img
        class="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[250px] md:w-[400px] transform rotate-[20deg] shadow-lg"
        src="/assets/images/backgrounds/fasttracksign.webp"
        alt="Image 6"
      />
    </div>
    <div class="absolute w-full h-full top-0 bg-black/60"></div>
  </div>
</template>

<script setup>

</script>