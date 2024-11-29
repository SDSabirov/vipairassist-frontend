<template>
  <div class="w-full h-full">
    <div class="grid grid-cols-1 md:grid-cols-3 border border-black">
      <!--Left-->
      <div class="col-span-2 flex flex-col px-6 py-8 space-y-8">
        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500 capitalize">
            Booking service for
          </h2>
          <p class="text-xl leading-7">Arrival</p>
        </div>
        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500">Airport</h2>
          <p class="text-xl leading-7">London Heathrow</p>
        </div>
        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500">Flight Number</h2>
          <p class="text-xl leading-7">2</p>
        </div>
        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500">Date</h2>
          <p class="text-xl leading-7">2021-11-28 10:44</p>
        </div>

        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500">Services</h2>
          <p class="text-xl leading-7">Meet&Greet Fast Track</p>
        </div>
        <div class="flex flex-col space-y-6">
          <h2 class="text-xl leading-7 text-gray-500">Total Price</h2>
          <p class="text-xl leading-7">915 USD</p>
        </div>
      </div>

      <div class="flex flex-col px-6 py-8 space-y-8">
        <div class="border-l border-l-black flex flex-col space-y-6 px-12">
            <h2 class="text-xl leading-7 text-gray-500 capitalize">
              Passengers
            </h2>
          <div class="grid grid-cols-3 gap-6">  
            <p class="text-md leading-7 col-span-2">Adults (12+ years)</p>
            <p>1</p>
            
          </div>
          <div class="grid grid-cols-3 gap-6 items-center justify-center">  
            <p class="text-md leading-7 col-span-2">Children (2-11 years)</p>
            <p>1</p>
            
          </div>
          <div class="grid grid-cols-3 gap-6">  
            <p class="text-md leading-7 col-span-2">Infants (0-2 years)</p>
            <p>1</p>  
          </div>
          <FormsPassengerInput />
        </div>
      </div>
    </div>
  </div>
</template>
