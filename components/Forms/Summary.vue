<template>
  <div class="w-full h-full">
    <div class="grid grid-cols-1 md:grid-cols-3 border border-black">
      <!--Left-->
      <div class="col-span-2 flex flex-col px-6 py-8 space-y-8">
        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500 capitalize">
            Booking service for
          </h2>
          <p class="text-xl leading-7">{{bookingStore.bookingType}}</p>
        </div>
        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500">Airport</h2>
          <p class="text-xl leading-7 capitalize">{{bookingStore.formData.step1.airport.name}} {{bookingStore.formData.step1.airport.code}} </p>
        </div>
        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500">Flight Number</h2>
          <p class="text-xl leading-7 font-heading">{{bookingStore.formData.step1.flight}}</p>
        </div>
        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500">Date</h2>
          <p class="text-xl leading-7 font-heading">{{bookingStore.formData.step1.date}}</p>
        </div>

        <div class="flex flex-col space-y-6 max-w-lg">
          <h2 class="text-xl leading-7 text-gray-500">Services</h2>
          <div class="grid grid-cols-3 md:grid-cols-4 gap-4 " v-for="service,index in bookingStore.formData.step2.services" :key="index">
            <p class="text-xl leading-7 col-span-2" >{{service.name}}</p>
          </div>
          <div class="grid grid-cols-4  gap-1 " v-for="service,index in bookingStore.formData.step2.extras" :key="index">
            <p class="text-xl leading-7 col-span-2" >{{service.name}}</p>
          </div>
        </div>
        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500">Total Price</h2>
          <p class="text-xl leading-7 font-heading">{{(bookingStore.totalPrice + bookingStore.extrasTotal).toFixed(2)}} USD</p>
        </div>
      </div>

      <div class="flex flex-col px-6 py-8 space-y-8 font-heading">
        <div class="border-l border-l-black flex flex-col space-y-6 px-12">
            <h2 class="text-2xl leading-7 text-gray-500 capitalize">
              Passengers
            </h2>
          <div class="grid grid-cols-3 gap-6">  
            <p class="text-lg leading-7 col-span-2">Adults (12+ years)</p>
            <p>{{bookingStore.formData.step1.adults}}</p>
            
          </div>
          <div class="grid grid-cols-3 gap-6 items-center justify-center" v-if="bookingStore.formData.step1.children">  
            <p class="text-lg leading-7 col-span-2">Children (2-11 years)</p>
            <p>{{bookingStore.formData.step1.children}}</p>
            
          </div>
          <div class="grid grid-cols-3 gap-6" v-if="bookingStore.formData.step1.infants">  
            <p class="text-lg leading-7 col-span-2">Infants (0-2 years)</p>
            <p>{{bookingStore.formData.step1.infants}}</p>  
          </div>
          
        </div>
        <FormsPassengerInput />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useBookingStore } from "@/stores/booking";
import axios from "axios";


const bookingStore = useBookingStore();
</script>
