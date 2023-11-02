<script setup>
defineProps({
	event: Object,
})
</script>

<template>
	<div class="card">
		<h2>
			From
			{{
				new Intl.DateTimeFormat("default", {
					hour: "numeric",
					minute: "numeric",
				}).format(new Date(event.start))
			}}
			to
			{{
				new Intl.DateTimeFormat("default", {
					hour: "numeric",
					minute: "numeric",
				}).format(new Date(event.end))
			}}
		</h2>
		<h3>Julien is working @ {{ event.title }}</h3>
		<a
			target="_blank"
			:href="`https://www.google.com/maps/search/${encodeURIComponent(
				event.location,
			)}/`"
			>{{ event.location }}</a
		>
	</div>
</template>

<style scoped>
.card {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
	margin: 1rem;
	border-radius: 4px;
}

h2,
h3 {
	font-size: 1.25rem;
	margin: 0.5rem 0;
}

a {
	color: #0077cc;
	text-decoration: none;
}
</style>
