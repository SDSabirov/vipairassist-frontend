import { defineStore } from "pinia";
import axios from "~/api/drf";

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
  bookingReference:string;
  services: Service[];
  extras:ExtraService[];
};

type Step3Data = {
  bookingReference:string;
  passengers: Passenger[];
};

type FormData = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
};

type BookingConfirmed = {
  bookingReference:string;
  bookingStatus:string;
  chosenServices:[];
  totalPrice:number;
}
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
  numberOfBags: 1,
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
    totalPrice:0, //value used in step 3 
    extrasTotal:0, //value used in step 
    formData: {
      step1: { ...defaultStep1Data },
      step2: { services: [],extras : [] },
      step3: { passengers: [] },
    },

    //used only at final step
    bookingConfirmed:{
      bookingReference:'',
      bookingStatus:'',
      chosenServices:[],
      totalPrice:0,
    },
    loading: false,
    bookingCompleted: false,
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
    addExtraService(service){
      this.formData.step2.extras.push({ ...service, quantity: 1 });
      
    },
   
    removeExtraService(id) {
      this.formData.step2.extras = this.formData.step2.extras.filter(service => service.id !== id);
    },
    
    // Form Reset
    resetBooking() {
      this.currentStep = 1;
      this.bookingType = "Arrival";
      this.bookingReference = "";
      this.totalPrice = 0;
      this.extrasTotal = 0;
      this.bookingCompleted = false,
      this.formData = {
        step1: { ...defaultStep1Data },
        step2: { services: [], extras: [],},
        step3: { passengers: [] },
      };
      this.bookingConfirmed={
        bookingReference:'',
        bookingStatus:'',
        chosenServices:[],
        totalPrice:0,
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
        if (!this.formData.step1.airport.name) {
          this.errors.airport = "Airport is required.";
          isValid = false;
        }
        // Flight number is optional - removing validation
        if (!this.formData.step1.date) {
          this.errors.date = "Date is required.";
          isValid = false;
        }
        if (!this.formData.step1.time ) {
          this.errors.time = "Time is required.";
          isValid = false;
        }
        if (this.bookingType == 'Transit') {
          if (!this.formData.step1.airportSecondary || !this.formData.step1.airportSecondary.name) {
            this.errors.airportSecondary = "Secondary airport is required.";
            isValid = false;
          }
          // Secondary flight number is optional - removing validation
          if (!this.formData.step1.dateSecondary) {
            this.errors.dateSecondary = "Date is required.";
            isValid = false;
          }
          if (!this.formData.step1.timeSecondary) {
            this.errors.timeSecondary = "Time is required.";
            isValid = false;
          }
        }
      }

      return isValid;
    },

    validateEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    // Helper function to convert date from yyyy-mm-dd to mm/dd/yyyy
    formatDateForAPI(dateString: string): string {
      if (!dateString) return '';
      const [year, month, day] = dateString.split('-');
      return `${month}/${day}/${year}`;
    },

    // API Submission Logic
    async submitStep1() {
      this.loading = true;
      this.formData.step1.bookingType=this.bookingType
      
      // Additional validation before API call
      console.log("Pre-submission validation:");
      console.log("- Name:", this.formData.step1.name);
      console.log("- Email:", this.formData.step1.email);
      console.log("- Phone:", this.formData.step1.phone);
      console.log("- Airport:", this.formData.step1.airport);
      console.log("- Date (original):", this.formData.step1.date);
      console.log("- Time:", this.formData.step1.time);
      console.log("- Booking Type:", this.formData.step1.bookingType);
      
      // Format the data for API submission
      const submissionData = {
        ...this.formData.step1,
        date: this.formatDateForAPI(this.formData.step1.date),
        dateSecondary: this.bookingType === 'Transit' ? this.formatDateForAPI(this.formData.step1.dateSecondary || '') : undefined,
      };
      
      console.log("- Date (formatted for API):", submissionData.date);
      if (submissionData.dateSecondary) {
        console.log("- Secondary Date (formatted for API):", submissionData.dateSecondary);
      }
      
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      try {
        console.log("Submitting Step 1 data to API:", submissionData);
        const response = await axios.post("create-booking-step1/", submissionData);
        
        console.log("Raw API response:", response);
        console.log("API response data:", response.data);
        console.log("API response status:", response.status);
        
        if (response.data && response.data.booking_reference) {
          this.bookingReference = response.data.booking_reference;
          console.log("✅ Booking Reference created successfully:", this.bookingReference);
          console.log("Step 1 submitted successfully:", response.data);
        } else {
          console.error("❌ API response missing booking_reference:", response.data);
          throw new Error("No booking reference returned from API");
        }
        
      } catch (error) {
        console.error("❌ Step 1 submission error:", error);
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        console.error("Error headers:", error.response?.headers);
        
        // Set appropriate error message based on status
        if (error.response?.status === 500) {
          this.error = "Server error. Our team has been notified. Please try again in a few minutes.";
        } else if (error.response?.status === 400) {
          this.error = "Invalid booking data. Please check your information and try again.";
        } else if (error.response?.status === 403) {
          this.error = "Permission denied. Please refresh the page and try again.";
        } else {
          this.error = "Failed to submit booking. Please check your internet connection and try again.";
        }
        
        
        // Re-throw the error so the calling code knows it failed
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async submitStep2() {
      this.loading = true;
      try {
        this.formData.step2.bookingReference = this.bookingReference
        const response = await axios.post("create-booking-step2/", this.formData.step2);
        this.totalPrice = response.data.total_price;
        this.extrasTotal = response.data.extras_total;

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
        this.formData.step3.bookingReference = this.bookingReference;
        const response = await axios.post("create-booking-step3/", this.formData.step3,
        );
        this.bookingConfirmed.bookingReference=response.data.booking_reference;
        this.bookingConfirmed.bookingStatus=response.data.booking_status;
        this.bookingConfirmed.chosenServices=response.data.services;
        this.bookingConfirmed.totalPrice=response.data.total_price;
        if(response.data.booking_status === 'Confirmed')
        {
          this.bookingCompleted =true;
        }
      } catch (error) {
        this.error = "Failed to submit final step.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    // New method for processing payment and finalizing booking
    async processPaymentAndFinalize(paymentData) {
      this.loading = true;
      try {
        console.log("Processing payment and finalizing booking:", paymentData);
        
        // Check if the new endpoint exists, fallback to existing approach if not
        try {
          const response = await axios.post("process-payment-and-finalize/", {
            booking_reference: this.bookingReference,
            payment_method: paymentData.payment_method,
            payment_data: paymentData.payment_data,
            passenger_data: this.formData.step3.passengers
          });
          
          console.log("Payment and booking finalization response:", response.data);
          
          // Update booking confirmed data
          this.bookingConfirmed.bookingReference = response.data.booking_reference;
          this.bookingConfirmed.bookingStatus = response.data.booking_status;
          this.bookingConfirmed.chosenServices = response.data.services;
          this.bookingConfirmed.totalPrice = response.data.total_price;
          
          // Set completion status based on payment result
          if (response.data.payment_status === 'PAID' && response.data.booking_status === 'CONFIRMED') {
            this.bookingCompleted = true;
          }
          
          return response.data;
          
        } catch (endpointError) {
          // Fallback to existing flow if new endpoint doesn't exist
          console.log("New endpoint not available, using existing flow");
          
          // 1. First capture payment using existing endpoint
          const captureResponse = await axios.post("payments/capture-order/", {
            orderID: paymentData.payment_data.orderID
          });
          
          if (captureResponse.status !== 201) {
            throw new Error("Payment capture failed");
          }
          
          // 2. Then submit final step with passenger data
          this.formData.step3.bookingReference = this.bookingReference;
          const bookingResponse = await axios.post("create-booking-step3/", this.formData.step3);
          
          // 3. Update booking confirmed data
          this.bookingConfirmed.bookingReference = bookingResponse.data.booking_reference;
          this.bookingConfirmed.bookingStatus = bookingResponse.data.booking_status;
          this.bookingConfirmed.chosenServices = bookingResponse.data.services;
          this.bookingConfirmed.totalPrice = bookingResponse.data.total_price;
          
          if (bookingResponse.data.booking_status === 'Confirmed') {
            this.bookingCompleted = true;
          }
          
          return {
            success: true,
            payment_status: 'PAID',
            booking_status: bookingResponse.data.booking_status,
            booking_reference: bookingResponse.data.booking_reference
          };
        }
        
      } catch (error) {
        console.error("Payment processing error:", error);
        this.error = "Failed to process payment. Please try again.";
        throw error;
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
