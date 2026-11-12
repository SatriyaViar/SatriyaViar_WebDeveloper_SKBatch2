<script setup>
import { nextTick, ref, watch } from 'vue'
import AppButton from '../Ui/AppButton.vue'

const props = defineProps({
  role: { type: Object, required: true },
  draft: { type: Object, required: true },
  errors: { type: Object, required: true },
})
const emit = defineEmits(['example', 'review'])
const errorSummary = ref(null)

watch(() => props.errors, async (errors) => {
  if (Object.keys(errors).length) {
    await nextTick()
    errorSummary.value?.focus()
  }
})

function formatSize(bytes) {
  if (!bytes) return ''
  return bytes >= 1024 * 1024 ? `${bytes / (1024 * 1024)} MB` : `${Math.round(bytes / 1024)} KB`
}
</script>

<template>
  <section class="application-card" aria-labelledby="form-card-title">
    <div class="application-card__heading">
      <p class="eyebrow">Posisi yang dilamar</p>
      <h2 id="form-card-title">{{ role.title }}</h2>
    </div>

    <div class="example-banner">
      <p>Mode prototype: isian dan file menggunakan contoh tetap.</p>
      <AppButton variant="secondary" @click="emit('example', 'valid')">Gunakan data contoh</AppButton>
    </div>

    <div v-if="Object.keys(errors).length" ref="errorSummary" class="error-summary" role="alert" tabindex="-1">
      <p>Periksa bagian yang ditandai di bawah.</p>
      <ul>
        <li v-for="(message, field) in errors" :key="field"><a :href="`#${field}`">{{ message }}</a></li>
      </ul>
    </div>

    <div class="form-grid">
      <div class="field">
        <label for="name">Nama lengkap <span aria-hidden="true">*</span></label>
        <input id="name" name="name" type="text" :value="draft.name" placeholder="Nama lengkap kamu" readonly autocomplete="off" :aria-invalid="Boolean(errors.name)" :aria-describedby="errors.name ? 'name-error' : undefined">
        <p v-if="errors.name" id="name-error" class="field-error">{{ errors.name }}</p>
      </div>
      <div class="field">
        <label for="email">Email <span aria-hidden="true">*</span></label>
        <input id="email" name="email" type="email" :value="draft.email" placeholder="nama@contoh.com" readonly autocomplete="off" :aria-invalid="Boolean(errors.email)" :aria-describedby="errors.email ? 'email-error' : undefined">
        <p v-if="errors.email" id="email-error" class="field-error">{{ errors.email }}</p>
      </div>
      <div class="field">
        <label for="phone">Nomor telepon <span aria-hidden="true">*</span></label>
        <input id="phone" name="phone" type="tel" :value="draft.phone" placeholder="Contoh: 0812 3456 7890" readonly autocomplete="off" :aria-invalid="Boolean(errors.phone)" :aria-describedby="errors.phone ? 'phone-error' : undefined">
        <p v-if="errors.phone" id="phone-error" class="field-error">{{ errors.phone }}</p>
      </div>
      <div class="field">
        <label for="portfolio">Portofolio <span>(opsional)</span></label>
        <input id="portfolio" name="portfolio" type="url" :value="draft.portfolio" placeholder="https://…" readonly autocomplete="off" :aria-invalid="Boolean(errors.portfolio)" :aria-describedby="errors.portfolio ? 'portfolio-error' : undefined">
        <p v-if="errors.portfolio" id="portfolio-error" class="field-error">{{ errors.portfolio }}</p>
      </div>
    </div>

    <section class="cv-field" role="group" aria-labelledby="cv-label">
      <p id="cv-label" class="field-label">CV <span aria-hidden="true">*</span></p>
      <p v-if="draft.cv" id="cv-example" class="cv-field__file">{{ draft.cv.name }} · {{ formatSize(draft.cv.size) }} (contoh)</p>
      <p v-else id="cv-example" class="cv-field__file">Pilih dokumen CV untuk melengkapi lamaran.</p>
      <p class="field-hint">PDF, maksimal 5 MB. Tidak ada file yang benar-benar diunggah.</p>
      <p v-if="errors.cv" id="cv-error" class="field-error">{{ errors.cv }}</p>
      <div class="cv-field__actions">
        <AppButton variant="secondary" :aria-describedby="errors.cv ? 'cv-error' : undefined" @click="emit('example', 'valid-cv')">
          {{ errors.cv ? 'Ganti dengan CV contoh' : draft.cv ? 'Ganti CV contoh' : 'Pilih CV contoh' }}
        </AppButton>
        <button v-if="draft.cv && !errors.cv" class="text-button" type="button" @click="emit('example', 'invalid-cv')">Lihat contoh CV tidak valid</button>
      </div>
    </section>

    <p class="application-card__privacy">Data dan dokumen prototype tidak disimpan atau dikirim.</p>
    <AppButton class="application-card__submit" @click="emit('review')">Periksa lamaran</AppButton>
  </section>
</template>
