<template>
    <div
      class="w-full h-[70vh] flex justify-center items-center bg-gray-900 relative overflow-hidden"
    >
      <img
        :src="src"
        alt="Blog Image"
        class="h-full w-full object-cover object-top"
      />
      <!--Overlay-->
      <div class="w-full h-full absolute top-0 bg-black/60"></div>
      <header
        class="absolute top-0 flex flex-col w-full h-full items-center justify-center"
      >
        <h2 class="text-4xl md:text-6xl text-white">
          Our Blog
        </h2>
        
      </header>
      <div
        class="absolute bottom-0 px-5 md:px-[50px] pb-10 pt-5 md:mt-[55px] translate-y-6 mx-auto bg-[#fbfcf8] rounded-t-[40px]"
      >
        <h3
          data-aos="fade-up"
          data-aos-duration="300"
          class="bg-[#fbfcf8] text-center mx-auto font-normal text-xl md:text-[28px] leading-[37px]"
        >
          <NuxtLink v-if="page=='Our Blogs'" to="/" class="border-r-[2px] border-r-black pr-2">
            Home
          </NuxtLink>
          <NuxtLink v-else to="/blogs" class="border-r-[2px] border-r-black pr-2">
            Blogs
          </NuxtLink>
          <span class="px-4">{{page}}</span>
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
