<template>
  <div
    class="flex flex-col items-center justify-center h-full w-full"
  >
    <!-- Loading Container -->
    <div class="relative flex items-center justify-center h-28 w-28">
      <!-- Spinning Border -->
      <div
        class="animate-spin rounded-full h-full w-full border-t-4 border-white border-solid"
      ></div>
      <!-- Logo in Center -->
      <img
        src="/logo.svg"
        alt="Logo"
        class="absolute h-16 w-16 animate-pulse"
      />
    </div>
    <p class="text-white mt-2">Please wait ...</p> 
  </div>
</template>

<script setup>

</script>


