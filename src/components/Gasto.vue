<script setup>
import IconoAhorro from '../assets/img/icono_ahorro.svg'
import IconoCasa from '../assets/img/icono_casa.svg'
import IconoComida from '../assets/img/icono_comida.svg'
import IconoGastos from '../assets/img/icono_gastos.svg'
import IconoOcio from '../assets/img/icono_ocio.svg'
import IconoSalud from '../assets/img/icono_salud.svg'
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'
import { formatearCantidad, formatearFecha } from '../helpers'

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones
}

const props = defineProps({
  gasto: {
    type: Object,
    required: true
  }
})

defineEmits(['seleccionar-gasto']);

</script>

<template>
  <div @click="$emit('seleccionar-gasto',gasto.id)" class="gasto contendor sombra">
    <img :src="diccionarioIconos[gasto.categoria]" alt="">
    <div class="contenido">
      <div class="detalles">
        <p class="categoria" > {{ gasto.categoria }}</p>
        <p class="nombre" > {{ gasto.nombre }}</p>
        <p class="fecha"> <span>Fecha: </span> {{ formatearFecha(gasto.fecha) }}</p>
      </div>
      <p class="cantidad"> {{ formatearCantidad(gasto.cantidad) }}</p>
    </div>
  </div>
</template>

<style scoped>
  .gasto {
    display: flex;
    flex-direction: column;
    padding: 3rem;
    border-radius: 2rem
  }

  .gasto img{
    width: 30%;
    align-self: center;
  }
  
  .contenido {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .contenido span{
    font-weight: 900;
  }

  .detalles {
    align-items: center;
    color: var(--gris-oscuro);
  }

  .categoria {
    font-size: small;
    text-transform: uppercase;
    font-weight: 600;
  }

  .nombre {
    font-size: 2.5rem;
    font-weight: 600;
  }

  .cantidad {
    font-size: 3rem;
    font-weight: 900;
    align-self: center;
  }
  
  @media (min-width: 760px) {
    .gasto {
      align-items: center;
      flex-direction: row;
    }
    .gasto img {
      width: 10%;
      margin-right: 1rem;
    }
    .contenido {
      align-items: center;
      flex-direction: row;
      /* justify-content: space-around; */
      justify-content: space-between;
      gap: 3rem ;
    }
  }
</style>