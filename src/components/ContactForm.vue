<script setup lang="ts">
import { actions } from 'astro:actions';
import { contactSchema, type ContactData } from '../schemas/contact';
import { reactive, ref, nextTick } from 'vue';
import FormField from './FormField.vue';

const errors = ref<Record<string, string[]>>({});
const isFormSubmitted = ref(false);
const isLoading = ref(false);
const serverError = ref('');

const form = reactive<Record<string, string>>({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
  website: '', // honeypot anti-spam — ne doit jamais être rempli par un humain
});

/**
 * Clears the error for a given field when the user starts typing again.
 * @param field - The field name to clear the error for.
 */
const clearError = (field: string) => {
  if (errors.value[field]) delete errors.value[field];
};

/**
 * Validates a single field on blur for immediate feedback.
 * @param field - The field name to validate.
 */
const validateField = (field: string) => {
  if (!form[field]) return; // Empty field = not yet entered, let it pass
  const result = (contactSchema.shape as Record<string, any>)[field].safeParse(form[field]);
  if (!result.success) {
    errors.value[field] = result.error.errors.map((e: { message: string }) => e.message);
  }
};

/**
 * Validates the entire form before submission.
 * @returns The validated data, or null if validation fails.
 */
const validateForm = () => {
  const result = contactSchema.safeParse(form);
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors;
    nextTick(() => (window as any).lenis?.resize());
    return null;
  } else {
    errors.value = {};
    return result.data;
  }
};

/**
 * Sends validated form data via Astro Action.
 * @param validData - The validated form data to send.
 * @throws {Error} If the Action returns an error.
 */
const sendToAPI = async (validData: ContactData) => {
  const { error } = await actions.contact(validData);
  if (error) {
    throw new Error(error.message || 'Erreur Action');
  }
};

/**
 * Handles form submission: validates, sends data and manages UI states.
 */
const submitForm = async () => {
  const validData = validateForm();
  if (!validData) return;

  serverError.value = '';
  isLoading.value = true;

  try {
    await sendToAPI(validData);
    isFormSubmitted.value = true;
    Object.assign(form, { firstName: '', lastName: '', email: '', subject: '', message: '', website: '' });
    setTimeout(() => {
      isFormSubmitted.value = false;
    }, 6000);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Erreur inconnue');
    serverError.value = 'Une erreur est survenue, veuillez réessayer.';
    console.error('❌ Erreur:', err.message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="form relative flex flex-col gap-6 mi-auto rounded-sm border-sub"
    autocomplete="off"
    novalidate
  >
    <p class="text-sm ink-3">Tous les champs sont obligatoires.</p>

    <div class="form-row grid gap-6">
      <FormField
        id="lastName"
        label="Nom"
        placeholder="Dupont"
        :model-value="form.lastName"
        :error="errors.lastName"
        @update:model-value="
          (v) => {
            form.lastName = v;
            clearError('lastName');
          }
        "
        @blur="validateField('lastName')"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="8" r="5"></circle>
            <path d="M20 21a8 8 0 0 0-16 0"></path>
          </svg>
        </template>
      </FormField>

      <FormField
        id="firstName"
        label="Prénom"
        placeholder="Jean"
        :model-value="form.firstName"
        :error="errors.firstName"
        @update:model-value="
          (v) => {
            form.firstName = v;
            clearError('firstName');
          }
        "
        @blur="validateField('firstName')"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="8" r="5"></circle>
            <path d="M20 21a8 8 0 0 0-16 0"></path>
          </svg>
        </template>
      </FormField>
    </div>

    <FormField
      id="email"
      label="Email"
      type="email"
      placeholder="jean.dupont@exemple.fr"
      :model-value="form.email"
      :error="errors.email"
      @update:model-value="
        (v) => {
          form.email = v;
          clearError('email');
        }
      "
      @blur="validateField('email')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        </svg>
      </template>
    </FormField>

    <FormField
      id="subject"
      label="Sujet"
      placeholder="Refonte de site vitrine"
      :model-value="form.subject"
      :error="errors.subject"
      @update:model-value="
        (v) => {
          form.subject = v;
          clearError('subject');
        }
      "
      @blur="validateField('subject')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
          ></path>
          <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
        </svg>
      </template>
    </FormField>

    <FormField
      id="message"
      label="Message"
      as="textarea"
      placeholder="Décrivez votre projet..."
      :rows="6"
      :model-value="form.message"
      :error="errors.message"
      @update:model-value="
        (v) => {
          form.message = v;
          clearError('message');
        }
      "
      @blur="validateField('message')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
          ></path>
        </svg>
      </template>
    </FormField>

    <div class="honeypot" aria-hidden="true">
      <label for="website">Laissez ce champ vide</label>
      <input id="website" name="website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
    </div>

    <p v-if="serverError" class="server-error flex-center text-sm">{{ serverError }}</p>

    <div class="flex-center mt-2">
      <button
        type="submit"
        :class="[
          'btn-primary btn-submit z-1 relative py-3 px-6 ink-1 text-sm font-semibold ow-hidden rounded-sm',
          { 'is-submitted': isFormSubmitted },
        ]"
        :disabled="isLoading"
      >
        <span v-if="isLoading">Envoi en cours...</span>
        <span v-else-if="isFormSubmitted" class="form-submitted flex-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 512 512"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M173.9 439.4l-166.4-166.4c-10-10-10-26.2 0-36.2l36.2-36.2c10-10 26.2-10 36.2 0L192 312.7 432.1 72.6c10-10 26.2-10 36.2 0l36.2 36.2c10 10 10 26.2 0 36.2l-294.4 294.4c-10 10-26.2 10-36.2 0z"
            />
          </svg>
          Message envoyé !
        </span>
        <span v-else>Envoyer ></span>
      </button>
    </div>
  </form>
</template>
