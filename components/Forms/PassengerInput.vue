<template>
  <div class="grid grid-cols-3 gap-5">
    <!-- Reminder for Passenger Names -->
    <label
      class="col-span-3 text-red-500 text-lg"
      v-if="totalPassengers !== bookingStore.formData.step3.passengers.length"
    >
      Please enter the names of all passengers before proceeding
    </label>

    <!-- Passenger Input Fields -->
    <div
      v-for="(passenger, index) in totalPassengers"
      :key="index"
      class="flex items-center col-span-3"
    >
      <div class="col-span-3 w-full">
        <!-- Input or Display Passenger Name -->
        <div
          v-if="editingIndex === index || !bookingStore.formData.step3.passengers[index]?.name"
          class="flex flex-col items-start space-y-2"
        >
          <label>Passenger Name</label>
          <div class="flex items-center space-x-4">
            <input
              v-model="bookingStore.formData.step3.passengers[index].name"
              type="text"
              placeholder="Enter Passenger Name"
              class="w-full p-2 border border-gray-300"
            />
            <button
              @click="confirmName(index)"
              class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>
        <!-- Display Passenger Name -->
        <p
          v-else
          class="text-gray-800 text-lg"
        >
          {{ bookingStore.formData.step3.passengers[index]?.name }}
        </p>
      </div>

      <!-- Edit Icon with Tooltip -->
      <div
        v-if="bookingStore.formData.step3.passengers[index]?.name"
        class="relative flex justify-center items-center text-xl h-full"
        @mouseover="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <i
          class="bx bx-edit text-gray-600 cursor-pointer"
          @click="toggleEdit(index)"
        ></i>
        <span
          v-if="hoveredIndex === index"
          class="absolute bottom-full mb-2 text-xs bg-black text-white px-2 py-1 rounded"
        >
          Edit
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();

// Calculate total passengers
let totalPassengers =
  bookingStore.formData.step1.adults +
  bookingStore.formData.step1.children +
  bookingStore.formData.step1.infants;

// Ensure passengers array in Step 3 matches totalPassengers count
if (bookingStore.formData.step3.passengers.length < totalPassengers) {
  for (
    let i = bookingStore.formData.step3.passengers.length;
    i < totalPassengers;
    i++
  ) {
    bookingStore.formData.step3.passengers.push({ name: "" });
  }
}

// Automatically add Step 1 name as the first passenger
if (bookingStore.formData.step1.name) {
  bookingStore.formData.step3.passengers[0] = {
    name: bookingStore.formData.step1.name,
  };
}

// Track the currently editing index
const editingIndex = ref(null);

// Track the currently hovered index for tooltip
const hoveredIndex = ref(null);

// Toggle edit mode
const toggleEdit = (index) => {
  editingIndex.value = index;
};

// Confirm the entered name
const confirmName = (index) => {
  const passenger = bookingStore.formData.step3.passengers[index];
  if (passenger.name.trim() !== "") {
    editingIndex.value = null; // Exit edit mode
  }
};

// Watch Step 1 name to update the first passenger dynamically
watch(
  () => bookingStore.formData.step1.name,
  (newName) => {
    if (newName && !bookingStore.formData.step3.passengers[0].name) {
      bookingStore.formData.step3.passengers[0].name = newName;
    }
  }
);
</script>
