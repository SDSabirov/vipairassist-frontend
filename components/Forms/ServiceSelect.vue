<script setup lang="ts"></script>

<template>
  <div class="w-full h-full mx-auto">
    <div v-for="service,index in services" :key="index" class="grid grid-cols-1 md:grid-cols-3 border border-black">
      <!--Description i.e left side-->
      <div class="col-span-2 flex flex-col px-6 py-8">
        <h2 class="text-2xl leading-7">{{service.name}}</h2>
        <ul class="mt-5 list-disc px-[12px] space-y-4">
          <li v-for="line,index in service.description.split('\n')" :key="index" class="text-lg leading-6 text-[#858383]">
            {{line}}
          </li>
        </ul>
        <FormsExtraServicesSelect />
        <FormsTermsConditions />
      </div>

      <!--Right Side-->
      <div class="flex flex-col px-6 py-8">
        <h2 class="text-2xl leading-7">Prices</h2>
        <div class="flex flex-col">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            Adults (12+ years)
          </h3>
          <ul class="list-disc px-8">
            <li>{{ service.prices[0].first_passenger_price }}</li>
          </ul>
        </div>
        <div class="flex flex-col">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            Each subsequent passenger
          </h3>
          <ul class="list-disc px-8">
            <li>{{ service.prices[0].adult_price }}</li>
          </ul>
        </div>
        <div class="flex flex-col">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            Children (2-11 years)
          </h3>
          <ul class="list-disc px-8">
            <li v-if="service.prices[0].child_price>0">{{ service.prices[0].child_price }}</li>
            <li v-else>Free</li>
          </ul>
        </div>
        <div class="flex flex-col border-b-2 border-b-black pb-4">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            Infants (0-2 years)
          </h3>
          <ul class="list-disc px-8">
            <li v-if="service.prices[0].infant_price>0">{{ service.prices[0].child_price }}</li>
            <li v-else>Free</li>
          </ul>
        </div>
        <h2 class="text-2xl leading-7 pt-4">Price {{ service.total_price }} USD</h2>
        <!--Total Price-->
        <div class="flex flex-col">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            You have selected
          </h3>

          <div class="grid grid-cols-2 gap-2 mt-2">
            <p class="text-md leading-6 text-gray-700">Adults(12+ years)</p>
            <p>{{bookingStore.formData.step1.adults}}</p>
            <p v-if="bookingStore.formData.step1.children>0" class="text-md leading-6 text-gray-700">Children(2-11 years)</p>
            <p  v-if="bookingStore.formData.step1.children>0">{{bookingStore.formData.step1.children}}</p>
            <p  v-if="bookingStore.formData.step1.infants>0" class="text-md leading-6 text-gray-700">Infants (0-2 years)</p>
            <p v-if="bookingStore.formData.step1.infants>0">{{bookingStore.formData.step1.infants}}</p>
            <p class="text-md leading-6 text-gray-700">Total passengers</p>
            <p>{{bookingStore.formData.step1.adults + bookingStore.formData.step1.children + bookingStore.formData.step1.infants}}</p>
          </div>
        </div>
        <!--Extras-->
        <div class="flex flex-col">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            Extra Services added
          </h3>

          <div class="grid grid-cols-3 gap-2 mt-2">
            <p class="text-md leading-6 text-gray-700">Chauffer</p>
            <p>1</p>
            <p>20 USD</p>
            <p class="text-md leading-6 text-gray-700">Porter</p>
            <p>1</p>
            <p>20 USD</p>
          </div>
        </div>
        <!--Select Button-->
        <div class="flex w-full mt-6">
          <button
            class="relative flex flex-col items-center justify-center py-3 text-black border border-black text-2xl leading-[108%] group overflow-hidden w-full"
          >
            <span
              class="absolute inset-0 w-0 bg-black/70 transition-all duration-500 ease-in-out group-hover:w-full"
            ></span>
            <div
              class="flex items-center justify-center space-x-4 relative z-10 transition-colors duration-500 group-hover:text-white"
            >
              <p>Select</p>
              <i class="bx bx-right-arrow-alt"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";
import axios from "axios";
import { onMounted, ref } from "vue";

const bookingStore = useBookingStore();
let services = ref([]);
let terms_and_conditions = ref(null);
async function getServices(airport, type, bookingReference) {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/airports/" +
        airport +
        "/services/" +
        type +
        "/" +
        bookingReference +
        "/"
    );
    services.value = response.data.services;
    // extras.value = response.data.extra_services;
    // specials.value = response.data.extra_services_special;
    // exlusives.value = response.data.extra_services_exclusive;
    terms_and_conditions = response.data.terms_and_conditions;
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  console.log(services);
  getServices(
    bookingStore.formData.step1.airport.name,
    bookingStore.bookingType,
    bookingStore.bookingReference
  );
});
</script>
