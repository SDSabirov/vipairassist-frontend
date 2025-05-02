<template>
  <div>
    <Navbar />
    <ServicesServiceDetailHero :src="image" :page="page" />
    <section
      class="bg-white flex flex-col w-full justify-center items-center py-6 md:py-14"
    >
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-14 max-w-screen-xl px-4 md:px-0 lg:px-0 place-items-stretch"
      >
        <div class="flex-grow items-center">
          <p
            data-aos="fade-left"
            data-aos-duration="400"
            class="text-[20px] md:text-[28px] text-justify mt-4 font-normal leading-[180%] md:mx-0 md:text-start w-full md:w-[590px] md:leading-[204%] text-[#4D4D4D]"
          >
            Welcome to our luxury chauffeur services, where we offer both
            sustainable and regular luxury transfers to cater to all your travel
            needs.Our regular luxury transfers provide you with a premium travel
            experience with our fleet of luxurious vehicles. Our highly
            professional chauffeurs ensure a comfortable and safe journey to
            your destination, with top-class amenities and personalised service.
            For those who prioritise environmental responsibility.
          </p>
        </div>
        <img
          src="/assets/images/services/chaufferd1.webp"
          alt="Chauffer Services"
          class="object-cover"
        />

        <img
          src="/assets/images/services/chaufferd2.webp"
          alt="Chauffer Services"
          class="object-cover order-last md:order-none"
        />
        <div class="flex-grow items-center">
          <p
            data-aos="fade-left"
            data-aos-duration="400"
            class="text-[20px] md:text-[28px] text-justify mt-4 font-normal leading-[180%] md:mx-0 md:text-start w-full md:w-[590px] md:leading-[204%] text-[#4D4D4D]"
          >
            Our sustainable luxury chauffeur services offer eco-friendly
            vehicles, biodegradable materials, and responsible business
            practices. We are committed to reducing our carbon footprint and
            supporting local communities, while still providing a luxurious
            travel experience. Whether you choose our regular or sustainable
            luxury chauffeur services, you can expect the highest level of
            quality and comfort. Book with us now and indulge in a truly
            luxurious travel experience.
          </p>
        </div>
      </div>
    </section>
    <div class="flex flex flex-col items-center justify-center w-full py-10">
      <div class="max-w-screen-xl flex flex-col items-center w-full space-y-6">
        <h4
          class="uppercase text-2xl md:text-4xl font-medium text-6 md:leading-8 mb-6"
        >
          Start Your Booking
        </h4>
        <FormsBaseService />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import image from "~/assets/images/services/chaufferdetail.webp";
import Navbar from "~/components/navbar.vue";

const page = " Chauffer Services";
useHead({
  title:
    "Chauffeur Airport Transfers – Luxury Travel with Personalized Comfort",
  meta: [
    {
      name: "description",
      content: `Arrive in style with our chauffeur services at airports worldwide. Our professional drivers provide luxury transfers, ensuring a seamless and comfortable experience from the airport to your destination. Relax in the back of a premium vehicle as we take care of your transportation needs, leaving you free to enjoy your travel.`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Chauffeur Services",
        description:
          "Luxury chauffeur services offering sustainable and regular airport transfers with professional drivers and premium vehicles.",
        provider: {
          "@type": "Organization",
          name: "Vip Air Assist",
          url: "https://vipairassist.com", // Replace with your actual URL
          logo: "https://vipairassist.com/logo.svg", 
        },
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        serviceType: "Luxury Chauffeur Transfers",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://vipairassist.com/services/chauffeur", 
        },
        
        
      }),
    },
  ],
});
</script>

<style lang="scss" scoped></style>
