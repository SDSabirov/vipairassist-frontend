<template>
  <section class="bg-white w-full justify-center items-center">
    <div class="flex flex-col max-w-screen-xl mx-auto py-10">
      <div class="flex items-center w-1/4">
        <h1 class="uppercase text-2xl font-medium text-6 md:leading-8">
          Core Services
        </h1>
        <div class="ml-6 h-[1px] flex-grow bg-black"></div>
        <div class="w-3 h-3 rotate-45 bg-black"></div>
      </div>
      <h2
        class="text-2xl md:text-4xl mt-4 font-medium leading-lg md:mx-0 md:text-start mx-auto text-center w-[80%] md:w-full md:leading-2xl"
      >
        The best VIP services just for you!
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-2 md:px-0">
        <!--Meet and Greet-->
        <div class="relative w-full h-[450px] group overflow-hidden">
          <!-- Background Image -->
          <div
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 bg-[url('/assets/images/services/meetgreetCard.webp')] group-hover:scale-105"
          ></div>

          <div
            class="absolute inset-0 bg-black bg-opacity-60 group-hover:translate-x-[-100%] transition-transform duration-500"
          ></div>
          <div
            class="absolute bottom-0 left-0 group-hover:bg-black/70 group-hover:text-2xl text-white text-xl font-bold px-4 py-2 z-10 transition-all duration-500"
          >
            <h3>Meet & Greet Fast track</h3>
          </div>
        </div>
        <!--Private Vip Terminals-->
        <div class="relative w-full h-[450px] group overflow-hidden">
          <!-- Background Image -->
          <div
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 bg-[url('/assets/images/services/vipterminal.webp')] group-hover:scale-105"
          ></div>

          <div
            class="absolute inset-0 bg-black bg-opacity-60 group-hover:translate-x-[-100%] transition-transform duration-500"
          ></div>
          <div
            class="absolute bottom-0 left-0 group-hover:bg-black/70 group-hover:text-2xl text-white text-xl font-bold px-4 py-2 z-10 transition-all duration-500"
          >
            <h3>Private Vip Terminals</h3>
          </div>
        </div>

        <!--Chauffer-->
        <div
          class="relative w-full h-[450px] group overflow-hidden md:col-span-2"
        >
          <!-- Background Image -->
          <div
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 bg-[url('/assets/images/services/chauffer.jpg')] group-hover:scale-105"
          ></div>

          <div
            class="absolute inset-0 bg-black bg-opacity-60 group-hover:translate-x-[-100%] transition-transform duration-500"
          ></div>
          <div
            class="absolute bottom-0 left-0 group-hover:bg-black/70 group-hover:text-2xl text-white text-xl font-bold px-4 py-2 z-10 transition-all duration-500"
          >
            <h3>Chauffer Services</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
