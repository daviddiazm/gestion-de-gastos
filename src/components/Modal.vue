<script setup>
import { computed, ref } from 'vue';
import imgCerrar from '../assets/img/cerrar.svg'
import Alerta from "./Alerta.vue"


const msgAlerta = ref('')
const props = defineProps({
  gasto: {
    type: Object
  },
  modal: {
    type: Object,
    required: true
  },
  disponible: {
    type: Number,
    required: true
  }
})

const anteriorCantidad = props.gasto.cantidad

const emits = defineEmits(['cerrar-modal', 'registrar-gasto', 'editar-gasto', 'eliminar-gasto', 'update:nombre', 'update:categoria', 'update:cantidad'])

const enviarGasto = () => {
  const { nombre, cantidad, categoria } = props.gasto

  if(props.gasto.id) {
    if(cantidad > anteriorCantidad + props.disponible) {
      mostrarAlerta('La cantidad no puede sobre pasar lo disponible')
      return
    } else {
      emits('editar-gasto')
      emits('cerrar-modal')
      return
    }
  } else {
    if( !nombre || !cantidad || !categoria  ){
      mostrarAlerta('Se tienen que rellenar todos los campos')
      return
    } 
    if( cantidad<=0 ) {
      mostrarAlerta('La cantidad tiene que ser mayor a cero')
      return
    }
    if( cantidad > props.disponible ) {
      mostrarAlerta('No hay dinero disponible')
      return
    }
    emits('registrar-gasto')
    Object.keys((props.gasto)).forEach(key => props.gasto[key] = null)
    emits('cerrar-modal')
  }
  
}

// const mandarEliminarGasto = () => {
  
//   emits('eliminar-gasto',props.gasto.id)
//   emits('cerrar-modal')
// }

const mandarEliminarGasto = () => {
  emits('eliminar-gasto', props.gasto.id);
  emits('cerrar-modal');
};

const mostrarAlerta = (msg) => {
  msgAlerta.value = msg
  setTimeout(() => {
    msgAlerta.value = ''
  }, 3000);
}

const isEditing = computed(() => {
  return props.gasto.id
})

</script>

<template>

  <div class="modal">
    <div @click="$emit('cerrar-modal')" class="cerrar-modal">
      <img :src="imgCerrar" alt="img cerrar">
    </div>

    <form 
    class="contenedor form-gasto" 
    :class="[modal.animacion ? 'animar' : 'cerrar']"
    @submit.prevent="enviarGasto">
    <legend > {{ isEditing ? 'Editar Gasto': 'Registrar Gasto' }} </legend>
    <Alerta v-if="msgAlerta">
      {{ msgAlerta }}
    </Alerta>
      <div class="form-items-container">
        <div class="form-item">
          <label for="nombre">Nombre</label>
          <input 
            @input="$emit('update:nombre', $event.target.value)" 
            :value="gasto.nombre"
            type="text" 
            id="nommbre">
        </div>

        <div class="form-item">
          <label for="cantidad">Cantidad</label>
          <input 
            @input="$emit('update:cantidad',parseInt($event.target.value,10))" 
            :value="gasto.cantidad"
            type="number"
            id="gasto" 
            placeholder="ej. 300">
        </div>

        <div class="form-item">
          <label for="categoria">Categoria</label>
          <select 
            id="categoria" 
            :value="gasto.categoria"
            @input="$emit('update:categoria', $event.target.value)" >
            <option value="">-Seleccionar-</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Osio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          class="btn-sumbmit"
          type="submit" 
          :value="[isEditing ? 'Editar gasto' : 'Registrar Gasto']">

          <button
            v-if="isEditing"
            @click="mandarEliminarGasto"
            class="btn-eliminar">
            Eliminar gasto
          </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  font-size: 2rem;
  height: 100vh;
}

.cerrar-modal {
  position: fixed;
  right: 5rem;
  top: 5rem;
}

.cerrar-modal img {
  width: 5rem;
  cursor: pointer;
}

.form-gasto {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}

.form-gasto legend {
  font-size: 2rem;
  font-weight: 900;
  color: var(--blanco);
  margin-bottom: 3rem;
}

.form-gasto.animar {
  opacity: 1;
}
.form-gasto.cerrar {
  opacity: 0;
}

.form-items-container {
  display: flex;
  flex-direction: column;
  /* justify-content: start; */
  align-items: start;
  gap: 2rem;
}

.form-gasto label {
  display: inline-block;
  width: 9rem;
  font-weight: 900;
  color: var(--blanco);
  margin-right: 1rem;
}

.form-gasto select {
  padding: 0 6rem
}

.btn-eliminar {
  margin-top: 5rem;
  width: 100%;
  background-color: red;
  margin-top: 2rem;
  padding: 1rem;
  font-size: 2rem;
  color: var(--blanco);
  border: none;
  border-radius: 1rem;
  transition: background-color 300ms ease;
}

.btn-eliminar:hover {
  background-color: rgb(165, 0, 0);
}
</style>