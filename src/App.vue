<script setup>
import { reactive, ref, watch } from 'vue';

import ControlPresupuesto from './components/ControlPresupuesto.vue';
import imgAgregarGasto from './assets/img/nuevo-gasto.svg'
import Modal from './components/Modal.vue';
import Presupuesto from './components/Presupuesto.vue';
import Gasto from './components/Gasto.vue';
import { generarId } from './helpers';


const presupuesto = ref(0)
const disponible = ref(0)
const gastado = ref(0)
const indexGastoSeleccionado = ref(null)
const gastos = ref([])
const gasto = reactive({
  nombre: null,
  cantidad: null,
  categoria: null,
  id: null,
  fecha: Date.now()
})
const modal = reactive({
  mostrar: false,
  animacion: false
})

watch(gastos,()=> {
  const totalGastos = gastos.value.reduce((total, gasto)=> gasto.cantidad + total,0 )
  gastado.value = totalGastos
  disponible.value = presupuesto.value - totalGastos
},{
  deep:true
})
// watch(gastos, (newGastos) => {
//   console.log("Gastos actualizados:", newGastos);
//   const totalGastos = gastos.value.reduce((total, gasto) => gasto.cantidad + total, 0);
//   gastado.value = totalGastos;
//   disponible.value = presupuesto.value - totalGastos;
// }, { deep: true });

const definirtPresupuesto = (presupuestoDefinido) => {
  presupuesto.value = presupuestoDefinido
  disponible.value = presupuestoDefinido
}

const mostrarModal = () => {
  modal.mostrar = true

  setTimeout(() => {
    modal.animacion = true
  }, 300);
}

const cerrarModal = () => {
  modal.animacion = false
  
  setTimeout(() => {
    modal.mostrar = false
  }, 300);
}

const registrarGasto = () => {
  gastos.value.push({ ... gasto, id: generarId(), fecha: Date.now() })
}

const seleccionarGasto = (id) => {
  const indexGasto = gastos.value.findIndex(gasto => gasto.id === id)
  indexGastoSeleccionado.value = indexGasto
  Object.assign(gasto, gastos.value[indexGasto])
  mostrarModal()
}

const editarGasto = () => {
  gastos.value[indexGastoSeleccionado.value] = {... gasto}
}

const eliminarGasto = () => {
  gastos.value.splice(indexGastoSeleccionado.value, 1)
  indexGastoSeleccionado.value = null; // Reset the selected index
}


</script>

<template>
  <div>
    <header>
      <h1>Administrado de gastos</h1>
      <div class=" sombra contenedor contenedor-header">
        <Presupuesto 
          v-if="presupuesto <= 0" 
          @definir-presupuesto="definirtPresupuesto"
        />
        <ControlPresupuesto 
          v-else 
          :presupuesto="presupuesto"
          :disponible="disponible"
          :gastado="gastado"
        />
      </div>
    </header>

    <main v-if="presupuesto > 0" >
      <div 
        class="crear-gasto"
        @click="mostrarModal">
        <img :src="imgAgregarGasto" alt="icono neuvo gasto">
      </div >

      <Modal
        v-if="modal.mostrar"
        @cerrar-modal="cerrarModal"
        @registrar-gasto="registrarGasto"
        @editar-gasto="editarGasto"
        @eliminar-gasto="eliminarGasto"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"
        :gasto="gasto"
        :modal="modal"
        :disponible="disponible"
      />
      
      <div class="gastos-container contenedor">
        <h2>{{ gastos.length>0 ? 'Gastos' : 'No hay gastos' }}</h2>
        <Gasto 
          v-for="gasto in gastos"
          :key="gasto.id"
          :gasto="gasto"
          @seleccionar-gasto="seleccionarGasto"
        />
      </div>
    </main>
  </div>
</template>

<style>
:root {
  --azul: #3b82f6;
  --azul-oscuro: #0749b4;
  --blanco: #FFF;
  --gris-claro: #F5F5F5;
  --gris: #94a3b8;
  --gris-oscuro: #64748b;
  --negro: #000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--gris-claro);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

.fijar {
  overflow: hidden;
  height: 100vh;
}

header {
  background-color: var(--azul);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}

.btn-sumbmit {
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

.btn-sumbmit:hover {
  background-color: var(--azul-oscuro);
}

.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.contenedor-header {
  transform: translateY(5rem);
  padding: 5rem;
  border-radius: 1.5rem
}

.sombra {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
}

.crear-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}
.crear-gasto img {
  width: 5rem;
  cursor: pointer;
}

.gastos-container {
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.gastos-container h2 {
  color: var(--gris-oscuro);
}

</style>