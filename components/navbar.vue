<template>
   <div>
    <MobileNav/>
    <nav
      class="fixed top-0 left-0 w-full z-50 transition-all duration-500 invisible lg:visible "
      :class="{ 'bg-black shadow-lg': isScrolled, 'bg-transparent': !isScrolled }"
    >
      <div
        class="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between text-white text-xl py-4"
      >
        <!-- Left Section: Navigation Links -->
        <div class="flex space-x-8 items-center">
          <a href="/">
            <img src="/logo.svg" alt="Logo" class="h-16" />
          </a>
  
          <!-- Our Services Dropdown -->
          <div
            class="relative"
            @mouseenter="showDropdown"
            @mouseleave="hideDropdownWithDelay"
          >
            <a href="/services" class="hover:text-gray-400 flex items-center gap-1">
              Our Services
              <i class="bx bx-chevron-down text-lg"></i>
            </a>
            <!-- Dropdown Menu -->
            <div
              v-if="isDropdownVisible"
              class="absolute bg-gray-800 py-2 rounded-md top-8 left-0 z-10"
            >
              <a
                href="/services/meet-and-greet"
                class="block px-4 py-2 text-white hover:bg-gray-600 whitespace-nowrap"
              >
                Meet & Greet, Fast Track
              </a>
              <a
                href="/services/private-vip-terminal"
                class="block px-4 py-2 text-white hover:bg-gray-600 whitespace-nowrap"
              >
              Private VIP Terminal
              </a>
              <a
                href="/services/chauffer"
                class="block px-4 py-2 text-white hover:bg-gray-600 whitespace-nowrap"
              >
                Chauffer Services
              </a>
            </div>
          </div>
  
          <a href="/about" class="hover:text-gray-400">About Us</a>
          <a href="/blogs" class="hover:text-gray-400">Blogs</a>
          <a href="/airports" class="hover:text-gray-400">Airports</a>
          <a href="/contact" class="hover:text-gray-400">Contact Us</a>
        </div>
  
        <!-- Right Section: Login & Membership -->
        <div class="flex space-x-8 mt-4 md:mt-0 items-center">
          <ButtonsLogin />
          <ButtonsMembership />
        </div>
      </div>
    </nav>
   </div>
    
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  
  // State for dropdown visibility
  const isDropdownVisible = ref(false);
  let hideTimeout;
  
  // State for navigation bar scroll behavior
  const isScrolled = ref(false);
  
  // Show the dropdown immediately
  const showDropdown = () => {
    clearTimeout(hideTimeout); // Cancel any pending hide
    isDropdownVisible.value = true;
  };
  
  // Hide the dropdown with a delay
  const hideDropdownWithDelay = () => {
    hideTimeout = setTimeout(() => {
      isDropdownVisible.value = false;
    }, 300); // Adjust delay in milliseconds (e.g., 300ms)
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
  
