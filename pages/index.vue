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
  title: 'VIP Air Assist | Premium Airport Services Worldwide',
  meta: [
    {
      name: 'description',
      content: 'Experience luxury airport services including meet & greet, fast-track security, VIP terminals, and chauffeur transfers at 1200+ airports worldwide. Book your premium travel experience today.'
    },
    {
      name: 'keywords',
      content: 'airport VIP services, meet and greet, fast track, airport concierge, VIP terminal, chauffeur service, airport assistance'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VIP AirAssist",
        "url": "https://vipairassist.com",
        "logo": "https://vipairassist.com/logo.png",
        "description": "Premium airport VIP services including meet & greet, fast-track, and chauffeur transfers worldwide.",
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