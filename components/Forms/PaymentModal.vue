<template>
  <!-- Modal Overlay -->
  <div 
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <!-- Modal Content -->
    <div 
      class="bg-white shadow-2xl border border-gray-100 overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 relative">
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
        >
          <i class="bx bx-x text-2xl"></i>
        </button>
        <h2 class="text-2xl font-bold text-white">Complete Your Payment</h2>
        <p class="text-blue-100 mt-1">Choose your preferred payment method</p>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <!-- Booking Summary -->
        <div class="bg-gray-50 border border-gray-200 p-4 mb-6">
          <h3 class="font-semibold text-gray-800 mb-3 flex items-center">
            <i class="bx bx-receipt mr-2 text-gray-600"></i>
            Booking Summary
          </h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500">Service:</span>
              <p class="font-semibold capitalize">{{ bookingStore.bookingType }}</p>
            </div>
            <div>
              <span class="text-gray-500">Total Amount:</span>
              <p class="font-bold text-green-600 text-lg">
                ${{ (bookingStore.totalPrice + bookingStore.extrasTotal).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Payment Flow States -->
        
        <!-- State 1: Payment Method Selection -->
        <div v-if="paymentStep === 'select'" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- PayPal Account Option -->
            <button
              @click="selectPaymentMethod('paypal')"
              :disabled="paymentLoading"
              class="p-6 border-2 border-gray-300 hover:border-blue-500 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed relative"
              :class="paymentLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'"
            >
              <div v-if="paymentLoading" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                <i class="bx bx-loader-alt animate-spin text-2xl text-blue-600"></i>
              </div>
              <div class="flex items-center justify-center mb-3">
                <i class="bx bxl-paypal text-4xl text-blue-600"></i>
              </div>
              <h4 class="font-semibold text-gray-900 text-center mb-2">PayPal Account</h4>
              <p class="text-sm text-gray-600 text-center">Pay with your PayPal account</p>
            </button>

            <!-- Card Option (also via PayPal) -->
            <button
              @click="selectPaymentMethod('card')"
              :disabled="paymentLoading"
              class="p-6 border-2 border-gray-300 hover:border-gray-500 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed relative"
              :class="paymentLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'"
            >
              <div v-if="paymentLoading" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                <i class="bx bx-loader-alt animate-spin text-2xl text-gray-600"></i>
              </div>
              <div class="flex items-center justify-center mb-3">
                <i class="bx bx-credit-card text-4xl text-gray-600"></i>
              </div>
              <h4 class="font-semibold text-gray-900 text-center mb-2">Credit / Debit Card</h4>
              <p class="text-sm text-gray-600 text-center">Visa, MasterCard, American Express</p>
            </button>
          </div>

          <!-- Error Message -->
          <div v-if="paymentError" class="bg-red-50 border border-red-200 p-4">
            <div class="flex items-center text-red-800">
              <i class="bx bx-error-circle mr-2"></i>
              <span class="text-sm">{{ paymentError }}</span>
            </div>
          </div>
        </div>

        <!-- State 2: PayPal Processing -->
        <div v-else-if="paymentStep === 'paypal'" class="space-y-4">
          <div class="text-center py-4">
            <i class="bx bxl-paypal text-5xl text-blue-600 mb-3"></i>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">PayPal Payment</h4>
            <p class="text-gray-600 mb-4">Complete your payment securely with PayPal</p>
          </div>

          <!-- PayPal Smart Buttons -->
          <div v-if="bookingSubmitted" class="border border-gray-200 p-4 bg-gray-50">
            <PaymentPaypalButton />
          </div>
          
          <!-- Loading State -->
          <div v-else class="text-center py-8">
            <div class="flex items-center justify-center mb-4">
              <i class="bx bx-loader-alt animate-spin text-3xl text-gray-500 mr-2"></i>
              <span class="text-gray-600">Preparing your payment...</span>
            </div>
            <div class="text-sm text-gray-500">This will only take a moment</div>
          </div>

          <!-- Back Button -->
          <div class="pt-4 border-t border-gray-200">
            <button
              @click="goBackToPaymentSelection"
              class="w-full py-3 text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <i class="bx bx-left-arrow-alt mr-2"></i>
              Choose Different Payment Method
            </button>
          </div>
        </div>

        <!-- State 3: Card Payment (via PayPal) -->
        <div v-else-if="paymentStep === 'card'" class="space-y-4">
          <div class="text-center py-4">
            <i class="bx bx-credit-card text-5xl text-gray-600 mb-3"></i>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Card Payment</h4>
            <p class="text-gray-600 mb-4">Pay securely with your credit or debit card</p>
            <p class="text-sm text-gray-500">Powered by PayPal - no PayPal account required</p>
          </div>

          <!-- PayPal Smart Buttons (shows card option) -->
          <div v-if="bookingSubmitted" class="border border-gray-200 p-4 bg-gray-50">
            <PaymentPaypalButton />
            <p class="text-xs text-gray-500 text-center mt-3">You can pay with your card without creating a PayPal account</p>
          </div>
          
          <!-- Loading State -->
          <div v-else class="text-center py-8">
            <div class="flex items-center justify-center mb-4">
              <i class="bx bx-loader-alt animate-spin text-3xl text-gray-500 mr-2"></i>
              <span class="text-gray-600">Preparing your payment...</span>
            </div>
            <div class="text-sm text-gray-500">This will only take a moment</div>
          </div>

          <!-- Back Button -->
          <div class="pt-4 border-t border-gray-200">
            <button
              @click="goBackToPaymentSelection"
              class="w-full py-3 text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <i class="bx bx-left-arrow-alt mr-2"></i>
              Choose Different Payment Method
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <p class="text-sm text-gray-500">Secure payment powered by PayPal</p>
        <button 
          @click="closeModal"
          class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <i class="bx bx-x mr-1"></i>
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits(['close']);

// Payment flow state
const paymentStep = ref('select'); // 'select', 'paypal', 'card'
const bookingSubmitted = ref(false);
const paymentLoading = ref(false);
const paymentError = ref('');

// Payment method selection
const selectPaymentMethod = async (method) => {
  paymentLoading.value = true;
  paymentError.value = '';
  
  try {
    // Validate booking data (don't submit yet)
    await validateBooking();
    
    // Set payment step based on selection
    paymentStep.value = method;
  } catch (error) {
    console.error("Error submitting booking:", error);
    paymentError.value = "Error preparing payment. Please try again.";
  } finally {
    paymentLoading.value = false;
  }
};

// Validate booking data (don't submit yet)
const validateBooking = async () => {
  const isValid = bookingStore.validateStep(3);
  if (!isValid) {
    throw new Error("Form validation failed");
  }
  
  // Just mark as ready for payment without submitting
  bookingSubmitted.value = true;
  console.log("Booking validation passed, ready for payment");
};

// Go back to payment selection
const goBackToPaymentSelection = () => {
  paymentStep.value = 'select';
  bookingSubmitted.value = false;
  paymentError.value = '';
};

// Close modal
const closeModal = () => {
  // Reset state when closing
  paymentStep.value = 'select';
  bookingSubmitted.value = false;
  paymentError.value = '';
  paymentLoading.value = false;
  emit('close');
};

// Close modal when escape key is pressed
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

// Add/remove event listener for escape key
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  } else {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
});

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = 'auto';
});
</script>