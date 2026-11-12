<script setup>
import { ref } from 'vue'
import RoleCard from '../../Components/Recruitment/RoleCard.vue'
import RoleDetailDialog from '../../Components/Recruitment/RoleDetailDialog.vue'
import SiteHeader from '../../Components/Recruitment/SiteHeader.vue'

defineProps({ roles: { type: Array, required: true } })

const selectedRole = ref(null)
const highlights = ['Bangun antarmuka', 'Rancang pengalaman', 'Jaga kualitas']
</script>

<template>
  <div class="landing-page">
    <a class="skip-link" href="#main-content">Lewati ke konten utama</a>

    <main id="main-content" tabindex="-1">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__inner">
        <SiteHeader mode="landing" />

        <div class="hero__main">
          <div class="hero__copy">
            <h1 id="hero-title">Temukan tempat<br class="desktop-break"> untuk karyamu.</h1>
            <p class="hero__description">
              Kenali peran di bidang teknologi, desain, dan pengujian. Mulai dari keahlianmu, lalu temukan kontribusi yang ingin kamu kerjakan.
            </p>
            <div class="hero__actions">
              <a class="app-button app-button--primary" href="#posisi">Lihat contoh posisi</a>
              <a class="app-button app-button--secondary" href="#persiapan-lamaran">Siapkan lamaran</a>
            </div>
            <p class="hero__disclaimer">Demo assignment. Seluruh posisi adalah data contoh.</p>
          </div>

          <div class="hero-art" aria-label="Pratinjau posisi Frontend Developer">
            <img class="hero-art__frame" :src="'/images/candidate-frame.svg'" alt="" aria-hidden="true">
            <img class="hero-art__person" :src="'/images/candidate-illustration.png'" alt="Ilustrasi kandidat sedang bekerja menggunakan laptop">
            <div class="hero-art__caption">
              <strong>{{ roles[0]?.title }}</strong>
              <span>{{ roles[0]?.department }} · {{ roles[0]?.location }} · {{ roles[0]?.employmentType }}</span>
            </div>
          </div>
        </div>

        <div class="hero-highlights" aria-label="Contoh bidang pekerjaan">
          <div v-for="(role, index) in roles" :key="role.slug" class="hero-highlights__item">
            <strong>{{ highlights[index] }}</strong>
            <span>{{ role.title }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="posisi" class="roles-section page-section" aria-labelledby="roles-title">
      <div class="section-heading">
        <h2 id="roles-title">Pilih peran yang<br class="desktop-break"> ingin kamu jalani.</h2>
        <p>Baca tanggung jawab, keahlian, dan pola kerjanya. Lanjutkan ke simulasi lamaran untuk mencoba alurnya.</p>
      </div>
      <div class="role-grid">
        <RoleCard v-for="role in roles" :key="role.slug" :role="role" @select="selectedRole = $event" />
      </div>
    </section>

    <section id="persiapan-lamaran" class="preparation-section page-section" aria-labelledby="preparation-title">
      <div class="preparation-section__inner">
        <div class="preparation-section__copy">
          <h2 id="preparation-title">Siapkan lamaranmu.</h2>
          <p>Kenali isian formulir dan ketentuan dokumen sebelum melanjutkan.</p>
          <p class="preparation-section__note">Prototype ini memakai data contoh, tanpa mengunggah berkas.</p>
        </div>
        <div class="preparation-list" aria-label="Persiapan lamaran">
          <article class="preparation-item">
            <div><h3>Data kontak</h3><span>Wajib</span></div>
            <p>Nama lengkap, email, dan nomor telepon yang bisa dihubungi.</p>
          </article>
          <article class="preparation-item">
            <div><h3>CV</h3><span>Wajib</span></div>
            <p>PDF, maksimal 5 MB.</p>
          </article>
          <article class="preparation-item preparation-item--optional">
            <div><h3>Portofolio</h3><span>Opsional</span></div>
            <p>Tautan karya atau proyek, jika ada.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="faq-section page-section" aria-labelledby="faq-title">
      <h2 id="faq-title">Yang perlu kamu tahu.</h2>
      <div class="faq-grid">
        <article>
          <h3>Apakah ini lowongan resmi?</h3>
          <p>Tidak. Frontend Developer, UI/UX Designer, dan Quality Assurance Intern di halaman ini adalah data contoh untuk assignment.</p>
        </article>
        <article>
          <h3>Bisa mengirim lamaran di sini?</h3>
          <p>Kamu bisa mencoba alur formulir lamaran dengan data contoh. Prototype tidak mengunggah CV atau mengirim data pribadi.</p>
        </article>
      </div>
    </section>

    <section class="closing-section page-section" aria-labelledby="closing-title">
      <h2 id="closing-title">
        <span class="closing-desktop">Mulai dari peran<br>yang paling kamu kenali.</span>
        <span class="closing-compact">Kenali peranmu.<br>Tentukan arahmu.</span>
      </h2>
      <a class="app-button app-button--inverse" href="#posisi">Kembali ke posisi</a>
    </section>
    </main>

    <footer class="site-footer">
      <div class="site-footer__inner">
        <p class="site-footer__brand">Sekolah Karir</p>
        <p>Recruitment landing page · Demo assignment</p>
        <p>Seluruh posisi merupakan data contoh, bukan informasi rekrutmen resmi Sekolah Karir. Figur merupakan ilustrasi yang dibuat dengan Stitch, bukan foto karyawan.</p>
      </div>
    </footer>

    <RoleDetailDialog :role="selectedRole" @close="selectedRole = null" />
  </div>
</template>
