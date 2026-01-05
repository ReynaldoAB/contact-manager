// URL de la API desde variables de entorno

import { time } from "framer-motion";



class ContactService {
  constructor() {

    // Usando this.apiUrl para la URL de la API
    this.apiUrl = import.meta.env.VITE_API_URL;

    // const API_URL = import.meta.env.VITE_API_URL;

    // Contador de rquest
    this.requestCount = 0;

    this.lastRequestTime = null;

    // Verificación de configuración
    if (!this.apiUrl) {
      console.error('⚠️ VITE_API_URL no está configurada en .env');
    }
  }
  /**
   * Obtiene todos los contactos desde la API
   * @returns {Promise<Array>} Lista de contactos
   * @throws {Error} Si hay problemas de red o respuesta inválida
   */
   async fetchContacts() {
    console.log('🌐 Iniciando carga de contactos...');

    const startTime = Date.now();
    this.requestCount++;
    this.lastRequestTime = new Date().toISOString();


    try {
      const response = await fetch(this.apiUrl,{
        headers: {

          //Agrega headers de acuerdo al parte 3
          'Content-Type': 'application/json'
        }
      });

      // Verificar status HTTP
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
      }

      const contacts = await response.json();
      const endTime = Date.now();

      console.log(`✅ ${contacts.length} contactos cargados exitosamente`);
      console.log(`Total de requests realizados: ${this.requestCount}`);

      return {
        contacts,
        metadata: {
          totalContacts: contacts.length,
          requestNumber: this.requestCount,
          responseTime: `${endTime - startTime} ms`,
          timestamp: this.lastRequestTime,
          source: `Service Layer`
        }
      };

    } catch (error) {
      // Diferenciar tipos de error
      if (error.name === 'TypeError') {
        console.error('❌ Error de red:', error.message);
        throw new Error('No se pudo conectar al servidor. Verifica tu conexión a internet.');
      }

      console.error('❌ Error al cargar contactos:', error.message);
      throw error;
    }
  }

    /**
   * Crea un nuevo contacto en la API
   * @param {Object} contactData - Datos del nuevo contacto
   * @returns {Promise<Object>} El contacto creado con su ID
   */
  async createContact(contactData) {
    console.log('🌐 Creando contacto...');

    this.requestCount++;
    this.lastRequestTime = new Date().toISOString();

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error(`Error al crear: ${response.status} ${response.statusText}`);
      }

      const newContact = await response.json();
      console.log('✅ Contacto creado:', newContact);

      return newContact;

    } catch (error) {
      console.error('❌ Error al crear contacto:', error.message);
      throw error;
    }
  }

  /**
   * Actualiza un contacto existente en la API
   * @param {string} id - ID del contacto a actualizar
   * @param {Object} contactData - Datos actualizados del contacto
   * @returns {Promise<Object>} El contacto actualizado
   * @throws {Error} Si hay problemas de red o respuesta inválida
   */
  async updateContact(id, contactData) {
    console.log('🌐 Actualizando contacto:', id, contactData);

    this.requestCount++;
    this.lastRequestTime = new Date().toISOString();

    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar: ${response.status} ${response.statusText}`);
      }

      const updatedContact = await response.json();
      console.log('✅ Contacto actualizado:', updatedContact);

      return updatedContact;

    } catch (error) {
      console.error('❌ Error al actualizar contacto:', error.message);
      
      // Manejo de error de red (consistente con otros métodos)
      if (error.name === 'TypeError') {
        throw new Error('No se pudo conectar al servidor. Verifica tu conexión a internet.');
      }
      
      throw error;
    }
  }

  // Obtiene estadisticas del servicio

  getStats() {
    return {
      totalRequests: this.requestCount,
      lastRequestTime: this.lastRequestTime || 'Todavía no hay solicitude',
      apiUrl: this.apiUrl,
      serviceStatus: `Activo`

    };
  }
  
  // Obtiene el número total de requests realizados
  getRequestCount() {
    return this.requestCount;
  }
}

// Exportar una instancia única del servicio
export const contactService = new ContactService()