<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Arrival -->
    <div
      @click="changeType('Arrival')"
      class="flex items-center justify-center py-4 cursor-pointer border border-black space-x-6"
      :class="currentType === 'Arrival' ? 'bg-black/80' : 'bg-white'"
    >
      <img
        src="/assets/images/icons/arrival.svg"
        alt="arrival icon"
        :class="currentType === 'Arrival' ? 'icon-active' : 'icon-default'"
      />
      <h3
        class="text-lg"
        :class="currentType === 'Arrival' ? 'text-white' : 'text-black'"
      >
        Arrival
      </h3>
    </div>

    <!-- Departure -->
    <div
      @click="changeType('Departure')"
      class="flex items-center justify-center py-4 cursor-pointer border border-black space-x-6"
      :class="currentType === 'Departure' ? 'bg-black/80' : 'bg-white'"
    >
      <img
        src="/assets/images/icons/departure.svg"
        alt="departure icon"
        :class="currentType === 'Departure' ? 'icon-active' : 'icon-default'"
      />
      <h3
        class="text-lg"
        :class="currentType === 'Departure' ? 'text-white' : 'text-black'"
      >
        Departure
      </h3>
    </div>

    <!-- Transit -->
    <div
      @click="changeType('Transit')"
      class="flex items-center justify-center py-4 cursor-pointer border border-black space-x-6"
      :class="currentType === 'Transit' ? 'bg-black/80' : 'bg-white'"
    >
      <img
        src="/assets/images/icons/transit.svg"
        alt="transit icon"
        :class="currentType === 'Transit' ? 'icon-active' : 'icon-default'"
      />
      <h3
        class="text-lg"
        :class="currentType === 'Transit' ? 'text-white' : 'text-black'"
      >
        Transit
      </h3>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Track the current type
const currentType = ref("Arrival");

const changeType = (type) => {
  currentType.value = type;
};
</script>

<style>
.icon-default {
  filter: brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%)
    hue-rotate(0deg) brightness(100%) contrast(100%);
}

.icon-active {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
    hue-rotate(0deg) brightness(100%) contrast(100%);
}
</style>
