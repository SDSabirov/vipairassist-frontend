<template>
  <div class="w-full">
    <form action="/" class="w-full">
      <div class="grid grid-cols-1 grid-cols-2 gap-4 w-full">
        <div class="flex flex-col w-full h-full">
          <FormsAirportSearch />
        </div>

        <div class="flex w-full bg-gray-200 p-3 space-x-6">
          <FormsDatepicker />
          <FormsTimepicker />
        </div>
        <div class="relative h-full">
            <!-- Input Field -->
            <input
              type="text"
              placeholder="Flight Number"
              class="w-full h-full p-3 bg-gray-200 text-gray-600 text-sm focus:outline-none focus:ring focus:ring-black"
            />
            <!-- Suggestions Dropdown -->
            
          </div>
        <div class="flex w-full h-full">
            <FormsPassengerSelector/>
        </div>
      </div>
      <div class="flex w-full items-center justify-center py-6">
        <ButtonsNextTransparent />
      </div>
    </form>
  </div>
</template>
