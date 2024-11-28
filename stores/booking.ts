import { defineStore } from 'pinia';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    currentStep: 1,
    bookingType: 'Arrival',
    formData: {
        step1:{
            name:'',
            email:'',
            phone:'',
            airport:'',
            flight:'',
            adults:null,
            children:null,
            infants:null,
            numberOfBags:null,
            date:'',
            time:'',
            //for transit booking
            airportSecondary:'',
            flightSecondary:'',
            dateSecondary:'',
            timeSecondary:'',
            
            },
          step2:{
            services:[],
          },
          step3:{
            passengers:[],
          }
    },
  }),
  actions: {
    nextStep() {
      if (this.currentStep < 3) this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
    updateBookingType(type: string) {
      this.bookingType = type;
    },
    updateFormData(section: string, data: any) {
      this.formData[section] = { ...this.formData[section], ...data };
    },
  },
});