<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/EventDisplay.vue'
import { ref, watchEffect } from 'vue'
import EventDisplay from './components/EventDisplay.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';


const API_URL = "/";
const SUFFIX = "api/"
const CALENDAR_ID = "3jsdb01svicc75chgu5l337itc@group.calendar.google.com";

async function getEvents(calendar_id) {
  const response = await fetch(API_URL + SUFFIX + calendar_id);
  return await response.json();
}

const data = ref(null)

getEvents(CALENDAR_ID).then(events => {
  data.value = events;
  console.log(data.value)
});

</script>

<template>
  <div>
    <ul v-if="data != null">
      <h1 v-if="data.length != 0">Yes, Julien is working today :</h1><h1 v-else>Julien is off today</h1>
        <EventDisplay v-for="event in data" :event="event"></EventDisplay>
    </ul>
    <LoadingSpinner v-else></LoadingSpinner>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  h1 {
    font-size: 2.0rem;
  }
}
</style>
