<template>
    <div>
      <!-- Loading indicator for PayPal SDK -->
      <div v-if="!isPayPalLoaded" class="text-gray-500 text-center my-4">
        Loading PayPal...
      </div>
  
      <!-- Container for PayPal button -->
      <div id="paypal-button-container" v-else></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  
  // Props for API endpoints and PayPal client ID
  defineProps({
    clientId: {
      type: String,
      required: true, // Your PayPal Client ID
    },
    createOrderUrl: {
      type: String,
      required: true, // URL to create the PayPal order
    },
    captureOrderUrl: {
      type: String,
      required: true, // URL to capture the PayPal order
    },
  });
  
  // State
  const isPayPalLoaded = ref(false);
  
  // Load the PayPal SDK dynamically
  const loadPayPalScript = async (clientId) => {
    if (document.getElementById("paypal-sdk")) {
      isPayPalLoaded.value = true; // PayPal SDK already loaded
      return;
    }
  
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.onload = () => {
        isPayPalLoaded.value = true;
        resolve();
      };
      script.onerror = () => reject(new Error("PayPal SDK failed to load"));
      document.body.appendChild(script);
    });
  };
  
  // Render the PayPal button
  const renderPayPalButton = () => {
    if (!window.paypal) {
      console.error("PayPal SDK not loaded");
      return;
    }
  
    paypal
      .Buttons({
        createOrder: () => {
          return fetch(createOrderUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((orderData) => orderData.id); // Return the order ID
        },
        onApprove: (data) => {
          return fetch(`${captureOrderUrl}/${data.orderID}/capture/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((orderData) => {
              const transaction =
                orderData.purchase_units[0].payments.captures[0];
              alert(
                `Transaction ${transaction.status}: ${transaction.id}\n\nSee console for details`
              );
              console.log("Transaction Details:", orderData);
            })
            .catch((err) => {
              console.error("Error capturing PayPal order:", err);
            });
        },
        onError: (err) => {
          console.error("PayPal Button Error:", err);
        },
      })
      .render("#paypal-button-container");
  };
  
  // Initialize PayPal Button
  onMounted(async () => {
    try {
      await loadPayPalScript(clientId);
      renderPayPalButton();
    } catch (error) {
      console.error("Error initializing PayPal Button:", error);
    }
  });
  </script>
  