<template>
  <div>
    <Navbar />
    <section class="flex max-w-screen-xl items-center justify-center h-screen">
      <PayPalButton
        clientId="YOUR_PAYPAL_CLIENT_ID"
        createOrderUrl="/api/paypal/order/create/"
        captureOrderUrl="/api/paypal/order"
      />
    </section>

    <Footer />
  </div>
</template>

<script setup></script>
