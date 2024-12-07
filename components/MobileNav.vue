<template>
    <nav class="fixed top-0 left-0 w-full z-50 transition-all duration-500 text-white md:hidden" :class="{ 'bg-black shadow-lg': isScrolled, 'bg-transparent': !isScrolled }">
      <div class="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4">
        <!-- Hamburger Menu -->
        <button
          @click="toggleMenu"
          class="text-3xl"
          aria-label="Toggle navigation menu"
        >
          <i class="bx bx-menu"></i>
        </button>
  
        
  
        <!-- Login Button -->
        <div class="flex items-center  space-x-4">
          <ButtonsLogin />
          <ButtonsMembership />
        </div>
      </div>
  
      <!-- Dropdown Menu -->
      <div
        v-if="isMenuOpen"
        class="absolute top-full left-0 w-full bg-gray-900 text-white py-4"
      >
        <ul class="space-y-4 px-8">
          <li class="p-4 border-b-white border-b py-6">
            <a href="/" class="block hover:text-gray-400">Home</a>
          </li>
          <li class="p-4 border-b-white border-b py-6">
            <div @click="toggleDropdown('services')" class="flex justify-between items-center ">
              <a href="/services" class="hover:text-gray-400">
                Our Services
              </a>
              <i
                :class="{
                  'bx bx-chevron-down': !isDropdownVisible,
                  'bx bx-chevron-up': isDropdownVisible,
                }"
                class="text-lg"
              ></i>
            </div>
            <!-- Services Dropdown Links -->
            <ul
              v-if="activeDropdown === 'services'"
              class="ml-4 mt-2 space-y-2 text-gray-300"
            >
              <li>
                <a
                  href="/services/meet-and-greet"
                  class="block hover:text-white"
                >
                  Meet & Greet, Fast Track
                </a>
              </li>
              <li>
                <a
                  href="/services/private-vip-terminal"
                  class="block hover:text-white"
                >
                  Private VIP Terminal
                </a>
              </li>
              <li>
                <a href="/services/chauffer" class="block hover:text-white">
                  Chauffer Services
                </a>
              </li>
            </ul>
          </li>
          <li class="p-4 border-b-white border-b py-6">
            <a href="/about" class="block hover:text-gray-400">About Us</a>
          </li>
          <li class="p-4 border-b-white border-b py-6">
            <a href="/blogs" class="block hover:text-gray-400">Blogs</a>
          </li>
          <li class="p-4 border-b-white border-b py-6">
            <a href="/airports" class="hover:text-gray-400">Airports</a>
          </li>
          <li class="p-4 border-b-white border-b py-6">
            <a href="/contact" class="block hover:text-gray-400">Contact Us</a>
          </li>
          <li>
            
          </li>
        </ul>
      </div>
    </nav>
    
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // State for menu and dropdown visibility
  const isMenuOpen = ref(false);
  const activeDropdown = ref(null);
  const isScrolled = ref(false);
  // Toggles the mobile menu
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  // Toggles dropdown visibility for a specific section
  const toggleDropdown = (section) => {
    activeDropdown.value = activeDropdown.value === section ? null : section;
  };
  // Handle scroll to update the navbar background
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10; // Change after 50px of scrolling
  };
  
  // Add and remove event listeners for scrolling
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
  </script>
  
  <style scoped>
  
  </style>
  