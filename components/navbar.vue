<template>
    <nav class="bg-transparent fixed top-0 left-0 w-full bg-black z-50">
      <div class="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between text-white text-xl py-4">
        <!-- Left Section: Navigation Links -->
        <div class="flex space-x-8 items-center">
          <a href="/">
            <img src="/logo.svg" alt="Logo" class="h-16">
          </a>
  
          <!-- Our Services Dropdown -->
          <div
            class="relative"
            @mouseenter="showDropdown"
            @mouseleave="hideDropdownWithDelay"
          >
            <button class="hover:text-gray-400 flex items-center gap-1">
              Our Services
              <i class="bx bx-chevron-down text-lg"></i>
            </button>
            <!-- Dropdown Menu -->
            <div
              v-if="isDropdownVisible"
              class="absolute bg-gray-800 py-2 rounded-md top-8 left-0 z-10"
            >
              <a
                href="/services/meet-and-greet"
                class="block px-4 py-2 text-white hover:bg-gray-600 whitespace-nowrap"
              >
                Meet & Greet
              </a>
              <a
                href="/services/fast-track"
                class="block px-4 py-2 text-white hover:bg-gray-600 whitespace-nowrap"
              >
                Fast Track
              </a>
              <a
                href="/services/private-vip"
                class="block px-4 py-2 text-white hover:bg-gray-600 whitespace-nowrap"
              >
                Private VIP Terminal
              </a>
            </div>
          </div>
  
          <a href="" class="hover:text-gray-400">About Us</a>
          <a href="" class="hover:text-gray-400">Blogs</a>
          <a href="" class="hover:text-gray-400">Contact Us</a>
        </div>
  
        <!-- Right Section: Login & Membership -->
        <div class="flex space-x-8 mt-4 md:mt-0 items-center">
          <a href="" class="hover:text-gray-400">Login</a>
          <a
            href=""
            class="px-6 py-4 bg-white text-black hover:bg-gray-200 transition"
          >
            Become a member
          </a>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isDropdownVisible = ref(false);
  let hideTimeout;
  
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
  </script>
  