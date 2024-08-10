<script setup >
// import CircleProgress from "vue3-circle-progress-bar";
import CircleProgess from "vue3-circle-progress-bar"
import "vue3-circle-progress-bar/dist/circle-progress-bar.css"
import imagen from '../assets/img/grafico.jpg'
import { formatearCantidad } from '../helpers';
import { computed } from "vue";

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

defineEmits(['reiniciar-app'])

const porcentaje = computed(()=> {
  return  parseInt((props.gastado * 100 )/props.presupuesto)
})

</script>

<template>
  <div class="dos-columnas">

    <div class="contenedro-porcentaje">
      <p class="porcentaje">{{ porcentaje }}%</p>
      <CircleProgess
        :percent="porcentaje"
        :size="250"
        :border-width="20"
        :border-bg-width="20"
        :is-gradient="true"
        :gradient="{
          angle: 90,
          startColor: '#ccdfff',
          stopColor: '#3b82f6'
        }"
      />
    </div>

    <div class="contenedor-presupuesto">
      <button @click="$emit('reiniciar-app')" class="reset-app ">
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
  align-items: center;
  gap: 3rem;
  font-size: 2rem;
}

.contenedro-porcentaje {
  position: relative;
}
.porcentaje {
  position: absolute;
  font-size: 5rem;
  font-weight: 900;
  margin: auto;
  top: calc(50% - 2.5rem);
  left: 0px;
  right: 0px;
  text-align: center;
  z-index: 5;
  color: var(--gris-oscuro)
}

.contenedor-presupuesto {
  width: 100%;
}

.reset-app {
  width: 100%;
  background-color: #f00f62;
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
  /* color: ; */
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