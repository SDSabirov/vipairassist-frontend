<template>
  <div class="py-8 lg:py-16 px-4 w-full">
    <form @submit.prevent="submitContactForm" class="space-y-14 w-full">
      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Your Name</label
        >
        <input
          v-model="name"
          type="text"
          id="name"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700"
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Your email</label
        >
        <input
          v-model="email"
          type="email"
          id="email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div>
        <label
          for="subject"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Subject</label
        >
        <input
          v-model="subject"
          type="text"
          id="subject"
          class="block p-3 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
          placeholder="Let us know how we can help you"
          required
        />
      </div>
      <div class="sm:col-span-2">
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >Your message</label
        >
        <textarea
          id="message"
          v-model="message"
          rows="6"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Leave a comment..."
        ></textarea>
      </div>
      <div class="flex w-full items-center justify-center py-12">
        <button
          :disabled="loading"
          class="relative px-12 py-3 text-black border border-black text-2xl leading-[108%] group overflow-hidden"
        >
          <span
            class="absolute inset-0 w-0 bg-black/70 transition-all duration-500 ease-in-out group-hover:w-full"
          ></span>
          <div
            class="flex items-center justify-center space-x-4 relative z-10 transition-colors duration-500 group-hover:text-white"
          >
            <p v-if="!loading">Submit</p>
            <p v-else>Submitting...</p>
          </div>
        </button>
      </div>
      <p v-if="successMessage" class="text-green-500 text-center">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="text-red-500 text-center">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");

const loading = ref(false);
const successMessage = ref(null);
const errorMessage = ref(null);


const submitContactForm = async () => {
  loading.value = true;
  successMessage.value = null;
  errorMessage.value = null;

  const data = {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/submit-contact/",
      data
    );
    successMessage.value = "Your message has been submitted successfully!";
   
    name.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
  } catch (error) {
    errorMessage.value =
      "An error occurred while submitting the form. Please try again.";
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
