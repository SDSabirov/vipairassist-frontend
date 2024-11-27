<script setup lang="ts"></script>

<template>
  <div class="w-full h-full mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 border border-black">
      <!--Description i.e left side-->
      <div class="col-span-2 flex flex-col px-6 py-8">
        <h2 class="text-2xl leading-7">Meet&Greet Fast Track</h2>
        <ul class="mt-5 list-disc px-[12px] space-y-4">
          <li class="text-lg leading-6 text-[#858383]">
            Personalized Meet and Greet: Our agent will monitor the status of
            your flight and will be waiting for you with a sign board at the end
            of the airbridge, at immigration, or at the entrance of the terminal
            (depending on aircraft parking position), before passport control
            and customs.
          </li>
          <li class="text-lg leading-6 text-[#858383]">
            Expedited Passport Control and Customs: The agent will fast-track
            through immigration and security.
          </li>
          <li class="text-lg leading-6 text-[#858383]">
            The agent will escort you to the baggage claim hall and help with
            retrieval of your bags
          </li>
          <li class="text-lg leading-6 text-[#858383]">
            Seamless Baggage Claim Assistance: Porter services can be
            prearranged in case if any help with carrying baggage is needed.
          </li>
          <li class="text-lg leading-6 text-[#858383]">
            Arrival Hall or Driver Connection: You will be accommodated at the
            arrival hall or to your driver (the meeting point will be
            prearranged with your driver beforehand)
          </li>
        </ul>
        <FormsExtraServicesSelect />
        <FormsTermsConditions />
      </div>

      <!--Right Side-->
      <div class="flex flex-col px-6 py-8">
        <h2 class="text-2xl leading-7">Prices</h2>
        <div class="flex flex-col">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            Adults (12+ years)
          </h3>
          <ul class="list-disc px-8">
            <li>420.00</li>
          </ul>
        </div>
        <div class="flex flex-col">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            Each subsequent passenger
          </h3>
          <ul class="list-disc px-8">
            <li>420.00</li>
          </ul>
        </div>
        <div class="flex flex-col">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            Children (2-11 years)
          </h3>
          <ul class="list-disc px-8">
            <li>Free</li>
          </ul>
        </div>
        <div class="flex flex-col border-b-2 border-b-black pb-4">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            Infants (0-2 years)
          </h3>
          <ul class="list-disc px-8">
            <li>Free</li>
          </ul>
        </div>
        <h2 class="text-2xl leading-7 pt-4">420 USD</h2>
        <!--Total Price-->
        <div class="flex flex-col">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            You have selected
          </h3>

          <div class="grid grid-cols-2 gap-2 mt-2">
            <p class="text-md leading-6 text-gray-700">Adults(12+ years)</p>
            <p>1</p>
            <p class="text-md leading-6 text-gray-700">Children</p>
            <p>1</p>
            <p class="text-md leading-6 text-gray-700">Total passengers</p>
            <p>1</p>
          </div>
        </div>
        <!--Extras-->
        <div class="flex flex-col">
          <h3 class="mt-5 text-md leading-[157%] text-gray-500">
            Extra Services added
          </h3>

          <div class="grid grid-cols-2 gap-2 mt-2">
            <p class="text-md leading-6 text-gray-700">Chauffer</p>
            <p>1</p>
            <p class="text-md leading-6 text-gray-700">Porter</p>
            <p>1</p>
          </div>
        </div>
        <!--Select Button-->
        <div class="flex w-full mt-6">
          <button
            class="relative flex flex-col items-center justify-center py-3 text-black border border-black text-2xl leading-[108%] group overflow-hidden w-full"
          >
            <span
              class="absolute inset-0 w-0 bg-black/70 transition-all duration-500 ease-in-out group-hover:w-full"
            ></span>
            <div
              class="flex items-center justify-center space-x-4 relative z-10 transition-colors duration-500 group-hover:text-white"
            >
              <p>Select</p>
              <i class="bx bx-right-arrow-alt"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
