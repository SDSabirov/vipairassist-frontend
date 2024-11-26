<template>
  <div>
    <navbar />
    <BlogBlogsHero :src="image" :page="page" /> 
    <section class="bg-white flex w-full justify-center items-center py-12 mt-10 mb-8">
      <div class="grid grid-cols-1 grid-cols-2 gap-8 max-w-screen-xl">
        <div
         v-for="blog,index in blogs" :key="index"
          class="grid grid-cols-1 grid-cols-2 min-w-[275px] h-[321px] overflow-hidden gap-2"
        >
          <div class="w-full h-full overflow-hidden">
            <img
              :src="blog.image"
              alt="Blog Image"
              class="hover:scale-110 w-full h-full duration-300 object-cover"
            />
          </div>

          <div class="flex flex-col space-y-6">
            <h3 class="text-lg font-semibold leading-[180%]">
              {{blog.title}}
            </h3>
            <p class="font-medium text-md leading-[110%]">
              {{blog.short}}
            </p>
            <div class="flex w-full">
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
import image from "~/assets/images/blogs/blogs.webp";
import image1 from "~/assets/images/blogs/blog1.webp";
import image2 from "~/assets/images/blogs/blog2.webp";
import image3 from "~/assets/images/blogs/blog3.webp";
import image4 from "~/assets/images/blogs/blog4.webp";
import Footer from "~/components/Footer.vue";
import Navbar from "~/components/navbar.vue";

const page = "Our Blogs";

const blog1link = "/services"

const blogs = [
    {title: "The Art of Seamless Travel: How VIP Airport Services RedefineLuxury",
     short:"In today’s fast-paced world, time and convenience have become theultimate luxuries. For discerning travelers, the airportexperience often sets the tone for their entire journey...",
     image:image1,
     link:"the-art-of-seamless-travel"
    },
    {title: "Behind the Curtain: A Day in the Life of a VIP Airport Assistant",
     short:"The luxury of VIP airport services may feel effortless to the traveler, but behind the scenes, there’s a dedicated team working...",
     image:image2,
     link:"the-art-of-seamless-travel"
    },
    {title: "Stress-Free Family Travel: VIP Services Tailored for Families",
     short:"Traveling with young children can be a challenge, even for the most seasoned parents. Between managing luggage, navigating security, and keeping little ones ...",
     image:image3,
     link:"the-art-of-seamless-travel"
    },
    {title: "The Best Winter Travel Destinations for Luxury Seekers",
     short:"Winter is a time of transformation. As snow blankets the landscape, the world’s most luxurious travel destinations become havens for those seeking...",
     image:image4,
     link:"the-art-of-seamless-travel"
    },
]
</script>
