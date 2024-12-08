<template>
  <div>
    <navbar />
    <div class="flex py-28 items-center justify-center">
      <div class="max-w-screen-xl w-full px-6 py-8 space-y-8">
        <header class="text-center">
          <h1 class="text-3xl md:text-5xl font-bold text-gray-800">
            Frequently Asked Questions
          </h1>
          <p class="text-gray-600 mt-4">
            Find answers to the most common questions about our Meet & Greet
            services.
          </p>
        </header>

        <section>
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="border-b pb-4 mb-6"
          >
            <button
              @click="toggle(index)"
              class="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-700 hover:text-blue-500"
            >
              {{ faq.question }}
              <i
                :class="[
                  'bx transition-transform duration-300',
                  expanded === index ? 'bx-chevron-up' : 'bx-chevron-down',
                ]"
              ></i>
            </button>
            <div
              v-if="expanded === index"
              class="mt-2 text-gray-600 leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </div>
        </section>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";

const faqs = ref([
  {
    question: "What are airport Meet & Greet services and by whom are they performed?",
    answer: "Our Meet & Greet services provide you with a personal airport assistant who will guide you through the entire airport process, from arrival to departure. These services are performed by our professional VIP airport agents, ensuring a smooth and hassle-free airport experience.",
  },
  {
    question: "Will your airport Meet & Greet service allow me to skip the queues?",
    answer: "Our services include fast-track options at many airports, which allow you to skip regular queues for immigration, security, and check-in. However, availability may vary depending on the airport and local regulations.",
  },
  {
    question: "Which passengers are airport Meet & Greet services designed for?",
    answer: "Our services include fast-track options at many airports, which allow you to skip regular queues for immigration, security, and check-in. However, availability may vary depending on the airport and local regulations.",
  },
  {
    question: "Are your airport Meet & Greet services provided only to Business or First Class passengers?",
    answer: "No, our services are available to all passengers, regardless of the class of travel. We cater to Economy, Business, and First Class passengers alike.",
  },
  {
    question: "Where does the airport assistant meet the passengers?",
    answer: "The airport assistant will meet you at a designated location, such as the arrivals gate, check-in counter, or a specified meeting point within the airport. You will receive detailed instructions on where to meet your assistant.",
  },
  {
    question: "How will I recognise the airport assistant?",
    answer: "Your airport assistant will be easily identifiable by the welcome sign bearing your name or any specific details provided during booking. They will also be dressed in appropriate uniform or attire based on the airport guidelines.",
  },
  {
    question: "What name or sign will there be on the assistant’s welcome board?",
    answer: "The welcome board will display the name you provided during the booking process. If you have any specific requests regarding the sign, please let us know in advance.",
  },
  {
    question: "Can you arrange for an airport assistant speaking a particular language?",
    answer: "Yes, we can arrange for an assistant who speaks your preferred language at many airports, subject to availability. Please inform us of your language preference when making a booking.",
  },
  {
    question: "Can you arrange for porter services to assist with the luggage?",
    answer: "Yes, we can arrange for porter services to assist with your luggage. Please let us know in advance, and we’ll ensure that this service is ready upon your arrival or departure.",
  },
  {
    question: "Can you provide wheelchairs or special assistance for impaired passengers?",
    answer: "While airlines are generally responsible for providing wheelchairs and special assistance, it's important to ensure that these needs are confirmed during your flight booking. However, please inform us if a passenger requires assistance, as this may impact the usual Meet & Greet procedures and allow us to make any necessary adjustments for a seamless experience.",
  },
  {
    question: "I am a passenger who flies Economy on departure. Can you provide me with access to a lounge?",
    answer: "Yes, we can arrange for lounge access for Economy passengers at select airports. Availability may vary, and additional fees may apply.",
  },
  {
    question: "Can you provide an electric buggy so that I don’t have to walk long distances inside the airport?",
    answer: "Yes, we can arrange for an electric buggy at certain airports, depending on availability. Please request this service when making your booking.",
  },
  {
    question: "Can you organise Meet & Greet services for large groups of passengers?",
    answer: "Yes, we specialize in managing Meet & Greet services for large groups, whether it's for corporate events, family gatherings, or group travel. Please contact us with your group details for personalized arrangements.",
  },
  {
    question: "Upon my request, I have been asked to provide copies or data of the passengers’ passports. Why?",
    answer: "We may require passport information to facilitate certain aspects of the service, such as fast-tracking through immigration or ensuring smooth coordination with airport authorities. All data provided is handled securely and in compliance with privacy regulations.",
  },
  {
    question: "After I make a booking, is there any additional information you need from me?",
    answer: "After booking, we may request flight details, passenger information, and any special service requests (e.g., wheelchair assistance, porter services) to ensure your experience is tailored to your needs.",
  },
  {
    question: "How to manage your booking?",
    answer: "You can manage your booking by contacting our customer service team via phone or email. You can also make changes or request additional services by providing your booking reference.",
  },
  {
    question: "What is the Cancellation / Refund policy?",
    answer: "Our cancellation and refund policies vary depending on the service and location. Please refer to the terms provided during the booking process or contact our support team for specific details.",
  },
  {
    question: "Will I always be fast-tracked?",
    answer: "Fast-track services are available at many airports, but they are subject to the airport's rules and regulations. We will always strive to provide the best possible experience, but some factors may be beyond our control.",
  },
  {
    question: "I'm a travel agent, can I book for my clients?",
    answer: "Yes, travel agents can book Meet & Greet services on behalf of their clients. Please contact us to set up an agent account or for more information on how to book.",
  },
]);

// Expand/Collapse Logic
const expanded = ref(null);

const toggle = (index) => {
  expanded.value = expanded.value === index ? null : index;
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.value.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};


useHead({
  title: "FAQ – Answers About Our VIP Airport Services",
  meta: [
    {
      name: "description",
      content:
        "Find answers to frequently asked questions about our Meet & Greet, Fast Track, Chauffeur, and VIP Terminal services. Learn how our services work and how they make your airport experience seamless.",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(generateFAQSchema()),
    },
  ],
});
</script>

<style scoped>
/* Optional: Add transition effect to FAQ answers */
[aria-hidden="true"] {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

[aria-hidden="false"] {
  max-height: 10rem; 
  transition: max-height 0.3s ease-in;
}
</style>
