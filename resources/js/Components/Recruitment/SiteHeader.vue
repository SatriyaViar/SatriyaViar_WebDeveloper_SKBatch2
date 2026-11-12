<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { Link } from '@inertiajs/vue3'

defineProps({ mode: { type: String, default: 'landing' } })

const menuOpen = ref(false)
const menuButton = ref(null)

function closeMenu(restoreFocus = false) {
  menuOpen.value = false
  if (restoreFocus) nextTick(() => menuButton.value?.focus())
}

function onKeydown(event) {
  if (event.key === 'Escape' && menuOpen.value) {
    event.preventDefault()
    closeMenu(true)
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="site-header">
    <div class="site-header__bar">
      <div class="site-header__identity">
        <Link class="site-header__brand" href="/">Sekolah Karir</Link>
        <span v-if="mode === 'application'" class="site-header__page-label">Lamaran</span>
      </div>

      <nav v-if="mode === 'landing'" class="site-header__desktop" aria-label="Navigasi utama">
        <a class="site-header__nav-link" href="#posisi">Posisi</a>
        <a class="site-header__nav-link" href="#persiapan-lamaran">Persiapan lamaran</a>
        <a class="site-header__cta" href="#posisi">Lihat posisi</a>
      </nav>
      <button
        v-if="mode === 'landing'"
        ref="menuButton"
        class="site-header__menu-toggle"
        type="button"
        aria-controls="mobile-menu"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Tutup' : 'Menu' }}
      </button>
      <Link v-else class="site-header__application-back" href="/#posisi">Ke posisi</Link>
    </div>

    <nav id="mobile-menu" v-show="menuOpen" class="site-header__mobile-menu" aria-label="Navigasi utama">
      <a href="#posisi" @click="closeMenu(true)">Posisi</a>
      <a href="#persiapan-lamaran" @click="closeMenu(true)">Persiapan lamaran</a>
      <a class="site-header__mobile-cta" href="#posisi" @click="closeMenu(true)">Lihat posisi</a>
    </nav>
  </header>
</template>
