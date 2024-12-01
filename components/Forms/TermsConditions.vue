<template>
  <div class="flex flex-col items-center justify-start p-2 w-full  bg-gray-200 mt-6">
    <h2 class="text-black text-lg text-center">Terms & Condition</h2>
    <ul
      class="text-start py-6 gap-8 flex flex-col px-5 bg-gray-200 w-full max-h-[300px] list-disc overflow-y-auto"
    >
      <li v-for="point,index in modelValue.split('\n')" :key="index">
        {{point}}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => [],
  },
});

</script>