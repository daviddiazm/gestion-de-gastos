<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  filtro: {
    type: String,
    required: true
  }
});

defineEmits(['update:filtro']);
</script>

<template>
  <div class="filtro contenedor sombra">
    <label for="filtro">Filtro: </label>
    <select 
      :value="filtro" 
      id="filtro" 
      @input="$emit('update:filtro', $event.target.value)">
      <option value="">-Seleccionar-</option>
      <option value="ahorro">Ahorro</option>
      <option value="comida">Comida</option>
      <option value="casa">Casa</option>
      <option value="gastos">Gastos Varios</option>
      <option value="ocio">Ocio</option>
      <option value="salud">Salud</option>
      <option value="suscripciones">Suscripciones</option>
    </select>
  </div>
</template>
<style scoped>

.filtro {
  margin-top: 10rem;
  padding: 3rem;
  border-radius: 2rem;
  display: flex;
  justify-content: space-around;
}

.filtro label{
  color: var(--gris-oscuro);
  font-size: 3rem;
  font-weight: 900;
}

</style>