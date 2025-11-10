<script setup>
import { ref, computed, onMounted } from 'vue';

const isClient = ref(false); // Flag to check if running on client-side
const showModal = ref(false); //RGPD Modal visibility
const modalType = ref(''); //Type of modal: 'mentions' or 'confidentialite'

// Dynamic current year for copyright
const currentYear = computed(() => new Date().getFullYear());

/**
 * Opens a specific RGPD modal and prevents page scrolling.
 * @param {string} type - Modal type to display ('mentions' | 'confidentialite')
 */
const openModal = (type) => {
  modalType.value = type;
  showModal.value = true;
  document.body.classList.add('ow-hidden');
};

// Closes the RGPD modal and restores page scrolling.
const closeModal = () => {
  showModal.value = false;
  modalType.value = '';
  document.body.classList.remove('ow-hidden');
};

onMounted(() => {
  // Client-side only logic
  isClient.value = true;
});
</script>

<template>
  <div class="footer-bottom d-flex jc-between pt-4">
    <div class="copy">
      <p class="m-0">© {{ currentYear }} Noctua</p>
    </div>
    <div class="footer-legal d-flex gap-4">
      <a href="#" @click.prevent="openModal('mentions')" class="legal-link">Mentions légales</a>
      <a href="#" @click.prevent="openModal('confidentialite')" class="legal-link">Confidentialité</a>
    </div>

    <!-- Modal -->
    <Teleport to="body" :disabled="!isClient">
      <div v-if="showModal" class="modal-overlay d-flex ai-center jc-center p-fixed" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header d-flex ai-center jc-between tt-capitalize">
            <h3>{{ modalType }}</h3>
            <button @click="closeModal" class="modal-close rounded">✕</button>
          </div>
          <div class="modal-body">
            <!-- Mentions -->
            <div v-if="modalType === 'mentions'">
              <h4>Éditeur du site</h4>
              <p>
                <strong>Noctua</strong>
                <br />
                Développeur Full-Stack JavaScript
                <br />
                France
                <br />
                Email : contact@nocdev.fr
              </p>
              <h4>Hébergement</h4>
              <p>
                <strong>PlanetHoster</strong>
                <br />
                4416 Louis B. Mayer
                <br />
                Laval, QC H7P 0G1, Canada
              </p>
              <h4>Propriété intellectuelle</h4>
              <p>Tous droits réservés. Ce portfolio est protégé par le droit d'auteur.</p>
            </div>
            <!-- Confidentialité -->
            <div v-if="modalType === 'confidentialite'">
              <h4>Données collectées</h4>
              <p>Via le formulaire de contact :</p>
              <ul>
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Message</li>
              </ul>
              <h4>Utilisation</h4>
              <p>Ces données servent uniquement à répondre à vos demandes.</p>
              <h4>Vos droits</h4>
              <p>Accès, rectification, suppression : contact@nocdev.fr</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-overlay {
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}

.modal-content {
  background: linear-gradient(135deg, rgba(26, 31, 58, 0.95), rgba(17, 21, 40, 0.98));
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: var(--border-radius-lg);
  max-width: 600px;
  width: 100%;
  backdrop-filter: blur(10px);
  padding: var(--spacing-8);
}

/* === MODAL HEADER === */
.modal-header {
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid rgba(96, 165, 250, 0.2);
}

.modal-header h3 {
  color: var(--color-primary-text);
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: var(--spacing-2);
  line-height: 1;
  width: 40px;
}

.modal-close:hover {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
}

/* === MODAL BODY === */
.modal-body h4 {
  color: var(--color-primary-text);
  font-size: 1rem;
  font-weight: 600;
  margin: var(--spacing-6) 0 var(--spacing-3) 0;
}

.modal-body p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: 0.9rem;
  margin-bottom: var(--spacing-4);
}

.modal-body ul {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-4);
  padding-left: var(--spacing-6);
}

.modal-body li {
  margin-bottom: var(--spacing-1);
}
</style>
