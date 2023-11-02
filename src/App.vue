<script setup>
import { useUrlSearchParams } from "@vueuse/core"
import { computed, ref, watch } from "vue"
import EventDisplay from "./components/EventDisplay.vue"
import LoadingSpinner from "./components/LoadingSpinner.vue"

const API_URL = "/"
const SUFFIX = "api/"
const CALENDAR_ID = "3jsdb01svicc75chgu5l337itc@group.calendar.google.com"

async function getEvents(calendarId, tomorrow = false) {
	const URL = `${API_URL}${SUFFIX}${calendarId}?tomorrow=${tomorrow}`
	const response = await fetch(URL)
	return await response.json()
}

const params = useUrlSearchParams("history")
const tomorrow = computed(() => params.tomorrow === "true")
const dayLabel = computed(() => (tomorrow.value ? "tomorrow" : "today"))
const otherDayLabel = computed(() => (tomorrow.value ? "today" : "tomorrow"))

function toggleDay() {
	params.tomorrow = params.tomorrow === "true" ? "false" : "true"
}

const loading = ref(false)
const error = ref(false)
const data = ref(null)

async function fetchEvents() {
	loading.value = true
	error.value = false

	try {
		data.value = await getEvents(CALENDAR_ID, tomorrow.value)
	} catch {
		error.value = true
	} finally {
		loading.value = false
	}
}

watch(tomorrow, fetchEvents, { immediate: true })
</script>

<template>
	<div class="container">
		<div class="content">
			<LoadingSpinner v-if="loading" />
			<div v-else-if="error">
				<h1>Something went wrong 😱</h1>
				<button
					@click="fetchEvents"
					class="try-again-button"
				>
					Try again
				</button>
			</div>
			<div v-else-if="data">
				<h1 v-if="data.length !== 0">Yes, Julien is working {{ dayLabel }}:</h1>
				<h1 v-else>Julien is off {{ dayLabel }}</h1>
				<EventDisplay
					v-for="(event, i) in data"
					:key="i"
					:event="event"
				/>
				<button @click="toggleDay">What about {{ otherDayLabel }}?</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.content {
	max-width: 80rem;
	text-align: center;
	display: flex;
	flex-direction: col;
	align-items: center;
}

h1 {
	font-size: 2rem;
	margin: 0.5rem 0;
}

.try-again-button {
	margin-top: 1rem;
}

/* @media (max-width: 600px) {
	h1 {
		font-size: 1rem;
	}
} */
</style>
