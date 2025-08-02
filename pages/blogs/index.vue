<template>
  <div>
    <navbar />
    <BlogBlogsHero :src="image" :page="page" /> 
    <section class="bg-white flex w-full justify-center items-center py-8 md:py-12 mt-6 md:mt-10 mb-6 md:mb-8">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
      
      <!-- Blog content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-screen-xl px-4 md:px-6">
        <div
         v-for="blog,index in blogs" :key="index"
          class="flex flex-col md:grid md:grid-cols-2 min-w-[275px] md:h-[321px] overflow-hidden gap-4 md:gap-2 bg-white shadow-sm md:shadow-none"
        >
          <div class="w-full h-48 md:h-full overflow-hidden">
            <img
              :src="blog.image"
              :alt="blog.title"
              class="hover:scale-110 w-full h-full duration-300 object-cover"
              loading="lazy"
            />
          </div>

          <div class="flex flex-col space-y-3 md:space-y-6 p-4 md:p-0">
            <h3 class="text-lg md:text-xl font-semibold leading-[140%] md:leading-[180%] line-clamp-3">
              {{blog.title}}
            </h3>
            <p class="font-medium text-base md:text-lg leading-6 md:leading-7 text-gray-600 line-clamp-3">
              {{blog.short}}
            </p>
            <div class="flex w-full pt-2 md:pt-0">
              <ButtonsBloglink :link="blog.link"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import image from "~/assets/images/blogs/blogs.webp";
import image1 from "~/assets/images/blogs/blog1.webp";
import image2 from "~/assets/images/blogs/blog2.webp";
import image3 from "~/assets/images/blogs/blog3.webp";
import image4 from "~/assets/images/blogs/blog4.webp";
import Footer from "~/components/Footer.vue";
import Navbar from "~/components/navbar.vue";

const page = "Our Blogs";
const loading = ref(true);


const blogs = [
    {title: "The Art of Seamless Travel: How VIP Airport Services RedefineLuxury",
     short:"In today’s fast-paced world, time and convenience have become theultimate luxuries. For discerning travelers, the airportexperience...",
     image:image1,
     link:"/blogs/the-art-of-seamless-travel"
    },
    {title: "Behind the Curtain: A Day in the Life of a VIP Airport Assistant",
     short:"The luxury of VIP airport services may feel effortless to the traveler, but behind the scenes, there’s a dedicated team working...",
     image:image2,
     link:"/blogs/behind-the-curtain"
    },
    {title: "Stress-Free Family Travel: VIP Services Tailored for Families",
     short:"Traveling with young children can be a challenge, even for the most seasoned parents. Between managing luggage, navigating security, a ...",
     image:image3,
     link:"/blogs/stress-free-family-travel"
    },
    {title: "The Best Winter Travel Destinations for Luxury Seekers",
     short:"Winter is a time of transformation. As snow blankets the landscape, the world’s most luxurious travel destinations become havens for those seeking...",
     image:image4,
     link:"/blogs/the-best-winter-travel"
    },
]

// Simulate loading time and set loading to false
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
})
</script>
