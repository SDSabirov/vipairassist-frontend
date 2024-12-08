<template>
  <div>
    <navbar />
    <div v-if="loading" class="flex w-screen h-screen bg-black">
      <LoadingAnimationWhite />
    </div>
    <div v-else>
      <AirportsHero :name="name" :src="background" />
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
          <ButtonsServiceNav
            :modelValue="selectedServices"
            :selectedService="selectedService"
            @update:selectedService="handleServiceChange"
          />
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="flex flex-col space-y-6 items-center">
              <div class="flex p-4 bg-white row-1 border border-black w-full">
                <h3 class="text-3xl">{{ selectedService.name }}</h3>
              </div>
              <div
                class="flex flex-col p-4 bg-white items-center border border-black w-full space-y-6"
              >
                <h3 class="text-2xl font-semibold w-full text-left">Extras</h3>
                <ul
                  class="flex flex-col list-image-[url(/assets/images/icons/check.png)] px-2 space-y-4"
                >
                  <li
                    v-for="(extra, index) in selectedService.extra_services"
                    :key="index"
                    class="text-lg grid grid-cols-2 gap-2 items-center"
                  >
                    <span class="font-semibold ml-2">{{ extra.name }} </span>
                    <span>Price {{ extra.prices[0].per_unit_price }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="flex flex-col py-6 bg-white col-span-3 items-center justify-center border border-black"
            >
              <h3 class="text-3xl font-semibold">
                {{ bookingStore.bookingType }}
              </h3>
              <div class="flex w-full px-4 py-6">
                <ul
                  class="flex flex-col list-image-[url(/assets/images/icons/check.png)] px-6 space-y-4"
                >
                  <li
                    v-for="(line, index) in selectedService.description.split(
                      '\n'
                    )"
                    :key="index"
                    class="text-xl leading-10"
                  >
                    {{ line }}
                  </li>
                </ul>
              </div>
              <div class="flex items-center justify-between w-full px-4">
                <div class="flex flex-col space-y-4">
                  <p class="text-xl font-semibold">
                    First Passenger Price -
                    {{ selectedService.prices[0].first_passenger_price }}
                  </p>
                  <p class="text-xl font-semibold">
                    Each subsequent passenger -
                    {{ selectedService.prices[0].adult_price }}
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
                  <li
                    v-for="(
                      line, index
                    ) in airportData.terms_and_conditions.split('\n')"
                    :key="index"
                    class="text-xl leading-10"
                  >
                    {{ line }}
                  </li>
                </ul>
              </div>
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
import { useRoute } from "vue-router";
import axios from "axios";
import { watch, ref, onMounted, computed } from "vue";


const bookingStore = useBookingStore();
const route = useRoute();
const slug = ref(route.params.slug);

let airportData = ref(null);
const loading = ref(true);
const selectedService = ref(null);
const selectedServices = ref([]);
const showFullContent = ref(false);

const description = computed(() => airportData.value?.about_field || "");
const name = computed(() => airportData.value?.name || "");
const background = computed(() => airportData.value?.cover_image_url || "");
const truncatedDescription = computed(() =>
  description.value.length > 160 ? description.value.slice(0, 160) : description.value
);

// Toggle between full and truncated description
const toggleContent = () => {
  showFullContent.value = !showFullContent.value;
};

// Fetch airport data
const fetchAirportData = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/top-airports/${slug.value}/`
    );
    if (response.data && response.data[0]) {
      airportData.value = response.data[0];
      selectedServices.value = airportData.value.arrival_services || [];
      selectedService.value = selectedServices.value[0] || null;

      // Set initial meta tags
      updateMetaTags();
    }
  } catch (error) {
    console.error("Error fetching airport data:", error);
  } finally {
    loading.value = false;
  }
};

// Update meta tags dynamically
const updateMetaTags = () => {
  useHead({
    title: name.value,
    meta: [
      {
        name: "description",
        content: description.value.slice(0, 170),
      },
    ],
  });
};

// Update services based on booking type
const changeServices = () => {
  if (!airportData.value) return;

  if (bookingStore.bookingType === "Arrival") {
    selectedServices.value = airportData.value.arrival_services || [];
  } else if (bookingStore.bookingType === "Departure") {
    selectedServices.value = airportData.value.departure_services || [];
  } else {
    selectedServices.value = airportData.value.transit_services || [];
  }

  selectedService.value =
    selectedServices.value.length > 0 ? { ...selectedServices.value[0] } : null;
};

// Watch booking type for changes
watch(
  () => bookingStore.bookingType,
  () => {
    changeServices();
  }
);

// Handle selected service change
const handleServiceChange = (service) => {
  selectedService.value = service;
};

// Fetch data and set meta tags on component mount
onMounted(() => {
  fetchAirportData();
});
</script>

