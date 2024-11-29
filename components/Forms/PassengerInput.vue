<template>
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="(passenger, index) in passengers"
        :key="index"
        class="flex items-center col-span-3"
      >
        <!-- Passenger Name or Input Field -->
        <div class="col-span-2 w-full">
          <div v-if="editingIndex === index || !passenger.name" class="flex items-center space-x-2">
            <input
              v-model="passenger.name"
              type="text"
              placeholder="Enter Passenger Name"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
              @click="confirmName(index)"
              class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
          <p v-else class="text-gray-800">{{ passenger.name }}</p>
        </div>
  
        <!-- Edit Icon with Tooltip -->
        <div
          v-if="passenger.name"
          class="relative flex justify-center items-center"
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
  import { ref } from "vue";
  
  // Initialize passenger data
  const passengers = ref([
    { name: "" }, // Empty passenger for initial input
    { name: "" },
    { name: "" },
  ]);
  
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
    if (passengers.value[index].name.trim() !== "") {
      editingIndex.value = null; // Exit edit mode
    }
  };
  </script>
  