<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
    <!-- Arrival -->
    <div
      @click="changeType('Arrival')"
      class="flex items-center justify-center py-4 cursor-pointer border border-black space-x-6 w-full"
      :class="modelValue === 'Arrival' ? 'bg-black/80' : 'bg-white'"
    >
      <img
        src="/assets/images/icons/arrival.svg"
        alt="arrival icon"
        :class="modelValue === 'Arrival' ? 'icon-active' : 'icon-default'"
      />
      <h3
        class="text-lg"
        :class="modelValue === 'Arrival' ? 'text-white' : 'text-black'"
      >
        Arrival
      </h3>
    </div>

    <!-- Departure -->
    <div
      @click="changeType('Departure')"
      class="flex items-center justify-center py-4 cursor-pointer border border-black space-x-6 w-full"
      :class="modelValue === 'Departure' ? 'bg-black/80' : 'bg-white'"
    >
      <img
        src="/assets/images/icons/departure.svg"
        alt="departure icon"
        :class="modelValue === 'Departure' ? 'icon-active' : 'icon-default'"
      />
      <h3
        class="text-lg"
        :class="modelValue === 'Departure' ? 'text-white' : 'text-black'"
      >
        Departure
      </h3>
    </div>

    <!-- Transit -->
    <div
      @click="changeType('Transit')"
      class="flex items-center justify-center py-4 cursor-pointer border border-black space-x-6 w-full"
      :class="modelValue === 'Transit' ? 'bg-black/80' : 'bg-white'"
    >
      <img
        src="/assets/images/icons/transit.svg"
        alt="transit icon"
        :class="modelValue === 'Transit' ? 'icon-active' : 'icon-default'"
      />
      <h3
        class="text-lg"
        :class="modelValue === 'Transit' ? 'text-white' : 'text-black'"
      >
        Transit
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