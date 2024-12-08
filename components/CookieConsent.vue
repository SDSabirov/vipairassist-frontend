<template>
  <div class="h-screen max-w-screen w-screen bg-black/60 z-100 fixed top-0" v-if="showBanner">
    <div
      
      class="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 px-6 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center z-50"
    >
      <div class="text-sm sm:text-base leading-5 mb-4 sm:mb-0">
        <p>
          We use cookies to improve your experience on our site and to show you
          personalized content. By using our site, you consent to our
          <NuxtLink to="/privacy-policy" class="underline hover:text-gray-300">
            Privacy Policy
          </NuxtLink>
          .
        </p>
      </div>
      <button
        @click="acceptCookies"
        class="bg-green-500 text-white px-4 py-2  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Accept Cookies
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const showBanner = ref(false);

const acceptCookies = () => {
  // Store the user's consent in localStorage
  localStorage.setItem("cookiesAccepted", "true");
  showBanner.value = false; // Hide the banner
};

onMounted(() => {
  // Check localStorage to determine if the banner should be displayed
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");
  if (!cookiesAccepted) {
    showBanner.value = true; // Show the banner only if no previous consent
  }
});
</script>
