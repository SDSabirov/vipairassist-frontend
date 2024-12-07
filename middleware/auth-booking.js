export default defineNuxtRouteMiddleware((to, from) => {
    const bookingStore = useBookingStore();
  
    // Check if booking is completed
    if (!bookingStore.bookingCompleted) {
      console.log("Redirecting to /booking...");
      return navigateTo("/booking");
    }
  });