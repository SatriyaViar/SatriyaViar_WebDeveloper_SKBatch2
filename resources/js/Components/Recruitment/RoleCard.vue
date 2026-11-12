<script setup>
defineProps({ role: { type: Object, required: true } })
defineEmits(['select'])
</script>

<template>
  <article class="role-card">
    <div class="role-card__content">
      <p class="eyebrow">{{ role.department }}</p>
      <h3>{{ role.title }}</h3>
      <p class="role-card__meta">{{ role.location }} · {{ role.employmentType }}</p>
      <p class="role-card__summary">{{ role.summary }}</p>
      <div class="role-card__skills">
        <p class="eyebrow">Keahlian relevan</p>
        <p>{{ role.skills.join(' · ') }}</p>
      </div>
    </div>
    <div class="role-card__footer">
      <button class="app-button app-button--primary app-button--compact" type="button" @click="$emit('select', role)">
        Lihat detail posisi
      </button>
    </div>
  </article>
</template>
