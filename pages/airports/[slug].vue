<template>
  <div>
    <navbar />
    <div v-if="loading" class="flex w-screen h-screen bg-black">
      <LoadingAnimationWhite />
    </div>
    <div v-else>
      <AirportsHero :name="name" :src="background" />
      <div class="relative w-full flex flex-col items-center bg-gray-50">
        <img
          src="/assets/images/backgrounds/airportPatternTop.png"
          alt="pattern"
          class="absolute top-0 left-0 opacity-30"
        />
        <img
          src="/assets/images/backgrounds/airportPatternTop.png"
          alt="pattern"
          class="absolute bottom-0 left-0 opacity-30"
        />
        
        <!-- Breadcrumb Navigation -->
        <div class="w-full max-w-screen-xl px-4 md:px-6 pt-6 z-10">
          <nav class="flex items-center space-x-2 text-sm md:text-base text-gray-600 mb-4">
            <NuxtLink to="/" class="hover:text-blue-600 transition-colors">Home</NuxtLink>
            <i class="bx bx-chevron-right text-gray-400"></i>
            <NuxtLink to="/airports" class="hover:text-blue-600 transition-colors">Airports</NuxtLink>
            <i class="bx bx-chevron-right text-gray-400"></i>
            <span class="text-gray-800 font-medium">{{ name }}</span>
          </nav>
        </div>

        <div
          class="flex flex-col max-w-screen-xl items-center justify-center py-8 md:py-14 space-y-8 md:space-y-12 w-full z-10 px-4 md:px-6"
        >
          <div class="flex flex-col justify-center max-w-4xl">
            <p class="text-base md:text-lg text-center leading-relaxed">
              <!-- Show either truncated or full description based on state -->
              {{ showFullContent ? description : truncatedDescription }}
              <span v-if="!showFullContent" class="font-bold">...</span>
            </p>

            <button
              @click="toggleContent"
              class="mt-4 text-blue-500 hover:underline text-base md:text-lg focus:outline-none self-center"
            >
              {{ showFullContent ? "Show Less" : "Read More" }}
            </button>
          </div>
          <h2 class="text-black text-2xl md:text-3xl lg:text-4xl font-semibold text-center">
            What We Offer
          </h2>

          <ButtonsBookingType v-model="bookingStore.bookingType" class="mb-6" />
          <ButtonsServiceNav
            :modelValue="selectedServices"
            :selectedService="selectedService"
            @update:selectedService="handleServiceChange"
          />
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 w-full">
            <!-- Enhanced Service Title & Extras -->
            <div class="flex flex-col space-y-6 items-center lg:col-span-1">
              <!-- Service Title Card -->
              <div class="relative bg-black p-6 md:p-8 text-white w-full shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="absolute top-4 right-4">
                  <span class="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-wide">Popular</span>
                </div>
                <h3 class="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">{{ selectedService.name }}</h3>
                <p class="text-gray-300 mt-2 text-sm">Premium airport service</p>
              </div>
              
              <!-- Extras Card -->
              <div class="bg-white p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 w-full border border-gray-100">
                <div class="flex items-center mb-6">
                  <div class="w-8 h-8 bg-black flex items-center justify-center mr-3">
                    <i class="bx bx-plus text-white font-bold"></i>
                  </div>
                  <h3 class="text-xl md:text-2xl font-bold text-gray-800">Add-On Services</h3>
                </div>
                <ul class="space-y-4">
                  <li
                    v-for="(extra, index) in selectedService.extra_services"
                    :key="index"
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div class="flex items-center mb-2 sm:mb-0">
                      <i class="bx bx-check-circle text-black mr-2"></i>
                      <span class="font-semibold text-gray-800">{{ extra.name }}</span>
                    </div>
                    <span class="bg-green-100 text-green-800 px-3 py-1 font-bold text-sm">
                      ${{ extra.prices[0].per_unit_price }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Enhanced Main Service Description -->
            <div class="bg-white lg:col-span-3 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <!-- Service Header -->
              <div class="bg-gray-50 p-6 md:p-8 border-b border-gray-200">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      {{ bookingStore.bookingType }} Service
                    </h3>
                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                      <span class="flex items-center">
                        <i class="bx bx-time-five mr-1"></i>
                        Instant confirmation
                      </span>
                      <span class="flex items-center">
                        <i class="bx bx-shield-check mr-1"></i>
                        24/7 support
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Service Features -->
              <div class="p-6 md:p-8">
                <h4 class="text-xl font-bold text-gray-800 mb-6">What's Included:</h4>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <li
                    v-for="(line, index) in selectedService.description.split('\n')"
                    :key="index"
                    class="flex items-start"
                  >
                    <div class="w-6 h-6 bg-gray-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <i class="bx bx-check text-black text-sm"></i>
                    </div>
                    <span class="text-gray-700 leading-relaxed">{{ line }}</span>
                  </li>
                </ul>
              </div>
              
              <!-- Enhanced Pricing Section -->
              <div class="bg-gray-50 p-6 md:p-8 border-t border-gray-200">
                <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between space-y-6 lg:space-y-0">
                  <!-- Pricing Cards -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                    <div class="bg-white p-4 shadow-lg border-l-4 border-black">
                      <div class="text-sm text-gray-600 mb-1">First Passenger</div>
                      <div class="text-2xl md:text-3xl font-bold text-green-600">
                        ${{ selectedService.prices[0].first_passenger_price }}
                      </div>
                      <div class="text-xs text-gray-500">Starting price</div>
                    </div>
                    
                    <div class="bg-white p-4 shadow-lg border-l-4 border-black">
                      <div class="text-sm text-gray-600 mb-1">Additional Passenger</div>
                      <div class="text-2xl md:text-3xl font-bold text-green-600">
                        ${{ selectedService.prices[0].adult_price }}
                      </div>
                      <div class="text-xs text-gray-500">Per person</div>
                    </div>
                  </div>
                  
                  <!-- Enhanced CTA -->
                  <div class="lg:ml-8">
                    <NuxtLink to="/booking">
                      <button class="group relative bg-black text-white px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full lg:w-auto hover:bg-gray-800">
                        <span class="flex items-center justify-center space-x-2">
                          <span>Book Now</span>
                          <i class="bx bx-right-arrow-alt group-hover:translate-x-1 transition-transform duration-300"></i>
                        </span>
                      </button>
                    </NuxtLink>
                    
                    <!-- Trust Signals -->
                    <div class="flex items-center justify-center lg:justify-start mt-3 space-x-4 text-xs text-gray-600">
                      <span class="flex items-center">
                        <i class="bx bx-lock-alt mr-1"></i>
                        Secure booking
                      </span>
                      <span class="flex items-center">
                        <i class="bx bx-credit-card mr-1"></i>
                        No hidden fees
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Enhanced Terms & Conditions -->
            <div class="bg-white lg:col-start-2 lg:col-end-5 shadow-xl border border-gray-100">
              <div class="bg-gray-50 p-6 md:p-8 border-b border-gray-200">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-black flex items-center justify-center mr-3">
                    <i class="bx bx-info-circle text-white"></i>
                  </div>
                  <h3 class="text-2xl md:text-3xl font-bold text-gray-800">Terms & Conditions</h3>
                </div>
                <p class="text-gray-600 mt-2">Important information about your booking</p>
              </div>
              
              <div class="p-6 md:p-8">
                <ul class="space-y-4">
                  <li
                    v-for="(line, index) in airportData.terms_and_conditions.split('\n')"
                    :key="index"
                    class="flex items-start"
                  >
                    <div class="w-6 h-6 bg-gray-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <i class="bx bx-info-circle text-black text-sm"></i>
                    </div>
                    <span class="text-gray-700 leading-relaxed">{{ line }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Mobile CTA -->
    <div class="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-2xl">
      <div class="px-4 py-3">
        <div class="flex items-center justify-between mb-2">
          <div>
            <div class="text-sm text-gray-600">Starting from</div>
            <div class="text-2xl font-bold text-green-600">
              ${{ selectedService?.prices?.[0]?.first_passenger_price || 'N/A' }}
            </div>
          </div>
        </div>
        <NuxtLink to="/booking">
          <button class="w-full bg-black text-white py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-800">
            <span class="flex items-center justify-center space-x-2">
              <span>Book Now</span>
              <i class="bx bx-right-arrow-alt"></i>
            </span>
          </button>
        </NuxtLink>
      </div>
    </div>

    <Footer />
  </div>
</template>
<script setup>
import { useBookingStore } from "@/stores/booking";
import { useRoute } from "vue-router";
import axios from "~/api/drf";
import { watch, ref, onMounted, computed } from "vue";


const bookingStore = useBookingStore();
const route = useRoute();
const slug    = computed(() => route.params.airport || route.params.slug)

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
  loading.value = true
  try {
    const { data } = await axios.get(
      `/top-airports/${encodeURIComponent(slug.value)}/`
    )
    // Detail endpoint returns an object, not an array
    airportData.value      = data
    selectedServices.value = data.arrival_services  || []
    selectedService.value  = selectedServices.value[0] || null

    // Update meta-tags now that airportData is set
    updateMetaTags()
  } catch (error) {
    console.error("Error fetching airport data:", error)
  } finally {
    loading.value = false
  }
}

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
const jsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": `Meet & Greet Service at ${airportData.name}`,
  "description": airportData.about_field,
  "provider": {
    "@type": "Organization",
    "name": "VIP AirAssist",
    "url": "https://vipairassist.com"
  },
  "areaServed": {
    "@type": "Place",
    "name": airportData.name,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": airportData.city,
      "addressCountry": airportData.country
    }
  }
}))
// Fetch data and set meta tags on component mount
onMounted(() => {
  console.log(slug.value)
  fetchAirportData();
  useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(jsonLd.value)
    }
  ]
})
});
</script>

