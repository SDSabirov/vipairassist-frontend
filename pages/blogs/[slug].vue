<template>
  <div>
    <navbar />
    <BlogBlogsHero :src="image" :page="page" />

    <!-- Blog Content Section -->
    <section
      class="bg-white flex flex-col w-full justify-center items-center py-8 md:py-12 mt-6 md:mt-10 mb-6 md:mb-8"
    >
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>

      <!-- Blog content -->
      <div v-else-if="blog" class="max-w-screen-lg px-4 md:px-6 w-full">
        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">{{ blog.title }}</h1>
        <p class="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">{{ blog.date }}</p>
        
        <!-- Blog image -->
        <div class="mb-6 md:mb-8">
          <img
            :src="blog.image"
            :alt="blog.title"
            class="w-full h-48 md:h-64 lg:h-80 object-cover"
            loading="lazy"
          />
        </div>
        
        <div class="prose prose-sm md:prose-lg max-w-none">
          <p
            v-for="(paragraph, index) in blog.content.split('\n')"
            :key="index"
            class="text-base md:text-lg text-gray-800 leading-7 md:leading-8 mb-4 md:mb-6"
          >
            {{ paragraph }}
          </p>
        </div>
        
        <!-- Back to blogs button for mobile -->
        <div class="mt-8 md:mt-12">
          <router-link 
            to="/blogs" 
            class="inline-flex items-center px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
          >
            ← Back to Blogs
          </router-link>
        </div>
      </div>

      <!-- Fallback if blog not found -->
      <div v-else class="text-center text-red-600 font-semibold px-4">
        <p class="text-lg mb-4">Blog not found!</p>
        <router-link 
          to="/blogs" 
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Blogs
        </router-link>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import image1 from "~/assets/images/blogs/blog1.webp";
import image2 from "~/assets/images/blogs/blog2.webp";
import image3 from "~/assets/images/blogs/blog3.webp";
import image4 from "~/assets/images/blogs/blog4.webp";

