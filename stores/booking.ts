import { defineStore } from "pinia";
import axios from "axios";

// Type Definitions for Form Data
type Airport = {
  name: string;
  code: string;
  city: string;
  country: string;
};

type Passenger = { name: string; age: number };

type Step1Data = {
  name: string;
  email: string;
  phone: string;
  airport: Airport;
  flight: string;
  adults: number | null;
  children: number | null;
  infants: number | null;
  numberOfBags: number | null;
  date: string;
  time: string;
  extraRequest: string;
  airportSecondary?: Airport;
  flightSecondary?: string;
  dateSecondary?: string;
  timeSecondary?: string;
};

type Step2Data = {
  services: string[];
};

type Step3Data = {
  passengers: Passenger[];
};

type FormData = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
};

// Default Values
const defaultAirport: Airport = {
  name: "",
  code: "",
  city: "",
  country: "",
};

const defaultStep1Data: Step1Data = {
  name: "",
  email: "",
  phone: "",
  airport: defaultAirport,
  flight: "",
  adults: null,
  children: null,
  infants: null,
  numberOfBags: null,
  date: "",
  time: "",
  extraRequest: "",
  airportSecondary: defaultAirport,
  flightSecondary: "",
  dateSecondary: "",
  timeSecondary: "",
};

// Pinia Store Definition
export const useBookingStore = defineStore("booking", {
  // State
  state: () => ({
    currentStep: 1,
    bookingType: "Arrival",
    formData: {
      step1: { ...defaultStep1Data },
      step2: { services: [] },
      step3: { passengers: [] },
    },
    loading: false,
    errors: {} as Record<string, string>,
  }),

  // Getters
  getters: {
    totalSteps: () => 3,
    isLastStep: (state) => state.currentStep === state.totalSteps,
    isFirstStep: (state) => state.currentStep === 1,
  },

  // Actions
  actions: {
    // Step Navigation
    nextStep() {
      if (this.validateStep(this.currentStep)) {
        if (this.currentStep < this.totalSteps) this.currentStep++;
      } else {
        this.error = `Validation failed for step ${this.currentStep}`;
      }
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },

    // Booking Type Management
    setBookingType(type: string) {
      this.bookingType = type;
    },

    // Update Form Data
    updateFormData(
      section: keyof FormData,
      data: Partial<Step1Data | Step2Data | Step3Data>
    ) {
      this.formData[section] = { ...this.formData[section], ...data };
    },

    // Form Reset
    resetBooking() {
      this.currentStep = 1;
      this.bookingType = "Arrival";
      this.formData = {
        step1: { ...defaultStep1Data },
        step2: { services: [] },
        step3: { passengers: [] },
      };
    },

    // Form Validation
    validateStep(step: number): boolean {
      this.errors = {}; // Clear previous errors
      let isValid = true;

      if (step === 1) {
        if (!this.formData.step1.name) {
          this.errors.name = "Full Name is required.";
          isValid = false;
        }
        if (
          !this.formData.step1.email ||
          !this.validateEmail(this.formData.step1.email)
        ) {
          this.errors.email = "A valid email is required.";
          isValid = false;
        }
        if (!this.formData.step1.phone) {
          this.errors.phone = "Phone number is required.";
          isValid = false;
        }
        if (!this.formData.step1.airport) {
          this.errors.airport = "Airport is required.";
          isValid = false;
        }
        if (!this.formData.step1.flight) {
          this.errors.flight = "Flight number is required.";
          isValid = false;
        }
      }

      return isValid;
    },

    validateEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    // API Submission Logic
    async submitStep1() {
      this.loading = true;
      try {
        const response = await axios.post("/api/step1", this.formData.step1);
        console.log("Step 1 submitted successfully:", response.data);
      } catch (error) {
        this.error = "Failed to submit Step 1.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async submitStep2() {
      this.loading = true;
      try {
        const response = await axios.post("/api/step2", this.formData.step2);
        console.log("Step 2 submitted successfully:", response.data);
      } catch (error) {
        this.error = "Failed to submit Step 2.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async submitFinalStep() {
      this.loading = true;
      try {
        const response = await axios.post("/api/final", {
          ...this.formData.step1,
          ...this.formData.step2,
          ...this.formData.step3,
        });
        console.log("Booking completed successfully:", response.data);
      } catch (error) {
        this.error = "Failed to submit final step.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },

  // Persist State
  persist: {
    enabled: true,
    strategies: [
      {
        key: "booking",
        storage: typeof window !== "undefined" ? localStorage : null,
      },
    ],
  },
});
