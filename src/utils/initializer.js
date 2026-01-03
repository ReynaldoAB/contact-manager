// Función que retorna una Promise personalizada
export function initializeApp(duration = 3000) {
    return new Promise((resolve) => {
        // setTimeout simula una operación que toma tiempo
        setTimeout(() => {
            resolve(false); // Este resolve demorará 3000 ms en ejecutarse.
        }, duration);
    });
}

// Función que falla 50% de las veces
export function loadAppData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.5; // 50% de probabilidad de éxito
            
            if (success) {
                console.log('✅ loadAppData: Datos cargados exitosamente');
                resolve({ data: 'Datos de la aplicación', timestamp: new Date() });
            } else {
                console.error('❌ loadAppData: Fallo al cargar datos');
                reject(new Error('Error al cargar datos de la aplicación'));
            }
        }, 2000); // Simula 2 segundos de carga
    });
}

// Función con auto-retry (reintenta hasta 3 veces)
export async function loadAppDataWithRetry(maxRetries = 3) {
    let attempt = 0;
    
    while (attempt < maxRetries) {
        attempt++;
        console.log(`🔄 Intento ${attempt} de ${maxRetries}...`);
        
        try {
            const data = await loadAppData();
            console.log(`✅ Éxito en intento ${attempt}:`, data);
            return data;
        } catch (error) {
            console.warn(`⚠️ Intento ${attempt} falló:`, error.message);
            
            if (attempt >= maxRetries) {
                console.error(`❌ Todos los intentos (${maxRetries}) fallaron`);
                throw new Error(`Error después de ${maxRetries} intentos: ${error.message}`);
            }
            
            // Espera 1 segundo antes de reintentar
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}