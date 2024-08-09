<template>
  <div class="alerta">
    <slot>

    </slot>
  </div>
</template>

<style scoped>
  .alerta {
    padding: 1rem;
    font-size: 1.6rem;
    border-left: 0.5rem solid red;
    color: red;
    text-transform: uppercase;
    text-align: center;
    font-weight: 900;
    margin-bottom: 2rem;
  }
</style>