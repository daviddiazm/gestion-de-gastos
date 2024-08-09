<script setup>
import { ref } from 'vue';
import Alerta from './Alerta.vue';

const presupuesto = ref(0)
const errorMsg = ref('')

const emit = defineEmits(['definir-presupuesto'])

const validarPresupuesto = () => {
  if (presupuesto.value <= 0) {
    errorMsg.value = 'Presupuesto no valido '
    setTimeout(() => {
      errorMsg.value = ''
    }, 3000);
  }
  emit('definir-presupuesto', presupuesto.value)
}

</script>

<template>
  <form class="presupuesto" @submit.prevent="validarPresupuesto">

    <Alerta v-if="errorMsg !== ''">
      {{ errorMsg }}
    </Alerta>
    <div class="campo">
      <label for="nuevo-presupuesto">Define tu presupuesto</label>
      <input type="number" id="nuevo-presupuesto" class="nuevo-presupuesto" placeholder="presupuesto"
        v-model="presupuesto">
    </div>
    <input type="submit" value="Definir presupuesto">
  </form>
</template>

<style scoped>
.presupuesto {
  width: 100%;
}

.campo {
  display: grid;
  gap: 2rem;
}

.presupuesto label {
  font-size: 2rem;
  color: var(--azul);
  text-align: center;
}

.presupuesto input[type='number'] {
  border: none;
  border-radius: 1rem;
  border-color: var(--gris-claro);
  padding: 1rem;
  font-size: 2.2rem;
  text-align: center;
}

.presupuesto input[type='submit'] {
  width: 100%;
  background-color: var(--azul);
  margin-top: 2rem;
  padding: 1rem;
  font-size: 2rem;
  color: var(--blanco);
  border: none;
  border-radius: 1rem;
  transition: background-color 300ms ease;
}

.presupuesto input[type='submit']:hover {
  background-color: var(--azul-oscuro);
}

</style>