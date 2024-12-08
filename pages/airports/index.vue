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

useHead({
    title: "Find Services at Your Preferred Airports",
    meta: [
      {
        name: "description",
        content: `Discover a curated list of world-class airports designed to elevate your
        travel experience. From luxury lounges to seamless VIP services, each
        airport offers unique amenities tailored to meet the needs of discerning
        travelers. Whether you're arriving, departing, or transiting, our
        selection ensures a smooth and stress-free journey at every step.`
      },
    ],
  });
</script>
