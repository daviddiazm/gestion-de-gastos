export const formatearCantidad = cantidad => {
  return Number(cantidad).toLocaleString('es-US',{
    style:'currency',
    currency: 'USD'
  })
}

export const generarId = () => {
  const fecha = Date.now()
  const random = Math.random().toString(36)
  return fecha+random
}

export const formatearFecha = fecha => {
  const fechaNueva = new Date(fecha)
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }
  return fechaNueva.toLocaleDateString('es-Es', options)
}