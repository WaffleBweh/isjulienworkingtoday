<script setup>
import { ref } from 'vue'

defineProps({
  event: Object
})

</script>

<template>
  <div class="card">
    <h2>From {{ new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date(event.start))
    }} to {{ new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(event.end))
}}</h2>
    <h3>Julien is working @ {{ event.title }}</h3>
    <a target="_blank" :href="`https://www.google.com/maps/search/${encodeURIComponent(event.location)}/`">{{ event.location }}</a>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
@media (max-width: 600px) {
  h2 {
    font-size: 1.25rem;
  }
  
  h3{
    font-size: 1rem;
  }
}
</style>
