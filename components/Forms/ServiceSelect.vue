<template>
  <div class="w-full">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
      <p class="text-gray-600 text-lg">Calculating prices for your passengers...</p>
      <p class="text-gray-500 text-sm mt-2">
        {{ bookingStore.formData.step1.adults }} Adult{{ bookingStore.formData.step1.adults > 1 ? 's' : '' }}
        <span v-if="bookingStore.formData.step1.children > 0">, {{ bookingStore.formData.step1.children }} Child{{ bookingStore.formData.step1.children > 1 ? 'ren' : '' }}</span>
        <span v-if="bookingStore.formData.step1.infants > 0">, {{ bookingStore.formData.step1.infants }} Infant{{ bookingStore.formData.step1.infants > 1 ? 's' : '' }}</span>
      </p>
    </div>
    
    <!-- Header -->
    <div v-else class="mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
        <i class="bx bx-star mr-3 text-gray-600"></i>
        Choose Your VIP Service
      </h2>
      <p class="text-gray-600 text-lg">Select the service that best fits your needs</p>
    </div>
    
    <!-- Simple Service Cards -->
    <div v-if="!loading" class="space-y-6">
      <div
        v-for="(service, index) in services"
        :key="index"
        class="border-2 p-6 bg-white transition-all duration-300 hover:shadow-lg"
        :class="isServiceSelected(service) 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200 hover:border-gray-300'"
      >
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <!-- Service Info -->
          <div class="flex-1">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ service.name }}</h3>
                <div class="flex items-center space-x-4 text-sm text-gray-600 mb-4">
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
              
              <!-- Selection Indicator -->
              <div v-if="isServiceSelected(service)" class="flex items-center text-green-600">
                <i class="bx bx-check-circle text-2xl mr-2"></i>
                <span class="font-semibold">Selected</span>
              </div>
            </div>
            
            <!-- What's Included -->
            <div class="mb-6">
              <h4 class="font-semibold text-gray-800 mb-3">What's included:</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div 
                  v-for="(line, index) in service.description.split('\n')" 
                  :key="index"
                  class="flex items-center text-sm text-gray-700"
                >
                  <i class="bx bx-check text-green-600 mr-2 flex-shrink-0"></i>
                  <span>{{ line }}</span>
                </div>
              </div>
            </div>
            
            <!-- Add-ons (if any) -->
            <div v-if="service.extras && service.extras.length > 0" class="mb-6">
              <h4 class="font-semibold text-gray-800 mb-3">Available add-ons:</h4>
              <FormsExtraServicesSelect v-model="service.extras" />
            </div>
          </div>
          
          <!-- Pricing & Action -->
          <div class="lg:w-80 lg:flex-shrink-0">
            <div class="bg-gray-50 p-6 text-center">
              <!-- Price Breakdown -->
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span>First passenger:</span>
                  <span class="font-semibold">${{ service.prices[0].first_passenger_price }}</span>
                </div>
                
                <div class="flex justify-between text-sm">
                  <span>Additional passengers:</span>
                  <span class="font-semibold">${{ service.prices[0].adult_price }} each</span>
                </div>
                
                <div v-if="service.prices[0].child_price > 0" class="flex justify-between text-sm">
                  <span>Children (2-11):</span>
                  <span class="font-semibold">${{ service.prices[0].child_price }} each</span>
                </div>
                <div v-else class="flex justify-between text-sm">
                  <span>Children (2-11):</span>
                  <span class="font-semibold text-green-600">Free</span>
                </div>
                
                <div v-if="service.prices[0].infant_price > 0" class="flex justify-between text-sm">
                  <span>Infants (0-2):</span>
                  <span class="font-semibold">${{ service.prices[0].infant_price }} each</span>
                </div>
                <div v-else class="flex justify-between text-sm">
                  <span>Infants (0-2):</span>
                  <span class="font-semibold text-green-600">Free</span>
                </div>
                
                <div class="border-t pt-3 mt-3">
                  <div class="flex justify-between">
                    <span class="font-semibold">Your total:</span>
                    <span class="text-2xl font-bold text-green-600">${{ calculateTotalPrice(service) }}</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">
                    For {{ bookingStore.formData.step1.adults + bookingStore.formData.step1.children + bookingStore.formData.step1.infants }} passengers
                  </p>
                </div>
              </div>
              
              <!-- Action Button -->
              <button
                @click="toggleService(service)"
                class="w-full py-4 px-6 font-semibold text-lg transition-all duration-300"
                :class="isServiceSelected(service) 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-black text-white hover:bg-gray-800'"
              >
                <span v-if="!isServiceSelected(service)" class="flex items-center justify-center">
                  <i class="bx bx-plus mr-2"></i>
                  Select This Service
                </span>
                <span v-else class="flex items-center justify-center">
                  <i class="bx bx-check mr-2"></i>
                  Service Selected
                </span>
              </button>
              
              <!-- Trust badges -->
              <div class="flex items-center justify-center mt-4 space-x-4 text-xs text-gray-500">
                <span class="flex items-center">
                  <i class="bx bx-lock-alt mr-1"></i>
                  Secure
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
    </div>
    
    <!-- No Services Available State -->
    <div v-if="!loading && services.length === 0" class="text-center py-20">
      <div class="mb-4">
        <i class="bx bx-error-circle text-6xl text-gray-400 mb-4"></i>
      </div>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">Unable to Load Services</h3>
      <p class="text-gray-600 mb-6">
        We couldn't load the available services with calculated pricing for your passengers. 
        This usually happens when the booking reference is not available.
      </p>
      <button 
        @click="$emit('retry')" 
        class="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300"
      >
        <i class="bx bx-refresh mr-2"></i>
        Try Again
      </button>
    </div>

    <!-- Terms & Conditions -->
    <div v-if="!loading && terms_and_conditions && services.length > 0" class="mt-8 bg-gray-50 p-6 border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <i class="bx bx-info-circle mr-2 text-gray-600"></i>
        Important Information
      </h3>
      <FormsTermsConditions v-model="terms_and_conditions" />
    </div>
  </div>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";
