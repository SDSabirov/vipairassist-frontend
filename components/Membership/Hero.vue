<template>
  <div
    class="w-full h-[70vh] flex justify-center items-center bg-gray-900 relative overflow-hidden"
  >
    <img
      src="/assets/images/backgrounds/membership.webp"
      alt="Blog Image"
      class="h-full w-full object-cover object-top"
    />
    <!--image provided is already dark add overlay  here if it will be changed -->
    <div class="w-full h-full absolute top-0"></div>
    <header
      class="absolute top-0 flex flex-col w-full h-full items-center justify-center"
    >
      <h1
        class="text-xl md:text-4xl text-white max-w-screen-xl text-center mb-6"
      >
        Unlock Exclusive Benefits with Our Membership
      </h1>
      <h2 class="text-lg md:text-2xl text-white max-w-screen-xl text-center mb-6">
        Experience travel like never before. Become a VIP AirAssist member and
        let us elevate your journey to new heights of luxury and comfort
      </h2>
      <NuxtLink to="/">
        <button
          class="relative px-6 py-2 text-white bg-black/40 text-white text-2xl leading-[182%] border border-white group overflow-hidden"
        >
          <span
            class="absolute inset-0 w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full"
          ></span>
          <div
            class="flex items-center justify-center space-x-2 relative z-10 transition-colors duration-500 group-hover:text-black"
          >
            <p>Sign Up</p>
            <i class="bx bx-right-arrow-alt"></i>
          </div>
        </button>
      </NuxtLink>
    </header>
  </div>
</template>

<script setup></script>
