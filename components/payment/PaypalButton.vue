<template>
  <div>
    <LoadingAnimationBlack v-if ="loading"/>
    <div id="paypal-button-container" class="paypal-button w-full"></div>
  </div>
  
</template>

<script setup>
import axios from "~/api/drf";
import { onMounted } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();
// Use current pricing and booking reference, not confirmed ones
const totalPrice = bookingStore.totalPrice + bookingStore.extrasTotal;
const bookingRef = bookingStore.bookingReference;
const loading = ref(true);

const loadPaypalScript = () => {
  return new Promise((resolve) => {
    const clientId = useRuntimeConfig().public.paypalClientId;
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const initializePaypalButton = async () => {
  await loadPaypalScript();
  loading.value=false
  paypal.Buttons({
    createOrder: async function () {
      try {
        const response = await axios.post("payments/create-order/", {
          total: totalPrice, 
          booking_ref: bookingRef,
          currency: "USD",
        });
        return response.data.id; // Return EC-XXX token
      } catch (error) {
        console.error("Error creating order:", error);
        throw error;
      }
    },

    onApprove: async function (data) {
      try {
        // Process payment and finalize booking in single backend call
        const result = await bookingStore.processPaymentAndFinalize({
          payment_method: 'paypal',
          payment_data: {
            orderID: data.orderID,
            payerID: data.payerID
          }
        });
        
        if (result.payment_status === 'PAID' && result.booking_status === 'CONFIRMED') {
          router.push("/booking/success");
        } else {
          alert("Payment processing failed. Please try again.");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        alert("Error occurred during payment processing.");
      }
    },

    onCancel: function () {
      console.warn("Payment cancelled by the user.");
      router.push("/booking/cancel");
    },

    onError: function (err) {
      console.error("PayPal button error:", err);
    },
  }).render("#paypal-button-container");
};

onMounted(() => {
  
  initializePaypalButton();
});
</script>