<script setup lang="ts"></script>

<template>
  <section class="bg-white w-full justify-center items-center">
    <div class="flex flex-col max-w-screen-xl mx-auto py-12 md:py-16 px-4 md:px-6">
      <!-- Enhanced Section Header -->
      <div class="flex items-center justify-between mb-8 md:mb-12">
        <div class="flex items-center w-full max-w-md">
          <h1 class="uppercase text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap">
            Core Services
          </h1>
          <div class="ml-4 md:ml-6 h-[2px] flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
          <div class="w-3 h-3 rotate-45 bg-gray-800 ml-2"></div>
        </div>
      </div>
      
      <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-800 mb-8 md:mb-12 text-center md:text-left max-w-4xl">
        The Best <span class="text-blue-600">VIP Services</span> Just for You!
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <!--Enhanced Meet and Greet-->
        <NuxtLink
          to="/services/meet-and-greet"
          class="relative w-full h-[400px] md:h-[450px] group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
        >
          <!-- Optimized Background Image -->
          <img
            src="/assets/images/services/meetgreetCard.webp"
            alt="Meet & Greet Fast Track Services"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width="800"
            height="450"
          />

          <!-- Enhanced Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-blue-900/80 group-hover:via-blue-800/40 transition-all duration-500"></div>
          
          <!-- Content -->
          <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div class="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-blue-100">
                Meet & Greet Fast Track
              </h3>
              <p class="text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                Skip the queues with our premium meet & greet service and fast-track security clearance.
              </p>
              <div class="flex items-center mt-4 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                <span class="text-sm font-medium">Learn More</span>
                <i class="bx bx-right-arrow-alt ml-2 transform group-hover:translate-x-2 transition-transform duration-300"></i>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!--Enhanced Private VIP Terminals-->
        <NuxtLink
          to="/services/private-vip-terminal"
          class="relative w-full h-[400px] md:h-[450px] group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
        >
          <!-- Optimized Background Image -->
          <img
            src="/assets/images/services/vipterminal.webp"
            alt="Private VIP Terminal Services"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width="800"
            height="450"
          />

          <!-- Enhanced Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-purple-900/80 group-hover:via-purple-800/40 transition-all duration-500"></div>
          
          <!-- Content -->
          <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div class="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-purple-100">
                Private VIP Terminals
              </h3>
              <p class="text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                Exclusive access to private terminals with premium amenities and personalized service.
              </p>
              <div class="flex items-center mt-4 text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                <span class="text-sm font-medium">Learn More</span>
                <i class="bx bx-right-arrow-alt ml-2 transform group-hover:translate-x-2 transition-transform duration-300"></i>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!--Enhanced Chauffeur Services-->
        <NuxtLink
          to="/services/chauffer"
          class="relative w-full h-[400px] md:h-[450px] group overflow-hidden md:col-span-2 shadow-xl hover:shadow-2xl transition-all duration-500"
        >
          <!-- Optimized Background Image -->
          <img
            src="/assets/images/services/chauffer.jpg"
            alt="Premium Chauffeur Services"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width="1200"
            height="450"
          />

          <!-- Enhanced Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-emerald-900/80 group-hover:via-emerald-800/40 transition-all duration-500"></div>
          
          <!-- Content -->
          <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div class="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-emerald-100">
                Premium Chauffeur Services
              </h3>
              <p class="text-white/90 text-base md:text-lg leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 max-w-2xl">
                Luxury ground transportation with professional chauffeurs for seamless airport transfers and city travel.
              </p>
              <div class="flex items-center mt-6 text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                <span class="text-base font-medium">Learn More</span>
                <i class="bx bx-right-arrow-alt ml-2 transform group-hover:translate-x-2 transition-transform duration-300 text-xl"></i>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
