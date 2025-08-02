<template>
  <div class="flex flex-col w-full bg-white shadow-xl">
    <ButtonsBookingSteps v-model="bookingStore.currentStep" />
    <div class="flex flex-col w-full bg-white p-6 md:p-12 space-y-6">
      
    
      <!--step 1-->
      <div v-if="bookingStore.currentStep===1" class="w-full" >
        <!-- Enhanced Header -->
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Tell us about your journey</h2>
          <p class="text-gray-600 text-lg">We'll help you find the perfect VIP service for your travel needs</p>
        </div>
        
        <!-- Service Type Selection -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-1 flex items-center">
            <i class="bx bx-list-check mr-2 text-gray-600"></i>
            What type of service do you need?
          </h3>
          <p class="text-sm text-gray-500 mb-6">Choose the type of VIP service that matches your travel plans</p>
          <ButtonsBookingType v-model="bookingStore.bookingType" class="mb-6"/>
        </div>
        
        <form @submit.prevent="handleStep1Submit" class="w-full max-w-none">
          <FormsTransitForm v-if="bookingStore.bookingType === 'Transit'" v-model="bookingStore.data"/>
          <FormsArrivalDepartureForm v-else v-model="bookingStore.data"/>
        </form>
      </div>

      <!--Step 2 -->
      <div v-if="bookingStore.currentStep === 2" class="w-full">
        <FormsServiceSelect />
      </div>
      <div v-if="bookingStore.currentStep === 3" class="w-full">
        <FormsSummary />
      </div>
      <!-- Enhanced Step 1 Footer -->
      <div v-if="bookingStore.currentStep === 1" class="flex items-center justify-center py-6">
          <button
            @click="handleStep1Submit()"
            :disabled="bookingStore.loading"
            class="relative px-6 md:px-12 py-6 text-black border border-black text-2xl leading-[108%] group overflow-hidden"
          >
            <span
              class="absolute inset-0 w-0 bg-black/70 transition-all duration-500 ease-in-out group-hover:w-full"
            ></span>
            <div
              class="flex items-center justify-center space-x-4 relative z-10 transition-colors duration-500 group-hover:text-white"
            >
              <p v-if="!bookingStore.loading">Confirm & Proceed</p>
              <p v-else>Processing...</p>
              <i v-if="!bookingStore.loading" class="bx bx-right-arrow-alt"></i>
              <i v-else class="bx bx-loader-alt animate-spin"></i>
            </div>
          </button>
      </div>
      <!-- Enhanced Navigation for Steps 2+ -->
      <div v-if="bookingStore.currentStep > 1" class="mt-8 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <!-- Progress Info -->
          <div class="text-sm text-gray-600">
            <span class="font-medium">Step {{ bookingStore.currentStep }} of 3:</span> 
            <span v-if="bookingStore.currentStep === 2">Select Services</span>
            <span v-if="bookingStore.currentStep === 3">Review & Confirm</span>
          </div>
          
          <!-- Navigation Buttons -->
          <div class="flex items-center space-x-4">
            <button
              @click="bookingStore.prevStep"
              class="px-6 py-3 text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all duration-300 font-medium"
            >
              <span class="flex items-center space-x-2">
                <i class="bx bx-left-arrow-alt"></i>
                <span>Back</span>
              </span>
            </button>
            <button
              @click="handleSubmit()"
              :disabled="bookingStore.loading"
              class="px-8 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
            >
              <span v-if="!bookingStore.loading" class="flex items-center space-x-2">
                <span v-if="bookingStore.currentStep === 2">Continue</span>
                <span v-if="bookingStore.currentStep === 3">Review Complete</span>
                <i class="bx bx-right-arrow-alt"></i>
              </span>
              <span v-else class="flex items-center justify-center space-x-2">
                <i class="bx bx-loader-alt animate-spin"></i>
                <span>Processing...</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <FormsPaymentModal :isOpen="showPaymentModal" @close="showPaymentModal = false" />
  </div>
</template>

<script setup>
import { useBookingStore } from '@/stores/booking';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const bookingStore = useBookingStore();

// Payment modal state
const showPaymentModal = ref(false);

const handleStep1Submit = async () => {
  try {
    const isValid = bookingStore.validateStep(1);
    if (!isValid) {
      console.error("Validation failed for Step 1:", bookingStore.errors);
      return;
    }

    console.log("Starting Step 1 submission...");
    await bookingStore.submitStep1();
    
    // Verify booking reference was created
    if (bookingStore.bookingReference) {
      console.log("Step 1 submitted successfully, booking reference:", bookingStore.bookingReference);
      bookingStore.nextStep();
    } else {
      console.error("Step 1 submission failed - no booking reference created");
      alert("Failed to create booking. Please try again.");
    }
    
  } catch (error) {
    console.error("Error during Step 1 submission:", error);
    
    // Show the error message from the store (which has better error categorization)
    const errorMessage = bookingStore.error || "Failed to submit booking. Please try again.";
    alert(errorMessage);
  }
};
const handleSubmit = async () => {
  if(bookingStore.currentStep === 2){
    handleStep2Submit();
  }
  else if(bookingStore.currentStep === 3){
    handleStep3Submit();
  }
}
const handleStep2Submit = async () => {
  try {
    const isValid = bookingStore.validateStep(2);
    if (!isValid) {
      console.error("Validation failed for Step 1:", bookingStore.errors);
      return;
    }

    bookingStore.loading = true;
    await bookingStore.submitStep2();
    console.log("Step 2 submitted successfully");

    bookingStore.nextStep();
  } catch (error) {
    console.error("Error during Step 2 submission:", error);
  } finally {
    bookingStore.loading = false;
  }
};
const handleStep3Submit = async () => {
  try {
    // For Step 3, we validate the form and then show the payment modal
    const isValid = bookingStore.validateStep(3);
    if (!isValid) {
      console.error("Validation failed for Step 3:", bookingStore.errors);
      return;
    }

    console.log("Review completed successfully - opening payment modal");
    
    // Show the payment modal
    showPaymentModal.value = true;
  } catch (error) {
    console.error("Error during Step 3 submission:", error);
  }
};
</script>
