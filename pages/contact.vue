<template>
  <div>
    <Navbar />
    <div
      class="w-full h-[70vh] flex justify-center items-center bg-gray-900 relative overflow-hidden"
    >
      <img
        src="/assets/images/backgrounds/contactPage.webp"
        alt="Contact page"
        class="h-full w-full object-cover object-top"
      />
      <header
        class="absolute top-0 flex flex-col w-full h-full items-center justify-center"
      >
        <h2 class="text-4xl md:text-6xl text-white">
          Contact Us
        </h2>
        <div class="mt-10">
          <p class="text-2xl md:text-4xl leading-[108%] text-white">Get in Touch with VIP Air Assist – Your Journey, Our Priority</p>
        </div>
      </header>
      <div
        class="absolute bottom-0 px-5 md:px-[50px] pb-10 pt-5 md:mt-[55px] translate-y-6 mx-auto bg-[#fbfcf8] rounded-t-[40px]"
      >
        <h3
          data-aos="fade-up"
          data-aos-duration="300"
          class="bg-[#fbfcf8] text-center mx-auto font-normal text-xl md:text-[28px] leading-[37px]"
        >
          <NuxtLink to="/services" class="border-r-[2px] border-r-black pr-2">
            Home
          </NuxtLink>
          <span class="px-4">Contact Us</span>
        </h3>
      </div>
    </div>
    <section
      class="bg-white w-full flex flex-col justify-center items-center py-10"
    >
    <div class="w-full max-w-screen-xl">
        <FormsContactForm />
    </div>
      
    </section>
    <ContactDetails/>
    <Footer />
  </div>
</template>

<script setup>
useHead({
    title: "Contact Us – Reach Out for Premium Airport Services Worldwide",
    meta: [
      {
        name: "description",
        content: `Have questions or need assistance with our Meet and Greet, Fast Track, Chauffeur, or VIP Terminal services? Contact us today! Our dedicated team is available 24/7 to help you plan a seamless and luxurious travel experience at airports worldwide.`
      },
    ],
  });
</script>
