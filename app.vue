<template>
  <div class="font-serif">
    <NuxtLayout>
       <NuxtPage />
       <ClientOnly>
         <LazyWhatsapp />
       </ClientOnly>
       <ClientOnly>
         <LazyCookieConsent />
       </ClientOnly>
    </NuxtLayout>
  </div>
</template>

<script setup></script>