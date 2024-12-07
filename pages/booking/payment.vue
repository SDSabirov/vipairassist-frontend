<template>
  <div>
    <navbar />
    <BookingBackground />
    <section class="flex flex-col w-full items-center justify-center py-28">

        <div class="flex items-center justify-center  cursor-pointer w-full max-w-screen-xl w-full bg-gray-200">
          <h3 class="flex text-lg bg-white h-full px-28 py-4">Payment</h3>
        </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-xl w-full items-center bg-white shadow-xl py-10 px-6 pr-12"
      >
        
        <div class="w-full h-[400px]">
          <h1 class="text-3xl mb-6">Order Summary</h1>
          <div class="grid grid-cols-2 w-full mb-4 border-b border-b-black/10" v-for="service,index in bookingStore.formData.step2.services" :key="index">
            <h3 class="text-xl">{{service.name}}</h3>
            <p class="text-xl font-heading">{{service.total_price}} USD</p>
          </div>
          <div class="grid grid-cols-2 w-full mb-4 border-b border-b-black/10" v-for="service,index in bookingStore.formData.step2.extras" :key="index">
            <h3 class="text-xl">{{service.name}}</h3>
            <p class="text-xl font-heading">{{(service.number_of_units*service.prices[0].per_unit_price).toFixed(2)}} USD</p>
          </div>
         
          <div class="flex flex-col items-center justify-start w-full">
            <div class="grid grid-cols-2 items-center gap-6" >
              <p class="text-xl font-semibold">Total</p>
              <p class="text-xl font-heading font-semibold">{{bookingStore.bookingConfirmed.totalPrice.toFixed(2)}} USD</p>
            </div>
          </div>
        </div>
        <div class="py-10 border-l border-l-black/10 px-6">
          <PaymentPaypalButton />
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();
const totalPrice = bookingStore.bookingConfirmed.totalPrice
definePageMeta({
  middleware: "auth-booking",
});
</script>
<style scoped>
nav {
  background: black !important;
}
</style>
