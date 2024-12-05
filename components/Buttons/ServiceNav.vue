<template>
  <div class="flex items-center space-x-6">
    <!-- Service Items -->
    <div
      v-for="(service, index) in modelValue"
      :key="index"
      @click="changeService(service)"
      class="flex items-center justify-center py-4 cursor-pointer border border-black px-6 w-full py-2"
      :class="service === selectedService ? 'bg-black/80' : 'bg-white'"
    >
      <h3
        class="text-xl whitespace-nowrap"
        :class="service === selectedService ? 'text-white' : 'text-black'"
      >
        {{ service.name }}
      </h3>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  selectedService: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:selectedService"]);

const changeService = (service) => {
  emit("update:selectedService", service); // Notify parent of the change
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
