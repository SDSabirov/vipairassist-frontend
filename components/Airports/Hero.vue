<template>
  <div class="relative top-0 w-screen h-screen">
    <img
      :src="src"
      alt="hero image"
      class="object-cover h-full w-full"
    />
    <div
      class="absolute top-0 bg-black/50 w-full h-full flex flex-col items-center justify-center"
    >
      <header
        class="flex flex-col max-w-screen-xl h-full items-center justify-center space-y-4"
      >
        <h1
          class="text-white text-4xl md:text-6xl lg:text-7xl text-center mb-6 p-2 text-base leading-loose"
        >
          {{name }}
        </h1>

      </header>
    </div>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
});
</script>

