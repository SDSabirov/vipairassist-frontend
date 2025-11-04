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

      <!-- Honeypot field - hidden from users, visible to bots -->
      <div class="honeypot-field">
        <label for="website">Website (leave empty)</label>
        <input
          v-model="honeypot"
          type="text"
          id="website"
          name="website"
          tabindex="-1"
          autocomplete="off"
        />
      </div>

      <!-- Cloudflare Turnstile widget -->
      <div class="flex justify-center w-full">
        <div
          ref="turnstileElement"
          class="cf-turnstile"
          :data-sitekey="config.public.turnstileSiteKey"
          data-callback="onTurnstileSuccess"
          data-theme="light"
        ></div>
      </div>

      <div class="flex w-full items-center justify-center py-12">
        <button
          :disabled="loading || isRateLimited"
          class="relative px-12 py-3 text-black border border-black text-2xl leading-[108%] group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
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
import { ref, computed, onMounted } from "vue";
import axios from "~/api/drf";

// Get runtime config for Turnstile site key
const config = useRuntimeConfig();

// Form fields
const name = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");

// Anti-bot protection fields
const honeypot = ref(""); // Honeypot field - should remain empty
const turnstileToken = ref(""); // Turnstile verification token
const formStartTime = ref(0); // Track when form was loaded
const lastSubmitTime = ref(0); // Track last submission time
const turnstileElement = ref(null); // Reference to Turnstile widget element

// UI state
const loading = ref(false);
const successMessage = ref(null);
const errorMessage = ref(null);

// Rate limiting configuration
const RATE_LIMIT_MS = 60000; // 1 minute between submissions
const MIN_FORM_TIME_MS = 3000; // Minimum 3 seconds to fill form

// Computed property for rate limiting
const isRateLimited = computed(() => {
  if (lastSubmitTime.value === 0) return false;
  const timeSinceLastSubmit = Date.now() - lastSubmitTime.value;
  return timeSinceLastSubmit < RATE_LIMIT_MS;
});

// Initialize form start time and set up Turnstile callback
onMounted(() => {
  formStartTime.value = Date.now();

  // Set up global callback for Turnstile
  if (typeof window !== 'undefined') {
    window.onTurnstileSuccess = (token) => {
      turnstileToken.value = token;
    };
  }
});

const submitContactForm = async () => {
  loading.value = true;
  successMessage.value = null;
  errorMessage.value = null;

  try {
    // Anti-bot validation layer 1: Honeypot check
    if (honeypot.value) {
      console.log("Bot detected via honeypot");
      errorMessage.value = "Invalid form submission detected.";
      loading.value = false;
      return;
    }

    // Anti-bot validation layer 2: Time-based validation
    const elapsedTime = Date.now() - formStartTime.value;
    if (elapsedTime < MIN_FORM_TIME_MS) {
      errorMessage.value = "Please take your time to fill out the form.";
      loading.value = false;
      return;
    }

    // Anti-bot validation layer 3: Rate limiting
    if (isRateLimited.value) {
      const remainingTime = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmitTime.value)) / 1000);
      errorMessage.value = `Please wait ${remainingTime} seconds before submitting again.`;
      loading.value = false;
      return;
    }

    // Anti-bot validation layer 4: Turnstile verification
    if (!turnstileToken.value) {
      errorMessage.value = "Please complete the verification challenge.";
      loading.value = false;
      return;
    }

    // Prepare form data with Turnstile token
    const data = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
      turnstile_token: turnstileToken.value, // Include token for backend verification
    };

    // Configure CSRF token for Django
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

    // Submit form
    const response = await axios.post("submit-contact/", data);

    successMessage.value = "Your message has been submitted successfully!";

    // Update last submit time
    lastSubmitTime.value = Date.now();

    // Clear form fields
    name.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
    honeypot.value = "";
    turnstileToken.value = "";

    // Reset Turnstile widget
    if (typeof window !== 'undefined' && window.turnstile) {
      window.turnstile.reset();
    }

    // Reset form start time for next submission
    formStartTime.value = Date.now();

  } catch (error) {
    errorMessage.value =
      "An error occurred while submitting the form. Please try again.";
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Hide honeypot field from human users */
.honeypot-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
}

/* Ensure honeypot label is also hidden */
.honeypot-field label {
  position: absolute;
  left: -9999px;
}
</style>
