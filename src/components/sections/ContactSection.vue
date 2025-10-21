<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  firstname: '',
  lastname: '',
  email: '',
  message: '',
});
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="section-header reverse">
        <h2 class="section-title">Contact</h2>
        <div class="divider"><hr /></div>
        <p class="section-description">Je serais ravi de répondre à vos questions et d'échanger sur vos projets.</p>
      </div>
      <div class="contact-content box">
        <form @submit.prevent="submitForm" class="form contact-form">
          <div class="d-flex fl-wrap gap-4">
            <div class="form-group">
              <label for="lastname" class="form-label">
                <span>Nom</span>
              </label>
              <input id="lastname" v-model="form.lastname" type="text" class="form-input" required />
            </div>
            <div class="form-group">
              <label for="firstname" class="form-label">
                <span>Prénom</span>
              </label>
              <input id="firstname" v-model="form.firstname" type="text" class="form-input" required />
            </div>
          </div>
          <div class="form-group">
            <label for="email" class="form-label">
              <span>Email</span>
            </label>
            <input id="email" v-model="form.email" type="email" class="form-input" required />
          </div>
          <div class="form-group textarea-box">
            <label for="message" class="form-label">
              <span>Message</span>
            </label>
            <textarea id="message" v-model="form.message" class="form-textarea" rows="10" required></textarea>
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

<style scoped>
/* === CONTACT SECTION === */

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-form {
  max-width: 800px;
  width: 100%;
}

.form {
  padding: var(--spacing-8);
}

/* === FORM GROUPS === */
.form-group {
  position: relative;
  flex: 1;
  min-width: 200px;
  margin-bottom: var(--spacing-6);
}

/* Responsive breakpoint */
@media (max-width: 768px) {
  .form-group {
    min-width: 100%; /* Full width sur mobile */
  }
}

.form-label {
  position: relative;
  color: var(--color-primary-text);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: var(--spacing-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 1;
}

.form-label span {
  position: absolute;
  top: -25px;
  left: 20px;
  padding: 0px 20px;
  background: #1d203e;
  border-radius: 16px;
  height: 9px;
}

.textarea-box .form-label span {
  top: -248px;
}

/* === FORM INPUTS === */
.form-input,
.form-textarea {
  width: 100%;
  padding: var(--spacing-4);
  background: #1d203e;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-sm);
  color: var(--color-primary-text);
  font-size: 1rem;
  transition: all var(--transition-fast);
  backdrop-filter: blur(10px);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.6);
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

/* === SUBMIT BUTTON === */
.form-submit {
  margin-top: var(--spacing-8);
}

/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #1d203e inset !important;
}

/*Change text in autofill textbox*/
input:-webkit-autofill {
  -webkit-text-fill-color: white !important;
  border: 1px solid rgba(102, 126, 234, 1) !important;
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
</style>
