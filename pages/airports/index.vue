<template>
  <div>
    <navbar />
    <AirportsHero />
    
    <Footer />
  </div>
</template>
<script setup>
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();


</script>
