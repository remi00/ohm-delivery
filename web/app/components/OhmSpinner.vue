<template>
  <transition name="spinner-fade">
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </transition>
</template>

<script>
/* from https://loading.io/css/ */

export default {
};
</script>

<style scoped>
.lds-ring {
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: auto;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #aed7ff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #aed7ff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner-fade-enter-active{
  transition: opacity 300ms ease-in-out;
}
.spinner-fade-leave-active {
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
  transition-delay: 400ms;
  animation-duration: 0;
  animation-delay: 0;
}
.spinner-fade-enter, .spinner-fade-leave-to {
  opacity: 0;
}
</style>
