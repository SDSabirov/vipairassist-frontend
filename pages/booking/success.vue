<template>
  <div class="flex flex-col items-center justify-center h-screen bg-green-50">
    <!-- Success Icon -->
    <div
      class="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-12 h-12 text-green-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12l2 2 4-4M12 19a7 7 0 100-14 7 7 0 000 14z"
        />
      </svg>
    </div>

    <!-- Success Message -->
    <h1 class="text-2xl md:text-3xl font-semibold text-green-700">
      Payment Successful!
    </h1>
    <p class="text-gray-600 mt-2 text-center px-4">
      Thank you for your payment. Your transaction has been completed
      successfully. A confirmation email has been sent to your email
      address.
    </p>

    <!-- Action Buttons -->
    <div
      class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-6"
    >
      <NuxtLink
        to="/"
        class="relative px-12 py-3 text-black border border-black text-2xl leading-[108%] group overflow-hidden"
      >
        <span
          class="absolute inset-0 w-0 bg-black/70 transition-all duration-500 ease-in-out group-hover:w-full"
        ></span>
        <div
          class="flex items-center justify-center space-x-4 relative z-10 transition-colors duration-500 group-hover:text-white"
        >
          <p>Go to home page</p>
          <i class="bx bx-right-arrow-alt"></i>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
