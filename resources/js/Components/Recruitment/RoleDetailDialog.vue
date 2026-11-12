<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { Link } from '@inertiajs/vue3'

const props = defineProps({ role: { type: Object, default: null } })
const emit = defineEmits(['close'])
const dialog = ref(null)
let originalOverflow = ''

watch(() => props.role, async (role) => {
  if (role) {
    await nextTick()
    if (!dialog.value?.open) dialog.value?.showModal()
    originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  } else if (dialog.value?.open) {
    dialog.value.close()
    document.body.style.overflow = originalOverflow
  }
}, { immediate: true, flush: 'post' })

onBeforeUnmount(() => {
  if (dialog.value?.open) dialog.value.close()
  document.body.style.overflow = originalOverflow
})

function requestClose() {
  emit('close')
}

function dismissBackdrop(event) {
  if (event.target === dialog.value) requestClose()
}
</script>

<template>
  <dialog
    ref="dialog"
    class="role-detail-dialog"
    aria-labelledby="role-detail-title"
    aria-describedby="role-detail-summary"
    :aria-hidden="!role"
    @cancel.prevent="requestClose"
    @click="dismissBackdrop"
  >
    <article v-if="role" class="role-detail-dialog__panel">
      <header class="role-detail-dialog__header">
        <div class="role-detail-dialog__topline">
          <p class="eyebrow">{{ role.department }}</p>
          <button class="icon-close" type="button" aria-label="Tutup detail posisi" @click="requestClose">Tutup</button>
        </div>
        <h2 id="role-detail-title">{{ role.title }}</h2>
        <p class="role-detail-dialog__meta">{{ role.location }} · {{ role.employmentType }}</p>
      </header>

      <div class="role-detail-dialog__body">
        <p class="sample-note">Data contoh, bukan lowongan resmi.</p>
        <p id="role-detail-summary" class="role-detail-dialog__summary">{{ role.summary }}</p>
        <section class="detail-section" aria-labelledby="responsibilities-heading">
          <h3 id="responsibilities-heading">Contoh tanggung jawab</h3>
          <ul><li v-for="item in role.responsibilities" :key="item">{{ item }}</li></ul>
        </section>
        <section class="detail-section" aria-labelledby="skills-heading">
          <h3 id="skills-heading">Keahlian yang relevan</h3>
          <ul><li v-for="skill in role.skills" :key="skill">{{ skill }}</li></ul>
        </section>
        <p class="role-detail-dialog__disclaimer">Simulasi lamaran. Data dan CV tidak dikirim.</p>
      </div>

      <footer class="role-detail-dialog__footer">
        <Link class="app-button app-button--primary" :href="`/lamaran/${role.slug}`" @click="requestClose">
          Lamar posisi ini
        </Link>
      </footer>
    </article>
  </dialog>
</template>
