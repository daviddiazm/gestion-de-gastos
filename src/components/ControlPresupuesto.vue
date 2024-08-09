<script setup >
import imagen from '../assets/img/grafico.jpg'
import { formatearCantidad } from '../helpers';

const props = defineProps({
  presupuesto: {
    type: Number,
    required: true
  },
  disponible: {
    type: Number,
    required: true
  },
  gastado: {
    type: Number,
    required: true
  },
})

</script>

<template>
  <div class="dos-columnas">
    <div class="contenedor-grafico">
      <img :src="imagen" alt="">
    </div>

    <div class="contenedor-presupuesto">
      <button class="reset-app ">
        Reset app
      </button>
      <p>
        <span>Presupuesto: </span>{{ formatearCantidad(presupuesto) }} 
      </p>
      <p>
        <span>Disponible: </span>{{ formatearCantidad(disponible) }}
      </p>
      <p>
        <span>Gastado: </span>{{ formatearCantidad(gastado) }} 
      </p>
    </div>
  </div>
</template>

<style scoped>
p {
  text-align: center;
  color: var(--gris-oscuro);
}

span {
  font-weight: 900;
  color: var(--azul);
}

.dos-columnas {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-size: 2rem;
}

.contenedor-presupuesto {
  width: 100%;
}

.reset-app {
  width: 100%;
  background-color: rgb(240, 15, 98);
  padding: 1rem;
  border-radius: 1rem;
  text-transform: uppercase;
  font-weight: 900;
  color: var(--blanco);
  transition-property: background-color;
  transition-duration: 300ms;
}

.reset-app:hover {
  background-color: rgb(170, 9, 68);
}


@media (min-width: 760px) {
  p{
    text-align: start;
  }
  
  .dos-columnas {
    flex-direction: row;
    align-items: center;
    gap: 5rem;
  }
  
}


</style>