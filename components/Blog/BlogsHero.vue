<template>
    <div
      class="w-full h-[50vh] md:h-[70vh] flex justify-center items-center bg-gray-900 relative overflow-hidden"
    >
      <img
        :src="src"
        alt="Blog Hero Image"
        class="h-full w-full object-cover object-center md:object-top"
      />
      <!--Overlay-->
      <div class="w-full h-full absolute top-0 bg-black/60"></div>
      <header
        class="absolute top-0 flex flex-col w-full h-full items-center justify-center px-4"
      >
        <h2 class="text-3xl md:text-4xl lg:text-6xl text-white text-center font-bold">
          Our Blog
        </h2>
        
      </header>
      <div
        class="absolute bottom-0 px-4 md:px-[50px] pb-8 md:pb-10 pt-4 md:pt-5 translate-y-4 md:translate-y-6 mx-auto bg-[#fbfcf8] rounded-t-[20px] md:rounded-t-[40px] w-full max-w-lg md:max-w-none"
      >
        <h3
          data-aos="fade-up"
          data-aos-duration="300"
          class="bg-[#fbfcf8] text-center mx-auto font-normal text-lg md:text-xl lg:text-[28px] leading-6 md:leading-[37px]"
        >
          <NuxtLink v-if="page=='Our Blogs'" to="/" class="border-r-[2px] border-r-black pr-2 hover:text-gray-600 transition-colors">
            Home
          </NuxtLink>
          <NuxtLink v-else to="/blogs" class="border-r-[2px] border-r-black pr-2 hover:text-gray-600 transition-colors">
            Blogs
          </NuxtLink>
          <span class="px-2 md:px-4 text-sm md:text-lg lg:text-[28px]">{{page}}</span>
        </h3>
      </div>
    </div>
</template>

<script setup>

defineProps({
  src: {
    type: String,
    required: true,
  },
  page:{
    type: String,
    required: true,
  },
});
</script>
