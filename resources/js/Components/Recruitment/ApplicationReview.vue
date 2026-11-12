<script setup>
import AppButton from '../Ui/AppButton.vue'

defineProps({ role: { type: Object, required: true }, draft: { type: Object, required: true } })
defineEmits(['edit', 'submit'])

function formatSize(bytes) {
  return bytes >= 1024 * 1024 ? `${bytes / (1024 * 1024)} MB` : `${Math.round(bytes / 1024)} KB`
}
</script>

<template>
  <section class="application-card review-card" aria-labelledby="review-card-title">
    <div class="application-card__heading">
      <p class="eyebrow">Posisi yang dilamar</p>
      <h2 id="review-card-title">{{ role.title }}</h2>
    </div>
    <dl class="review-list">
      <div><dt>Nama lengkap</dt><dd>{{ draft.name }}</dd></div>
      <div><dt>Email</dt><dd>{{ draft.email }}</dd></div>
      <div><dt>Nomor telepon</dt><dd>{{ draft.phone }}</dd></div>
      <div><dt>Portofolio</dt><dd>{{ draft.portfolio || 'Tidak ada (opsional)' }}</dd></div>
      <div><dt>CV</dt><dd>{{ draft.cv.name }} · {{ formatSize(draft.cv.size) }} (contoh)</dd></div>
    </dl>
    <p class="application-card__privacy">Simulasi saja. Tidak ada berkas atau data yang dikirim ke tim rekrutmen.</p>
    <div class="review-actions">
      <AppButton variant="secondary" @click="$emit('edit')">Ubah data contoh</AppButton>
      <AppButton @click="$emit('submit')">Kirim simulasi lamaran</AppButton>
    </div>
  </section>
</template>
