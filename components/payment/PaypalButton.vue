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
const totalPrice = bookingStore.bookingConfirmed.totalPrice;
const bookingRef = bookingStore.bookingConfirmed.bookingReference;
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
        const response = await axios.post("payments/capture-order/", {
          orderID: data.orderID, // Pass EC-XXX to backend
        });
        if (response.status === 201) {
          router.push("/booking/success");
        } else {
          alert("Payment capture failed!");
        }
      } catch (error) {
        console.error("Error capturing order:", error);
        alert("Error occurred during payment capture.");
      }
    },

    onCancel: function () {
      console.warn("Payment cancelled by the user.");
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