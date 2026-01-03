// Función de utilidad para errores
export function getErrorMessage(error) {
  if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
    return 'No hay conexión a internet. Por favor, verifica tu red.';
  }

  if (error.message.includes('404')) {
    return 'El recurso solicitado no existe.';
  }

  if (error.message.includes('500')) {
    return 'Error en el servidor. Intenta más tarde.';
  }

  return error.message || 'Ocurrió un error inesperado.';
}