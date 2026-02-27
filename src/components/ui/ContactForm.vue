<script setup>
import { z } from 'zod';
import { reactive, ref } from 'vue';

const errors = ref({});
const isFormSubmitted = ref(false);
const isEnvelopeAnimating = ref(false);

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

const submitForm = async () => {
  const validData = validateForm();
  if (!validData) return;

  try {
    isEnvelopeAnimating.value = true;
    await sendToAPI(validData);
    isFormSubmitted.value = true;
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    isEnvelopeAnimating.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submitForm" class="form" autocomplete="off">
    <div class="form-group">
      <input
        id="name"
        name="name"
        v-model="form.name"
        placeholder=""
        type="text"
        autocomplete="off"
        :class="['form-input', { error: errors.name }]"
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

    <div class="form-group select-group">
      <select
        id="subject"
        name="subject"
        v-model="form.subject"
        required
        :class="['form-select', { error: errors.subject }]"
      >
        <option value="" disabled></option>
        <option value="vitrine">Site vitrine</option>
        <option value="integration">Intégration web</option>
        <option value="refonte">Refonte de site</option>
        <option value="autre">Autre</option>
      </select>
      <label for="subject" class="form-label"><span>Sujet</span></label>
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

    <div class="form-submit d-flex jc-center ai-center">
      <button type="submit" class="btn btn-submit" :disabled="isEnvelopeAnimating">
        <span v-if="!isFormSubmitted">Envoyer</span>
        <span v-else-if="isEnvelopeAnimating">Envoi en cours...</span>
        <span v-else>Message envoyé !</span>
      </button>
    </div>
  </form>
</template>

<style src="../../assets/styles/components/form.css"></style>
