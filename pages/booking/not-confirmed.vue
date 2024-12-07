<template>
  <div class="flex flex-col items-center justify-center h-screen bg-yellow-50">
    <div
      class="flex items-center justify-center w-24 h-24 text-yellow-700 rounded-full mb-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="88"
        height="88"
        viewBox="0 0 24 24"
        style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
      >
        <path
          d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
        ></path>
        <path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path>
      </svg>
    </div>

    <!-- Unconfirmed Message -->
    <h1 class="text-2xl md:text-3xl font-semibold text-yellow-700">
      Booking Under Review
    </h1>
    <p class="text-gray-600 mt-2 text-center px-4">
      Thank you for your booking. As this is a short-notice request, our team
      needs to confirm the availability of services. We will contact you shortly
      to confirm your booking details.
    </p>

    <!-- Contact Support Section -->
    <div class="mt-6 text-center">
      <p class="text-gray-600">
        If you have any questions or require immediate assistance, please
        contact us:
      </p>
      <p class="mt-2 text-gray-700 font-semibold">
        <a href="tel:+971506964878" class="text-blue-500 hover:underline"
          >+971506964878</a
        >
      </p>
      <p class="text-gray-700 font-semibold">
        <a
          href="mailto:info@vipairassist.com"
          class="text-blue-500 hover:underline"
          >info@vipairassist.com</a
        >
      </p>
    </div>

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
