<template>
  <div>
    <navbar />
    <AirportsHero />
    <div class="relative w-full flex flex-col items-center bg-white">
      <img
        src="/assets/images/backgrounds/airportPatternTop.png"
        alt="pattern"
        class="absolute top-0 left-0"
      />
      <img
        src="/assets/images/backgrounds/airportPatternTop.png"
        alt="pattern"
        class="absolute bottom-0 left-0"
      />
      <div
        class="flex flex-col max-w-screen-xl items-center justify-center py-14 space-y-6 w-full z-10"
      >
        <div class="flex flex-col justify-center">
          <p class="text-lg text-center">
            <!-- Show either truncated or full description based on state -->
            {{ showFullContent ? description : truncatedDescription }}
            <span v-if="!showFullContent" class="font-bold">...</span>
          </p>

          <button
            @click="toggleContent"
            class="mt-2 text-blue-500 hover:underline text-lg focus:outline-none"
          >
            {{ showFullContent ? "Show Less" : "Read More" }}
          </button>
        </div>
        <h2 class="text-black text-2xl md:text-4xl font-semibold">
          What We Offer
        </h2>

        <ButtonsBookingType v-model="bookingStore.bookingType" class="mb-6" />
        <ButtonsServiceNav v-model="bookingStore.bookingType" />
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="flex flex-col space-y-6 items-center">
            <div class="flex p-4 bg-white row-1 border border-black w-full">
              <h3 class="text-3xl font-semibold">Meet & Greet Fastrack</h3>
            </div>
            <div
              class="flex flex-col p-4 bg-white items-center border border-black w-full space-y-6"
            >
              <h3 class="text-3xl font-semibold w-full text-left">Extras</h3>
              <ul
                class="flex flex-col list-image-[url(/assets/images/icons/check.png)] px-6 space-y-4"
              >
                <li class="text-xl">
                  Porter services Price - 60.00 USD Up to 4 bags
                </li>
                <li class="text-xl">
                  Porter services Price - 60.00 USD Up to 4 bags
                </li>
              </ul>
            </div>
          </div>
          <div
            class="flex flex-col py-6 bg-white col-span-3 items-center justify-center border border-black"
          >
            <h3 class="text-3xl font-semibold">Arrival</h3>
            <div class="flex w-full px-4 py-6">
              <ul
                class="flex flex-col list-image-[url(/assets/images/icons/check.png)] px-6 space-y-4"
              >
                <li class="text-xl leading-10">
                  Personalized Meet and Greet: Our agent will monitor the status
                  of your flight and will be waiting for you with a sign board
                  at the end of the airbridge, at immigration or at the entrance
                  of the terminal (depending on aircraft parking position),
                  before passport control and customs.
                </li>
                <li class="text-xl leading-10">
                  Personalized Meet and Greet: Our agent will monitor the status
                  of your flight and will be waiting for you with a sign board
                  at the end of the airbridge, at immigration or at the entrance
                  of the terminal (depending on aircraft parking position),
                  before passport control and customs.
                </li>
                <li class="text-xl leading-10">
                  Personalized Meet and Greet: Our agent will monitor the status
                  of your flight and will be waiting for you with a sign board
                  at the end of the airbridge, at immigration or at the entrance
                  of the terminal (depending on aircraft parking position),
                  before passport control and customs.
                </li>
                <li class="text-xl leading-10">
                  Personalized Meet and Greet: Our agent will monitor the status
                  of your flight and will be waiting for you with a sign board
                  at the end of the airbridge, at immigration or at the entrance
                  of the terminal (depending on aircraft parking position),
                  before passport control and customs.
                </li>
                <li class="text-xl leading-10">
                  Personalized Meet and Greet: Our agent will monitor the status
                  of your flight and will be waiting for you with a sign board
                  at the end of the airbridge, at immigration or at the entrance
                  of the terminal (depending on aircraft parking position),
                  before passport control and customs.
                </li>
              </ul>
            </div>
            <div class="flex items-center justify-between w-full px-4">
              <div class="flex flex-col space-y-4">
                <p class="text-xl font-semibold">
                  First Passenger Price - 1150 USD
                </p>
                <p class="text-xl font-semibold">
                  First Passenger Price - 1150 USD
                </p>
              </div>
              <div class="flex">
                <NuxtLink to="/booking">
                  <button
                    class="relative px-6 py-3 text-black text-black text-2xl leading-[182%] border border-black group overflow-hidden"
                  >
                    <span
                      class="absolute inset-0 w-0 bg-black transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                    <div
                      class="flex items-center justify-center space-x-2 relative z-10 transition-colors duration-500 group-hover:text-white"
                    >
                      <p>Book Now</p>
                      <i class="bx bx-right-arrow-alt"></i>
                    </div>
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col py-6 bg-white col-start-2 col-end-5 items-center justify-center border border-black"
          >
            <h3 class="text-3xl font-semibold">Terms & Condition</h3>
            <div class="flex w-full px-4 py-6">
              <ul
                class="flex flex-col list-image-[url(/assets/images/icons/check.png)] px-6 space-y-4"
              >
                <li class="text-xl leading-10">
                  Personalized Meet and Greet: Our agent will monitor the status
                  of your flight and will be waiting for you with a sign board
                  at the end of the airbridge, at immigration or at the entrance
                  of the terminal (depending on aircraft parking position),
                  before passport control and customs.
                </li>
                <li class="text-xl leading-10">
                  Personalized Meet and Greet: Our agent will monitor the status
                  of your flight and will be waiting for you with a sign board
                  at the end of the airbridge, at immigration or at the entrance
                  of the terminal (depending on aircraft parking position),
                  before passport control and customs.
                </li>
                <li class="text-xl leading-10">
                  Personalized Meet and Greet: Our agent will monitor the status
                  of your flight and will be waiting for you with a sign board
                  at the end of the airbridge, at immigration or at the entrance
                  of the terminal (depending on aircraft parking position),
                  before passport control and customs.
                </li>
                <li class="text-xl leading-10">
                  Personalized Meet and Greet: Our agent will monitor the status
                  of your flight and will be waiting for you with a sign board
                  at the end of the airbridge, at immigration or at the entrance
                  of the terminal (depending on aircraft parking position),
                  before passport control and customs.
                </li>
                <li class="text-xl leading-10">
                  Personalized Meet and Greet: Our agent will monitor the status
                  of your flight and will be waiting for you with a sign board
                  at the end of the airbridge, at immigration or at the entrance
                  of the terminal (depending on aircraft parking position),
                  before passport control and customs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { useBookingStore } from "@/stores/booking";
