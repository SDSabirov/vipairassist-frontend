<template>
    <div>
      <Navbar/>
      <LandingHero/>
      <LandingServices/>
      <LandingFeatures/>
      <LandingTopAirports/>
      <LandingAbout/>
      <testimonials/>
      <Footer />
      
    </div>
</template>

<script setup>
definePageMeta({
  title: 'Global Meet & Greet, Fastrack | Premium Airport Concierge Services',
  
})
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VIP AirAssist",
        "url": "https://vipairassist.com",
        "logo": "https://vipairassist.com/path-to-logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+971506964878",
          "contactType": "Customer Service",
          "areaServed": "Worldwide",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://www.facebook.com/vipairassist"
        ]
      })
    }
  ]
})
</script>