<template>
    <div id="loading"></div>
</template>

<style scoped>
/* nicely borrowed from https://codepen.io/mandelid/pen/kNBYLJ */
#loading {
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
