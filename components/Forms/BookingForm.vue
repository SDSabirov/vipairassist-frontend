<template>
  <div class="flex flex-col max-w-screen-xl w-full bg-white shadow-xl">
    <ButtonsBookingSteps v-model="currentStep" />
    <div class="flex flex-col w-full bg-white p-4 space-y-6 px-4 md:px-16">
      <p class="text-lg text-gray-400">I am booking a service for</p>
      <ButtonsBookingType v-model="bookingType" />

      <FormsTransitForm v-if="bookingType === 'Transit'" />
      <FormsArrivalDepartureForm v-else />
      <div class="flex items-center justify-center py-6">
        <button
          class="relative px-12 py-6 text-black border border-black text-2xl leading-[108%] group overflow-hidden"
        >
          <span
            class="absolute inset-0 w-0 bg-black/70 transition-all duration-500 ease-in-out group-hover:w-full"
          ></span>
          <div
            class="flex items-center justify-center space-x-4 relative z-10 transition-colors duration-500 group-hover:text-white"
          >
            <p>Confirm & Proceed</p>
            <i class="bx bx-right-arrow-alt"></i>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const currentStep = ref(1);
const bookingType = ref("Arrival");
</script>
