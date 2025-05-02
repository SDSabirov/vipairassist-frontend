<template>
  <div>
    <Navbar />
    <ServicesServiceDetailHero :src="image" :page="page" />
    <section
      class="bg-white flex flex-col w-full justify-center items-center py-4 md:py-14 max-w-screen-xl mx-auto"
    >
    
      <h2
        class="text-[20px] md:text-[28px]  font-normal leading-[180%] md:mx-0 w-full md:leading-[204%] text-[#4D4D4D] font-semibold text-center whitespace-nowrap mb-6"
      >
        Exclusive VIP Terminal Services for the Discerning Traveler
      </h2>
      <p
        data-aos="fade-left"
        data-aos-duration="400"
        class="text-lg md:text-xl text-center font-normal leading-[180%] md:mx-0  w-full md:leading-[204%] text-[#4D4D4D] mb-8"
      >
        Experience unparalleled luxury and comfort with our Private VIP Terminal
        Services, designed for travelers who demand the highest standards of
        service. Skip the queues, avoid the hustle and bustle, and enjoy a
        seamless journey from start to finish with our bespoke VIP services at
        more than 900 airports worldwide
      </p>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-14 max-w-screen-xl px-2 lg:px-0 place-items-stretch px-4 md:px-0"
      >
      <div class="flex-grow items-center">
          <h3
            class="text-[20px] md:text-[28px] text-justify font-normal leading-[180%] md:mx-0 md:text-start w-full md:w-[590px] md:leading-[204%] text-[#4D4D4D] font-semibold text-center whitespace-nowrap mb-6"
          >
            Why Choose Our VIP Terminal Services
          </h3>
          <ul
            class="list-disc pl-5 text-lg md:text-xl text-justify font-normal leading-[180%] md:mx-0 md:text-start w-full md:w-[590px] md:leading-[204%] text-[#4D4D4D]"
          >
            <li>
              <strong>Personalized Assistance:</strong> Our dedicated team of
              professionals provides a tailored experience, guiding you through
              check-in, security, and immigration processes with speed and
              efficiency.
            </li>
            <li>
              <strong>Private Lounge Access:</strong> Relax in a serene,
              comfortable environment before your flight. Our exclusive lounges
              offer high-end amenities, including fine dining, premium
              beverages, and Wi-Fi access.
            </li>
            <li>
              <strong>Expedited Security & Customs Clearance:</strong> Skip the
              lines and breeze through security and customs with our fast-track
              services, ensuring a stress-free start to your journey.
            </li>
            <li>
              <strong>Confidential and Secure:</strong> Enjoy the utmost privacy
              and security, with discreet handling of all your travel needs,
              from check-in to boarding.
            </li>
            <li>
              <strong>Ground Transportation:</strong> For a smooth transition
              from the terminal to your destination, we offer premium ground
              transportation services, including private cars and chauffeurs.
            </li>
          </ul>
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
          <h3
            class="text-[20px] md:text-[28px] text-justify font-normal leading-[180%] md:mx-0 md:text-start w-full md:w-[590px] md:leading-[204%] text-[#4D4D4D] font-semibold text-center whitespace-nowrap mb-6"
          >
          Seamless Travel, Anywhere in the World
          </h3>
          <p
            data-aos="fade-left"
            data-aos-duration="400"
            class="text-lg md:text-xl text-center font-normal leading-[180%] md:text-start md:mx-0 w-full md:leading-[204%] text-[#4D4D4D] mb-6"
          >
            Seamless Travel, Anywhere in the World Whether you're traveling for
            business, leisure, or an important event, our VIP terminal services
            ensure that your airport experience is as smooth and luxurious as
            your flight. With our expert team at your service, enjoy expedited
            check-in, fast-track security, and personal assistance at every step
            of the way. Book your Private VIP Terminal Service today and elevate
            your travel experience to new heights.
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
import image from "~/assets/images/services/vipterminaldetail.webp";
import Navbar from "~/components/navbar.vue";

const page = "Private VIP Terminal Services";
useHead({
  title:
    "VIP Terminal Access – Exclusive Airport Lounges and Personalized Service",
  meta: [
    {
      name: "description",
      content: `Indulge in the luxury of VIP Terminal access, offering exclusive lounges and expedited services at major airports worldwide. Skip the crowds, enjoy private check-in, and relax in a tranquil, upscale environment before your flight. Our VIP terminal services ensure a refined and hassle-free airport experience, tailored to your needs.`,
    },
  ],
});
useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Private VIP Terminal Services",
        description:
          "Indulge in the luxury of VIP Terminal access, offering exclusive lounges and expedited services at major airports worldwide. Skip the crowds, enjoy private check-in, and relax in a tranquil, upscale environment before your flight. Our VIP terminal services ensure a refined and hassle-free airport experience, tailored to your needs.",
        provider: {
          "@type": "Organization",
          name: "VIP AirAssist",
          url: "https://vipairassist.com",
          logo: "https://vipairassist.com/logo.svg",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+971506964878",
            contactType: "Customer Service",
            areaServed: "Worldwide",
            availableLanguage: ["English"],
          },
          sameAs: ["https://www.facebook.com/vipairassist"],
        },
        serviceType: "Airport Concierge Service",
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
      }),
    },
  ],
});
</script>

<style lang="scss" scoped></style>