import axios from "~/api/drf";
import { onMounted, ref, watch } from "vue";

const bookingStore = useBookingStore();
const loading = ref(true);
let terms_and_conditions = ref(null);

async function getServices(airport, type, bookingReference) {
  console.log("Fetching services with calculated prices for booking:", { airport, type, bookingReference });
  
  // Validate that we have all required parameters
  if (!airport || !type || !bookingReference) {
    console.error("Missing required parameters for service API call");
    loading.value = false;
    return;
  }
  
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  
  try {
    const apiUrl = `airports/${airport}/services/${type}/${bookingReference}/`;
    console.log("API URL for passenger-specific pricing:", apiUrl);
    
    
    const response = await axios.get(apiUrl);
    console.log("Services API response with calculated prices:", response.data);
    
    if (response.data.services && Array.isArray(response.data.services)) {
      services.value = response.data.services;
      terms_and_conditions.value = response.data.terms_and_conditions;
      
      console.log(`Successfully loaded ${services.value.length} services with passenger-specific pricing`);
      
      // Log sample pricing to verify calculations
      if (services.value.length > 0) {
        const firstService = services.value[0];
        console.log("Sample service pricing:", {
          serviceName: firstService.name,
          totalPrice: firstService.total_price,
          passengerCounts: {
            adults: bookingStore.formData.step1.adults,
            children: bookingStore.formData.step1.children,
            infants: bookingStore.formData.step1.infants
          }
        });
      }
    } else {
      console.warn("Invalid API response structure:", response.data);
      services.value = [];
    }
    
  } catch (error) {
    console.error("Error fetching services with calculated prices:", error);
    console.error("Error details:", error.response?.data);
    
    // Don't use fallback - we need the booking reference for proper pricing
    console.error("Cannot proceed without booking reference - passenger-specific pricing required");
    services.value = [];
  }
  finally {
    loading.value = false;
  }
}

let services = ref([]);

const calculateExtrasTotal = (mainServiceId) => {
  const relevantExtras = bookingStore.formData.step2.extras.filter(
    (extra) => extra.main === mainServiceId
  );

  const total = relevantExtras.reduce((sum, extra) => {
    const pricePerUnit = parseFloat(extra.prices[0]?.per_unit_price || 0);
    return sum + pricePerUnit * extra.number_of_units;
  }, 0);

  return total;
};

// Function to calculate the total price (main service price + extras price)
const calculateTotalPrice = (service) => {
  const mainPrice = parseFloat(service.total_price || 0);
  const extrasTotal = calculateExtrasTotal(service.id);
  return (mainPrice + extrasTotal).toFixed(2);
};

// Helper function to check if service is selected
const isServiceSelected = (service) => {
  return bookingStore.formData.step2.services.some((item) => item.id === service.id);
};

function toggleService(service) {
  const serviceIndex = bookingStore.formData.step2.services.findIndex(
    (item) => item.id === service.id
  );

  if (serviceIndex === -1) {
    // Add the service if it does not exist
    bookingStore.formData.step2.services.push(service);
  } else {
    // Remove the service if it exists
    bookingStore.formData.step2.services = bookingStore.formData.step2.services.filter(
      (item) => item.id !== service.id
    );
  }
}

onMounted(() => {
  console.log("ServiceSelect mounted, currentStep:", bookingStore.currentStep);
  console.log("Booking reference:", bookingStore.bookingReference);
  
  // Always wait for booking reference - no fallback calls
  if (bookingStore.bookingReference) {
    console.log("Booking reference available, fetching services immediately");
    getServices(
      bookingStore.formData.step1.airport.name,
      bookingStore.bookingType,
      bookingStore.bookingReference
    );
  } else {
    console.log("Waiting for booking reference before fetching services...");
    // Keep loading state true to show loading spinner
    loading.value = true;
  }
});

// Watch for booking reference changes - this is the primary trigger
watch(() => bookingStore.bookingReference, (newRef, oldRef) => {
  console.log("Booking reference changed:", { oldRef, newRef });
  
  if (newRef && bookingStore.currentStep === 2) {
    console.log("Booking reference now available, fetching services with calculated prices");
    loading.value = true;
    getServices(
      bookingStore.formData.step1.airport.name,
      bookingStore.bookingType,
      newRef
    );
  }
});
</script>