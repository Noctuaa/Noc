<script setup>
import { z } from 'zod';
import { reactive, ref } from 'vue';

const errors = ref({});
const isFormSubmitted = ref(false);
const isLoading = ref(false);
const serverError = ref('');

const contactSchema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères.'),
  email: z.string().email('Email invalide.'),
  subject: z.enum(['vitrine', 'integration', 'refonte', 'autre'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un type de projet.' }),
  }),
  message: z.string().min(10, 'Minimum 10 caractères.'),
});

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

/**
 * Clears the error for a given field when the user starts typing again.
 * @param {string} field - The field name to clear the error for.
 */
const clearError = (field) => {
  if (errors.value[field]) delete errors.value[field];
};

/**
 * Validates a single field on blur for immediate feedback.
 * @param {string} field - The field name to validate.
 */
const validateField = (field) => {
  if (!form[field]) return; // Empty field = not yet entered, let it pass
  const result = contactSchema.shape[field].safeParse(form[field]);
  if (!result.success) {
    errors.value[field] = result.error.errors.map((e) => e.message);
  }
};

/**
 * Validates the entire form before submission.
 * @returns {Object|null} The validated data, or null if validation fails.
 */
const validateForm = () => {
  const result = contactSchema.safeParse(form);
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors;
    return null;
  } else {
    errors.value = {};
    return result.data;
  }
};

/**
 * Sends validated form data to the API endpoint.
 * @param {Object} validData - The validated form data to send.
 * @returns {Promise<Object>} The API response data.
 * @throws {Error} If the API returns a non-success response.
 */
const sendToAPI = async (validData) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validData),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Erreur API');
  }

  return data;
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
    Object.assign(form, { name: '', email: '', subject: '', message: '' });
  } catch (error) {
    serverError.value = 'Une erreur est survenue, veuillez réessayer.';
    console.error('❌ Erreur:', error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submitForm" class="form" autocomplete="off" novalidate>
    <div class="form-group">
      <input
        id="name"
        name="name"
        v-model="form.name"
        placeholder=""
        type="text"
        autocomplete="off"
        :class="['form-input', { error: errors.name }]"
        @blur="validateField('name')"
        @input="clearError('name')"
      />
      <label for="name" class="form-label"><span>Nom complet</span></label>
      <div v-if="errors.name" class="error-message">
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
        <span>{{ errors.name[0] }}</span>
      </div>
    </div>

    <div class="form-group">
      <input
        id="email"
        name="email"
        v-model="form.email"
        placeholder=""
        type="email"
        autocomplete="off"
        :class="['form-input', { error: errors.email }]"
        @blur="validateField('email')"
        @input="clearError('email')"
      />
      <label for="email" class="form-label"><span>Email</span></label>
      <div v-if="errors.email" class="error-message">
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
        <span>{{ errors.email[0] }}</span>
      </div>
    </div>

    <div :class="['form-group select-group', { 'has-value': form.subject }]">
      <select
        id="subject"
        name="subject"
        v-model="form.subject"
        :class="['form-select', { error: errors.subject }]"
        @change="clearError('subject')"
      >
        <option disabled value=""></option>
        <option value="vitrine">Site vitrine</option>
        <option value="integration">Intégration web</option>
        <option value="refonte">Refonte de site</option>
        <option value="autre">Autre</option>
      </select>
      <label for="subject" :class="['form-label', { 'is-active': form.subject }]">
        <span>Sujet</span>
      </label>

      <div v-if="errors.subject" class="error-message">
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
        <span>{{ errors.subject[0] }}</span>
      </div>
    </div>

    <div class="form-group textarea-box">
      <textarea
        id="message"
        name="message"
        v-model="form.message"
        placeholder=""
        :class="['form-textarea', { error: errors.message }]"
        @blur="validateField('message')"
        @input="clearError('message')"
        rows="6"
      ></textarea>
      <label for="message" class="form-label"><span>Message</span></label>
      <div v-if="errors.message" class="error-message">
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
        <span>{{ errors.message[0] }}</span>
      </div>
    </div>

    <p v-if="serverError" class="server-error">{{ serverError }}</p>

    <div class="form-submit d-flex jc-center ai-center">
      <button type="submit" class="btn btn-outline" :disabled="isLoading">
        <span v-if="isLoading">Envoi en cours...</span>
        <span v-else-if="isFormSubmitted">Message envoyé !</span>
        <span v-else>Envoyer</span>
      </button>
    </div>
  </form>
</template>

<style src="../../assets/styles/components/form.css"></style>
