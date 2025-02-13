<template>
  <div>
    <Navbar />
    <ServicesServiceDetailHero :src="image" :page="page" />
    <section
      class="bg-white flex flex-col w-full justify-center items-center py-6 md:py-14"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-14 max-w-screen-xl px-4 md:px-0 lg:px-0 place-items-stretch">
        <div class="flex-grow items-center">
          <p
            data-aos="fade-left"
            data-aos-duration="400"
            class="text-[20px] md:text-[28px] text-justify mt-4 font-normal leading-[180%] md:mx-0 md:text-start w-full md:w-[590px] md:leading-[204%] text-[#4D4D4D]"
          >
            Our Airport "Meet and Greet Fast Track" services are intended to
            provide passengers with a smooth and hassle-free airport experience.
            Travellers can experience a stress-free trip through the airport by
            escaping long queues and avoiding the usual crowds and chaos. When
            you schedule a "Meet and Greet Fast Track" service.
          </p>
        </div>
        <img
          src="/assets/images/services/meetgreetD1.jpg"
          alt="Meet and Greet Description picture"
          class="object-cover"
        />

        <img
          src="/assets/images/services/meetgreetD2.jpg"
          alt="Meet and Greet Description picture"
          class="object-cover order-last md:order-none"
        />
        <div class="flex-grow items-center">
          <p
            data-aos="fade-left"
            data-aos-duration="400"
            class="text-[20px] md:text-[28px] text-justify mt-4 font-normal leading-[180%] md:mx-0 md:text-start w-full md:w-[590px] md:leading-[204%] text-[#4D4D4D]"
          >
            You can expect to be greeted at the airport by a friendly and
            competent representative who will help you with your luggage and
            direct you through the terminal. You will be led through priority
            lines and expedited security checks, enabling you to breeze through
            the airport and arrive at your location more quickly.
          </p>
        </div>
      </div>
      
    </section>
    <div class="flex flex flex-col items-center justify-center w-full py-10">
      <div class="max-w-screen-xl flex flex-col items-center w-full space-y-6">
        <h4 class="uppercase text-2xl md:text-4xl font-medium text-6 md:leading-8 mb-6">Start Your Booking</h4>
        <FormsBaseService/>
      </div>
      
    </div>
    <Footer />
  </div>
</template>

<script setup>
import image from "~/assets/images/services/meetgreetdetail.jpg";
import Navbar from "~/components/navbar.vue";

const page = "Meet & Greet , Fast Track";
useHead({
    title: "Meet and Greet & Fast Track Airport Services – Skip the Lines and Travel in Comfort",
    meta: [
      {
        name: "description",
        content: `Enjoy a smooth and stress-free airport experience with our Meet and Greet and Fast Track services. Skip long lines, breeze through security, and receive personalized assistance from our expert concierges. Whether you're traveling for business or leisure, our premium service ensures that you start your journey with ease and comfort.`
      },
    ],
  });
</script>

<style lang="scss" scoped></style>
