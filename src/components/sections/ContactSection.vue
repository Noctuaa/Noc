<script setup>
import { z } from 'zod';
import { reactive, ref } from 'vue';

const contactSchema = z.object({
  firstname: z.string().min(2, 'Minimum 2 caractères.'),
  lastname: z.string().min(2, 'Minimum 2 caractères.'),
  email: z.string().email('Email invalide.'),
  message: z.string().min(10, 'Minimum 10 caractères.'),
});

const form = reactive({
  firstname: '',
  lastname: '',
  email: '',
  message: '',
});

const submitForm = () => {
  const result = contactSchema.safeParse(form);
  if (!result.success) {
    console.log('❌ Erreurs de validation:', result.error.flatten().fieldErrors);
    errors.value = result.error.flatten().fieldErrors;
    isFormSubmitted.value = false;
  } else {
    console.log('✅ Formulaire valide !', result.data);
    errors.value = {};
    isFormSubmitted.value = true;
  }
};

const errors = ref({});
const isFormSubmitted = ref(false);
const isEnvelopeAnimating = ref(false);
</script>

<template>
  <section id="contact" class="section">
    <div class="contact-bg-sphere"></div>

    <div class="container">
      <div class="section-header reverse">
        <h2 class="section-title">Contact</h2>
        <div class="divider"><hr /></div>
        <p class="section-description">Je serais ravi de répondre à vos questions et d'échanger sur vos projets.</p>
      </div>
      <div class="stars">
        <div class="star" style="left: 22%; top: 46%; animation-delay: 2.3262s"></div>
        <div class="star" style="left: 70%; top: 40%; animation-delay: 2.3262s"></div>
        <div class="star" style="left: 55%; top: 43%; animation-delay: 2.3262s"></div>
        <div class="star" style="left: 45%; top: 42%; animation-delay: 2.3262s"></div>
      </div>
      <div class="contact-content box">
        <form @submit.prevent="submitForm" class="form contact-form">
          <div class="d-flex fl-wrap gap-4">
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
            <button type="submit" class="btn btn-gradient" :disabled="isEnvelopeAnimating">
              <span v-if="!isFormSubmitted">Envoyer le message</span>
              <span v-else-if="isEnvelopeAnimating">Envoi en cours...</span>
              <span v-else>Message envoyé !</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style>
.contact-bg-sphere {
  position: fixed;
  bottom: -550px; /* En bas au lieu de top */
  left: 50%; /* Centré horizontalement */
  transform: translateX(-50%); /* Parfaitement centré */
  width: 160%; /* Plus large pour couvrir l'écran */
  height: 1600px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(96, 165, 250, 0.4) 0%,
    transparent 50%,
    rgba(59, 130, 246, 1) 60%,
    rgba(30, 41, 59, 1) 100%
  );

  box-shadow: 0 0 60px 30px #fff, /* inner white */ 0 0 100px 60px #f0f, /* middle magenta */ 0 0 140px 90px #0ff; /* outer cyan */
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
}

/* Section relative pour contenir la bulle */
#contact.section {
  position: relative;
  overflow: hidden; /* Cache les débordements */
}

/* === CONTACT SECTION === */

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-form {
  position: relative;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  max-width: 650px;
  width: 100%;
}

.form {
  padding: 64px 40px;
}

/* === FORM GROUPS === */
.form-group {
  position: relative;
  flex: 1;
  min-width: 200px;
  margin-bottom: 40px;
}

/* Responsive breakpoint */
@media (max-width: 768px) {
  .form-group {
    min-width: 100%; /* Full width sur mobile */
  }
}

.form-label {
  position: absolute;
  top: 15px;
  left: 15px;
  color: var(--color-primary-text);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  z-index: 1;
  transition: all 0.6s ease;
}

.form-input:focus + .form-label,
.form-textarea:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label,
.form-textarea:not(:placeholder-shown) + .form-label {
  top: -22px;
  color: #60a5fa;
  scale: 0.95;
  left: 0px;
}

/* === FORM INPUTS === */
.form-input,
.form-textarea {
  width: 100%;
  padding: var(--spacing-4);
  font-family: inherit;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: var(--border-radius-sm);
  color: var(--color-primary-text);
  font-size: 0.9rem;
  transition: all var(--transition-fast);
  backdrop-filter: blur(10px);
}

.form-input:focus,
input:-webkit-autofill:focus,
.form-textarea:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
}

/* === SUBMIT BUTTON === */
.form-submit {
  outline: none;
  margin-top: var(--spacing-8);
}

.submit-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: var(--border-radius-lg);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: var(--spacing-4) var(--spacing-8);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* === Validation ===*/
/* === ERROR MESSAGES === */

.form-input.error,
.form-textarea.error {
  border-color: #ff6b6b !important;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2) !important;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: var(--spacing-1);
  padding-left: var(--spacing-2);
  font-weight: 500;
  opacity: 0.9;
}

/* Animation d'apparition */
.error-message {
  animation: fadeInError 0.3s ease-out;
}

@keyframes fadeInError {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 0.9;
    transform: translateY(0);
  }
}
</style>