// Blog data
const blogs = [
  {
    title:
      "The Art of Seamless Travel: How VIP Airport Services Redefine Luxury",
    content: `In today’s fast-paced world, time and convenience have become the ultimate luxuries. For discerning travelers, the airport experience often sets the tone for their entire journey. Unfortunately, long lines, security checks, and the hustle and bustle of crowded terminals can quickly detract from the excitement of travel. This is where VIP airport services come in, offering an experience that transforms air travel from a chore into a refined and seamless process.

VIP services, such as those offered by VIPAIRASSIST, go beyond the standard airport amenities. From the moment a passenger arrives at the airport, they are met by a personal concierge who handles everything from check-in to baggage handling, ensuring that the traveler’s journey through the airport is stress-free. Fast-track services allow travelers to bypass long security lines, while access to private lounges offers a quiet, comfortable space to relax before boarding.

What truly sets VIP airport services apart is the personalization. Every traveler has unique needs, whether it’s a business executive needing a quiet place to work or a family looking for kid-friendly options. VIP services are designed to cater to these specific needs, offering everything from private suites and dining to personal shoppers and chauffeurs waiting to whisk passengers away as soon as they land.

With luxury VIP services, airports are no longer just a stop on the way to a destination; they become an integral part of the travel experience itself. Whether flying for business or pleasure, VIPAIRASSIST ensures that every aspect of the journey is tailored to the traveler’s comfort, convenience, and peace of mind.`,
    image: image1,
    slug: "the-art-of-seamless-travel",
    date: "27/11/2024",
  },
  {
    title: "Behind the Curtain: A Day in the Life of a VIP Airport Assistant",
    content: `The luxury of VIP airport services may feel effortless to the traveler, but behind the scenes, there’s a dedicated team working tirelessly to make sure everything runs smoothly. A VIP airport assistant’s day is far from ordinary, filled with precision, quick thinking, and a commitment to delivering exceptional service.

From the crack of dawn, VIP assistants are on the move, preparing for the day’s travelers. Each assistant is assigned to specific clients, whether it’s a high-profile celebrity or a family looking for a seamless travel experience. The day often begins with a detailed briefing—client preferences, special requirements, and any unexpected changes in travel plans. The goal is always the same: make the passenger’s journey as stress-free and comfortable as possible.

As the travelers arrive, VIP assistants are there to greet them with a warm smile and a plan in place. Every detail, from luggage handling to check-in and security, is managed by the assistant. For VIP clients, time is a valuable commodity, and the assistant’s job is to ensure that not a minute is wasted. Whether it’s escorting them through fast-track security lanes or making sure their favorite snack is available in the lounge, no task is too small.

But being a VIP assistant is about more than just efficiency. It’s about anticipating needs before they arise, managing unexpected challenges with grace, and creating a personalized experience that leaves a lasting impression. Whether it’s arranging last-minute reservations or finding a solution to an airline delay, a VIP assistant’s role requires adaptability, discretion, and dedication.

This behind-the-scenes role is crucial to creating the seamless travel experiences that VIPAIRASSIST is known for, ensuring that every client feels like a true VIP from the moment they arrive at the airport until they reach their final destination.`,
    image: image2,
    slug: "behind-the-curtain",
    date: "27/11/2024",
  },
  {
    title: "Stress-Free Family Travel: VIP Services Tailored for Families",
    content: `Traveling with young children can be a challenge, even for the most seasoned parents. Between managing luggage, navigating security, and keeping little ones entertained, the airport experience can quickly become overwhelming. But VIP airport services are not just for business travelers or luxury-seeking individuals—they can be a lifesaver for families, too.

VIP services like those offered by VIPAIRASSIST are designed to make family travel as stress-free as possible. From the moment a family arrives at the airport, they are met by a personal concierge who handles everything from check-in to managing luggage. For parents, this means no more juggling multiple suitcases while trying to keep an eye on children.

Fast-track security is another key benefit for families. Waiting in long lines with restless kids can be stressful, but with VIP services, families can breeze through security and head straight to their gate or lounge. Some airports even offer dedicated family-friendly areas within their VIP lounges, complete with playrooms, entertainment, and kid-friendly meals.

For international travel, VIP assistance becomes even more valuable. Navigating customs and immigration with children can be daunting, but with a VIP escort, the process is expedited and simplified. This not only saves time but reduces stress for both parents and kids.

Many VIP services also cater to the needs of families with young children by offering help with strollers, car seats, and even arranging ground transportation equipped for family needs. Whether traveling for vacation or to visit loved ones, families can enjoy the luxury of convenience and personalized service, ensuring that their journey is as enjoyable as their destination.

With the help of VIPAIRASSIST, families can experience the ease and comfort of VIP travel, creating a smoother, more enjoyable experience for parents and children alike.`,
    image: image3,
    slug: "stress-free-family-travel",
    date: "27/11/2024",
  },
  {
    title: "The Best Winter Travel Destinations for Luxury Seekers",
    content: `Winter is a time of transformation. As snow blankets the landscape, the world’s most luxurious travel destinations become havens for those seeking a blend of adventure, relaxation, and indulgence. Whether you’re drawn to the majestic slopes of the Alps, the glittering lights of Aspen, or the enchanting landscapes of Lapland, winter offers endless opportunities for a high-end escape. And with VIP airport services like those from VIPAIRASSIST, the journey to these exclusive destinations becomes an unforgettable part of the experience.

Here are some of the best winter travel destinations for luxury seekers, along with how VIPAIRASSIST can elevate the experience:

1. The Swiss Alps: A Skiing Paradise

The Swiss Alps are synonymous with winter luxury. Home to some of the world’s most prestigious ski resorts like St. Moritz and Zermatt, this destination attracts celebrities, royalty, and high-end travelers from around the globe. The charm of the Swiss Alps lies not only in its pristine slopes but also in the world-class chalets, gourmet dining, and après-ski culture.

VIPAIRASSIST can make your journey to the Swiss Alps as seamless as possible. From fast-tracking through crowded holiday airports to arranging private ground transportation from Geneva or Zurich to your resort, our services ensure that your vacation begins the moment you step off the plane. Whether you’re traveling with ski gear or seeking a quiet, discreet travel experience, we handle every detail so you can focus on enjoying your alpine adventure.

2. Aspen, Colorado: The Ultimate Luxury Ski Resort

Aspen is the quintessential luxury winter destination in the United States. Known for its glamorous atmosphere, upscale boutiques, and celebrity sightings, Aspen is a haven for those who want to hit the slopes during the day and indulge in high-end dining and entertainment in the evening. The town's vibrant nightlife and exclusive après-ski lounges make it a top choice for travelers who love both adventure and refinement.

With VIPAIRASSIST, your Aspen getaway starts the moment you arrive at the airport. Avoid the holiday crowds with our meet-and-greet services, fast-track check-in, and personalized assistance with heavy luggage or ski equipment. Whether flying into Aspen-Pitkin County Airport or a larger hub like Denver International, VIPAIRASSIST ensures that every aspect of your travel is handled with care, allowing you to arrive at your resort refreshed and ready to enjoy all Aspen has to offer.

3. Lapland, Finland: A Winter Wonderland

For those looking for a more serene and enchanting winter escape, Lapland in Finland offers a truly magical experience. Famous for its otherworldly landscapes, reindeer sleigh rides, and the opportunity to see the Northern Lights, Lapland is a dream destination for luxury travelers seeking tranquility. Stay in an igloo hotel, enjoy private snowmobile tours, or unwind in a cozy cabin beneath the glow of the Aurora Borealis.

VIPAIRASSIST can make the remote journey to Lapland effortless. With our seamless VIP services, travelers can navigate through busy international airports with ease, from Helsinki to the Arctic Circle. Whether it’s handling cold-weather gear, coordinating ground transfers to your remote lodge, or assisting with expedited customs clearance, our team ensures that every detail is taken care of, allowing you to immerse yourself in the serene beauty of Lapland.

4. Courchevel, France: The Epitome of Ski Luxury

Courchevel, located in the French Alps, is the epitome of ski luxury. Known for its Michelin-starred restaurants, five-star hotels, and upscale shopping, Courchevel attracts the world's elite during the winter months. Beyond the skiing, Courchevel offers helicopter rides over the mountains, private spa retreats, and exclusive après-ski venues that define opulence.

VIPAIRASSIST ensures that your travel to Courchevel is as elite as the destination itself. From private jet coordination to fast-tracked security at your departure airport, we ensure that`,
    image: image4,
    slug: "the-best-winter-travel",
    date: "27/11/2024",
  },
];

// State for the selected blog
const blog = ref(null);
const route = useRoute();
let image = ref(null);
let page = ref(null);
const loading = ref(true);


onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    const slug = route.params.slug;
    blog.value = blogs.find((item) => item.slug === slug);
    
    if (blog.value) {
      image = ref(blog.value.image);
      page = ref(blog.value.title);
      
      useHead({
        title: blog.value.title,
        meta: [
          {
            name: "description",
            content: blog.value.content.slice(0, 160), // Limit description length
          },
        ],
      });
    } else {
      console.error("Blog not found!");
    }
    
    loading.value = false;
  }, 300);
});
</script>
