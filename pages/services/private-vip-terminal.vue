<template>
    <div>
      <Navbar />
      <ServicesServiceDetailHero :src="image" :page="page" />
      <section
        class="bg-white flex flex-col w-full justify-center items-center py-4 md:py-14"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-14 max-w-screen-xl px-2 lg:px-0 place-items-stretch px-4 md:px-0">
          <div class="flex-grow items-center">
            <p
              data-aos="fade-left"
              data-aos-duration="400"
              class="text-[20px] md:text-[28px] text-justify font-normal leading-[180%] md:mx-0 md:text-start w-full md:w-[590px] md:leading-[204%] text-[#4D4D4D]"
            >
              Our Airport "Meet and Greet Fast Track" services are intended to
              provide passengers with a smooth and hassle-free airport experience.
              Travellers can experience a stress-free trip through the airport by
              escaping long queues and avoiding the usual crowds and chaos. When
              you schedule a "Meet and Greet Fast Track" service.
            </p>
          </div>
          <img
            src="/assets/images/services/vipterminald1.webp"
            alt="Private VIP Terminal Services"
            class="object-cover"
          />
  
          <img
            src="/assets/images/services/vipterminald2.webp"
            alt="Private VIP Terminal Services"
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
  import image from "~/assets/images/services/vipterminaldetail.webp";
  import Navbar from "~/components/navbar.vue";
  
  const page = "Private VIP Terminal Services";
  useHead({
    title: "VIP Terminal Access – Exclusive Airport Lounges and Personalized Service",
    meta: [
      {
        name: "description",
        content: `Indulge in the luxury of VIP Terminal access, offering exclusive lounges and expedited services at major airports worldwide. Skip the crowds, enjoy private check-in, and relax in a tranquil, upscale environment before your flight. Our VIP terminal services ensure a refined and hassle-free airport experience, tailored to your needs.`
      },
    ],
  });
  </script>
  
  <style lang="scss" scoped></style>
  