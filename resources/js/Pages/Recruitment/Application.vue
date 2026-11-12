<script setup>
import { Link } from '@inertiajs/vue3'
import { nextTick, onBeforeUnmount, ref } from 'vue'
import AppButton from '../../Components/Ui/AppButton.vue'
import ApplicationForm from '../../Components/Recruitment/ApplicationForm.vue'
import ApplicationReview from '../../Components/Recruitment/ApplicationReview.vue'
import SiteHeader from '../../Components/Recruitment/SiteHeader.vue'
import { createExampleDraft, validateApplication } from '../../lib/application.js'

const props = defineProps({ role: { type: Object, required: true } })
const emptyDraft = () => ({ name: '', email: '', phone: '', portfolio: '', cv: null })
const draft = ref(emptyDraft())
const errors = ref({})
const stage = ref('form')
const heading = ref(null)
let submissionTimer = null

const stageContent = {
  form: ['Lamar posisi ini.', 'Posisi mengikuti pilihanmu. Gunakan data contoh, bukan data pribadi asli.'],
  review: ['Periksa lamaranmu.', 'Periksa contoh data sebelum melanjutkan.'],
  sending: ['Menyiapkan simulasi.', 'Tidak ada koneksi ke server rekrutmen. Tunggu untuk melihat tampilan konfirmasi.'],
  success: ['Simulasi selesai.', 'Alur pengiriman contoh selesai. Tidak ada data atau dokumen yang dikirim.'],
}

async function focusHeading() {
  await nextTick()
  heading.value?.focus({ preventScroll: true })
}

function applyExample(kind) {
  const example = createExampleDraft()
  if (kind === 'valid') {
    draft.value = example
    errors.value = {}
  } else if (kind === 'invalid-cv') {
    draft.value = {
      ...example,
      cv: {
        name: 'CV-contoh.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: 6 * 1024 * 1024,
      },
    }
    errors.value = validateApplication(draft.value)
  } else {
    draft.value = { ...draft.value, cv: example.cv }
    const nextErrors = { ...errors.value }
    delete nextErrors.cv
    errors.value = nextErrors
  }
}

function reviewApplication() {
  errors.value = validateApplication(draft.value)
  if (Object.keys(errors.value).length) return
  stage.value = 'review'
  focusHeading()
}

function editApplication() {
  stage.value = 'form'
  errors.value = {}
  focusHeading()
}

function submitSimulation() {
  if (stage.value !== 'review') return
  stage.value = 'sending'
  focusHeading()
  submissionTimer = window.setTimeout(() => {
    submissionTimer = null
    stage.value = 'success'
    focusHeading()
  }, 1000)
}

onBeforeUnmount(() => {
  if (submissionTimer !== null) window.clearTimeout(submissionTimer)
})
</script>

<template>
  <div class="application-page">
    <a class="skip-link" href="#application-main">Lewati ke konten utama</a>
    <SiteHeader mode="application" />

    <main id="application-main" class="application-main" tabindex="-1">
      <header class="application-intro">
        <h1 ref="heading" tabindex="-1">{{ stageContent[stage][0] }}</h1>
        <p>{{ stageContent[stage][1] }}</p>
      </header>

      <div class="application-layout">
        <ApplicationForm
          v-if="stage === 'form'"
          :role="role"
          :draft="draft"
          :errors="errors"
          @example="applyExample"
          @review="reviewApplication"
        />
        <ApplicationReview
          v-else-if="stage === 'review'"
          :role="role"
          :draft="draft"
          @edit="editApplication"
          @submit="submitSimulation"
        />
        <section v-else-if="stage === 'sending'" class="application-card state-card" role="status" aria-live="polite">
          <p class="eyebrow">Posisi yang dilamar</p>
          <h2>{{ role.title }}</h2>
          <p class="state-card__status">Memproses alur simulasi…</p>
          <AppButton disabled>Menyiapkan simulasi…</AppButton>
        </section>
        <section v-else class="application-card state-card" aria-labelledby="success-title">
          <p class="eyebrow">Posisi yang dilamar</p>
          <h2>{{ role.title }}</h2>
          <h3 id="success-title">Contoh lamaran sudah diperiksa.</h3>
          <p class="state-card__notice">Ini bukan bukti pengiriman lamaran sungguhan. Tidak ada email, CV, atau data pribadi yang disimpan.</p>
          <Link class="app-button app-button--primary" href="/#posisi">Kembali ke daftar posisi</Link>
        </section>

        <aside class="application-guide" aria-labelledby="guide-title">
          <h2 id="guide-title">Sebelum melanjutkan</h2>
          <ul>
            <li>Posisi terisi otomatis sesuai pilihanmu.</li>
            <li>Nama, email, nomor telepon, dan CV adalah bagian wajib.</li>
            <li>Portofolio bersifat opsional.</li>
            <li>Periksa data sebelum mengirim simulasi.</li>
          </ul>
          <p>Tidak perlu membuat akun untuk mencoba prototype ini.</p>
        </aside>
      </div>
    </main>

    <footer class="application-footer">Sekolah Karir · Demo assignment. Bukan halaman rekrutmen resmi.</footer>
  </div>
</template>
