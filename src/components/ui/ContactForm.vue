<script setup>
import { z } from 'zod';
import { reactive, ref } from 'vue';

const errors = ref({}); //Form validation errors
const isFormSubmitted = ref(false); // Form submission status
const isEnvelopeAnimating = ref(false); // Email sending animation status

/**
 * Zod validation schema for contact form data
 * @type {z.ZodObject}
 */
const contactSchema = z.object({
  firstname: z.string().min(2, 'Minimum 2 caractères.'),
  lastname: z.string().min(2, 'Minimum 2 caractères.'),
  email: z.string().email('Email invalide.'),
  message: z.string().min(10, 'Minimum 10 caractères.'),
});

/**
 * Reactive form data object
 * @type {Object}
 * @property {string} firstname - User's first name
 * @property {string} lastname - User's last name
 * @property {string} email - User's email address
 * @property {string} message - User's message
 */
const form = reactive({
  firstname: '',
  lastname: '',
  email: '',
  message: '',
});

/**
 * Validates contact form data using Zod schema
 * @returns {Object|null} Validated data or null if invalid
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
 * Sends form data to API endpoint
 * @param {Object} validData - Validated form data
 * @returns {Promise<Object>} API response
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
 * Handles form submission with validation and API call
 * @returns {Promise<void>}
 */
const submitForm = async () => {
  const validData = validateForm();
  if (!validData) return;

  try {
    isEnvelopeAnimating.value = true;
    await sendToAPI(validData);

    console.log('✅ Email envoyé !');
    isFormSubmitted.value = true;
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    isEnvelopeAnimating.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="form-row d-flex fl-wrap">
      <div class="form-group">
        <input
          id="lastname"
          v-model="form.lastname"
          placeholder=""
          type="text"
          :class="['form-input', { error: errors.lastname }]"
        />
        <label for="lastname" class="form-label">
          <span>Nom</span>
        </label>
        <div v-if="errors.lastname" class="error-message">{{ errors.lastname[0] }}</div>
      </div>
      <div class="form-group">
        <input
          id="firstname"
          v-model="form.firstname"
          placeholder=""
          type="text"
          :class="['form-input', { error: errors.firstname }]"
        />
        <label for="firstname" class="form-label">
          <span>Prénom</span>
        </label>
        <div v-if="errors.firstname" class="error-message">{{ errors.firstname[0] }}</div>
      </div>
    </div>
    <div class="form-group">
      <input
        id="email"
        v-model="form.email"
        placeholder=""
        type="email"
        :class="['form-input', { error: errors.email }]"
      />
      <label for="email" class="form-label">
        <span>Email</span>
      </label>
      <div v-if="errors.email" class="error-message">{{ errors.email[0] }}</div>
    </div>
    <div class="form-group textarea-box">
      <textarea
        id="message"
        v-model="form.message"
        placeholder=""
        :class="['form-textarea', { error: errors.message }]"
        rows="10"
      ></textarea>
      <label for="message" class="form-label">
        <span>Message</span>
      </label>
      <div v-if="errors.message" class="error-message">{{ errors.message[0] }}</div>
    </div>
    <div class="form-submit d-flex jc-center ai-center">
      <button type="submit" class="btn btn-outline" :disabled="isEnvelopeAnimating">
        <span v-if="!isFormSubmitted">Envoyer</span>
        <span v-else-if="isEnvelopeAnimating">Envoi en cours...</span>
        <span v-else>Message envoyé !</span>
      </button>
    </div>
  </form>
</template>
