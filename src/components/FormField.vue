<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  type?: string;
  as?: 'input' | 'textarea';
  placeholder?: string;
  modelValue: string;
  error?: string[];
  rows?: number;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  as: 'input',
  rows: 6,
});

defineEmits<{
  'update:modelValue': [value: string];
  blur: [];
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="text-sm ink-2 font-medium">
      <span>{{ label }}</span>
    </label>
    <div class="relative">
      <span class="form-icon absolute ink-3 pe-none" aria-hidden="true"><slot name="icon" /></span>
      <component
        :is="as"
        :id="id"
        :name="id"
        :type="as === 'input' ? type : undefined"
        :rows="as === 'textarea' ? rows : undefined"
        :placeholder="placeholder"
        :value="modelValue"
        autocomplete="off"
        :class="[
          as === 'textarea' ? 'form-textarea' : 'form-input',
          { error },
          'w-full text-base ink-1 rounded-sm border-sub ',
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
      />
    </div>
    <div v-if="error" class="error-message relative flex ai-center gap-2 px-3 text-sm font-medium ow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 512 512"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-192a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.6 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"
        />
      </svg>
      <span>{{ error[0] }}</span>
    </div>
  </div>
</template>
