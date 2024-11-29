<template>
  <div class="flex flex-col max-w-screen-xl w-full bg-white shadow-xl">
    <ButtonsBookingSteps v-model="bookingStore.currentStep" />
    <div class="flex flex-col w-full bg-white p-4 space-y-6 px-4 md:px-16 md:py-12">
      
    
      <!--step 1-->
      <div v-if="bookingStore.currentStep===1" class="w-full" >
        <p class="text-lg text-gray-400 mb-4">I am booking a service for</p>
        <form @submit.prevent="handleStep1Submit">
          <ButtonsBookingType v-model="bookingStore.bookingType" class="mb-6"/>
        <FormsTransitForm v-if="bookingStore.bookingType === 'Transit'" v-model="bookingStore.data"/>
        <FormsArrivalDepartureForm v-else v-model="bookingStore.data"/>
        </form>
        
      </div>

      <!--Step 2 -->
      <div v-if="bookingStore.currentStep===2" class="w-full">
        <FormsServiceSelect />
      </div>
      <div v-if="bookingStore.currentStep===3" class="w-full">
        <FormsSummary />
      </div>
      <div class="flex items-center justify-center py-6" v-if="bookingStore.currentStep==1">
        <button
          @click="handleStep1Submit()"
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
      <div class="flex items-center justify-between py-6" v-if="bookingStore.currentStep>1">
        <button
          @click="bookingStore.prevStep"
          class="relative px-12 py-6 text-black  text-2xl leading-[108%] group overflow-hidden"
        >
          <span
            class="absolute inset-0 w-0 bg-black/70 transition-all duration-500 ease-in-out group-hover:w-full"
          ></span>
          <div
            class="flex items-center justify-center space-x-4 relative z-10 transition-colors duration-500 group-hover:text-white"
          > 
          <i class="bx bx-left-arrow-alt"></i>
            <p>Previous</p>
            
          </div>
        </button>
        <button
          @click="bookingStore.nextStep"
          class="relative px-12 py-6 text-black border border-black text-2xl leading-[108%] group overflow-hidden"
        >
          <span
            class="absolute inset-0 w-0 bg-black/70 transition-all duration-500 ease-in-out group-hover:w-full"
          ></span>
          <div
            class="flex items-center justify-center space-x-4 relative z-10 transition-colors duration-500 group-hover:text-white"
          >
            <p>Next</p>
            <i class="bx bx-right-arrow-alt"></i>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookingStore } from '@/stores/booking';

const bookingStore = useBookingStore();

const handleStep1Submit = async () => {
  const isValid = bookingStore.validateStep(1);
  if (!isValid) {
    console.log("Validation failed for Step 1");
    return;
  }

  await bookingStore.submitStep1();
  bookingStore.nextStep();
};
</script>
