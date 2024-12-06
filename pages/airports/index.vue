<template>
  <div>
    <navbar />
    <AirportsListHero />
    <AirportsAllAirports />
    <AirportsTopAirports />
    <Footer />
  </div>
</template>
<script setup>
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();


</script>