const bookingStore = useBookingStore();
const description = `Geneva – A Global City of Diplomacy, Luxury, and Natural Beauty
          Welcome to Geneva, a city renowned for its international diplomacy,
          stunning lakeside setting, and luxurious lifestyle. Nestled on the
          shores of Lake Geneva with the Alps as a breathtaking backdrop, the
          city offers a unique blend of cultural sophistication and natural
          beauty. From the iconic Jet d’Eau fountain to the charming Old Town
          and prestigious international organizations, Geneva is a city that
          combines global significance with Swiss charm. Geneva Airport (GVA) is
          your gateway to this cosmopolitan city, connecting travelers from
          around the world to the heart of Europe. Our VIP and Meet and Greet
          services at Geneva Airport provide a seamless, luxurious travel
          experience, ensuring comfort and ease as you navigate one of
          Switzerland’s busiest airports. With our Fast Track services, you can
          skip the lines and enjoy a smooth transition from the airport to
          Geneva’s sophisticated ambiance. Travel with comfort and efficiency
          through Geneva Airport with our premium services, crafted to meet the
          needs of discerning travelers. Let us make your arrival in Geneva as
          refined and welcoming as the city itself.`;

// State to toggle between full and truncated content
const showFullContent = ref(false);

// Truncated version of the description
const truncatedDescription = computed(() =>
  description.length > 150 ? description.slice(0, 150) : description
);

// Toggle the content view
const toggleContent = () => {
  showFullContent.value = !showFullContent.value;
};
</script>
