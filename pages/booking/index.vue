<template>
    <div>
        <navbar />
        <BookingBackground/>
        <div class="flex flex flex-col w-full items-center justify-center relative h-screen ">
            <h1 class="text-4xl md:text-6xl text-white absolute top-1/3">Start Your Booking</h1>
            
        </div>
        <section class="flex flex flex-col w-full items-center justify-center relative bg-white px-2 md:px-0">
            <div class="relative -top-[450px]">
                <FormsBookingForm />
            </div>
        </section>
        <Footer />
    </div>
</template>


<script setup>
import BookingForm from '~/components/Forms/BookingForm.vue';


</script>

