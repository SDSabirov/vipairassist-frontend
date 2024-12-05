<template>
    <div class="flex items-center space-x-6">
      <!-- Arrival -->
      <div
        @click="changeType('Arrival')"
        class="flex items-center justify-center py-4 cursor-pointer border border-black px-6 w-full py-2"
        :class="modelValue === 'Arrival' ? 'bg-black/80' : 'bg-white'"
      >
        
        <h3
          class="text-xl whitespace-nowrap"
          :class="modelValue === 'Arrival' ? 'text-white' : 'text-black'"
        >
          Meet & Greet, Fastrack
        </h3>
      </div>
      
      <div
        @click="changeType('Arrival')"
        class="flex items-center justify-center py-4 cursor-pointer border border-black px-6 w-full py-2"
        :class="modelValue === 'Arrival' ? 'bg-black/80' : 'bg-white'"
      >
        
        <h3
          class="text-xl whitespace-nowrap"
          :class="modelValue === 'Arrival' ? 'text-white' : 'text-black'"
        >
          Meet & Greet, Fastrack
        </h3>
      </div>
  
      <div
        @click="changeType('Arrival')"
        class="flex items-center justify-center py-4 cursor-pointer border border-black px-6 w-full py-2"
        :class="modelValue === 'Arrival' ? 'bg-black/80' : 'bg-white'"
      >
        
        <h3
          class="text-xl whitespace-nowrap"
          :class="modelValue === 'Arrival' ? 'text-white' : 'text-black'"
        >
          Meet & Greet, Fastrack
        </h3>
      </div>
      
    </div>
  </template>
  
  <script setup>
  defineProps(["modelValue"]);
  const emit = defineEmits(["update:modelValue"]);
  
  const changeType = (type) => {
    emit("update:modelValue", type);
  };
  </script>
  
  <style lang="css" scoped>
  .icon-default {
    filter: brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%)
      hue-rotate(0deg) brightness(100%) contrast(100%);
  }
  
  .icon-active {
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
      hue-rotate(0deg) brightness(100%) contrast(100%);
  }
  </style>