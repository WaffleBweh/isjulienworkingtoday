<template>
	<div id="loading" />
</template>

<style scoped>
#loading {
	display: inline-block;
	width: 60px;
	height: 60px;
	border-width: 3px;
	border-style: solid;
	border-color: rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	border-top-color: #fff;
	animation: spin 1s ease-in-out infinite;
	-webkit-animation: spin 1s ease-in-out infinite;
}

@media (prefers-color-scheme: light) {
	#loading {
		border-color: rgba(0, 0, 0, 0.3);
		border-top-color: #000;
	}
}

@keyframes spin {
	to {
		-webkit-transform: rotate(360deg);
	}
}
@-webkit-keyframes spin {
	to {
		-webkit-transform: rotate(360deg);
	}
}
</style>
