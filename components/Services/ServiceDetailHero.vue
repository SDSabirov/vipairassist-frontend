<template>
    
  <div class="w-full h-[70vh] flex justify-center items-center bg-gray-900 relative overflow-hidden">
    <img
      :src="src"
      alt="Service Image"
      class="h-full w-full object-cover object-top"
    />
    <div class="absolute top-0 flex flex-col w-full h-full items-center justify-center">
        <h2 class="text-4xl md:text-6xl text-white">
            Meet & Greet, Fast Track
        </h2>
        <div class="mt-10">
            <ButtonsBookNow />
        </div>
    </div>
    <div
        class="absolute bottom-0 px-5 md:px-[50px] pb-10 pt-5 md:mt-[55px] translate-y-6 mx-auto bg-[#fbfcf8] rounded-t-[40px]"
      >
        <h3
          data-aos="fade-up"
          data-aos-duration="300"
          class="bg-[#fbfcf8] text-center mx-auto font-normal text-xl md:text-[28px] leading-[37px]"
        >
          <NuxtLink to="/services" class="border-r-[2px] border-r-black pr-2"> Services </Nuxtlink>
          <span class="px-4 ">{{page}}</span>
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
