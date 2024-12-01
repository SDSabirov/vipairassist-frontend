import { defineStore } from "pinia";
import axios from "axios";

// Type Definitions for Form Data
type Airport = {
  name: string;
  code: string;
  city: string;
  country: string;
};
type ExtraService = {
  name:string;
  id:number;
  description:string;
  price:[];
  main:number;
}
type Service = {
  id:number;
  name:string;
  description:string;
  prices:{};
}
type Passenger = { name: string; age: number };

type Step1Data = {
  bookingType:string;
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
  discountType:string;
};

type Step2Data = {
  services: Service[];
  extras:ExtraService[];
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
  bookingType:'',
  name: "",
  email: "",
  phone: "",
  airport: defaultAirport,
  flight: "",
  adults: 1,
  children: 0,
  infants: 0,
  numberOfBags: 0,
  date: "",
  time: "",
  extraRequest: "",
  airportSecondary: defaultAirport,
  flightSecondary: "",
  dateSecondary: "",
  timeSecondary: "",
  discountType:"None",
};

// Pinia Store Definition
export const useBookingStore = defineStore("booking", {
  // State
  state: () => ({
    currentStep: 1,
    bookingType: "Arrival",
    bookingReference:"",
    formData: {
      step1: { ...defaultStep1Data },
      step2: { services: [],extras : [] },
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
      this.formData.step1.bookingType=this.bookingType
      let date= this.formData.step1.date
      const d = typeof date === "string" ? new Date(date) : date;

      if (isNaN(d.getTime())) {
        console.error("Invalid date provided to formatDate");
        return "";
      }
    
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      this.formData.step1.date = `${year}-${month}-${day}`
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/create-booking-step1/", this.formData.step1);
        this.bookingReference = response.data.booking_reference;
        console.log("Booking Reference:", this.bookingReference);
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
