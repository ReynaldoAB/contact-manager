// Función que retorna una Promise personalizada
export function initializeApp(duration = 3000) {
    return new Promise((resolve) => {
        // setTimeout simula una operación que toma tiempo
        setTimeout(() => {
            resolve(false); // Este resolve demorará 3000 ms en ejecutarse.
        }, duration);
    });
}
