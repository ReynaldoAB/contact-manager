// En src/utils/storage.js

const FAVORITES_KEY = 'agenda_favorites';
const SEARCH_KEY = 'agenda_search_query';
const SORT_ORDER_KEY = 'agenda_sort_order';

/**
 * Obtiene la lista de IDs de contactos favoritos desde localStorage
 * @returns {Array<string>} Array de IDs de contactos favoritos
 */
export function getFavorites() {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error leyendo favoritos:', error);
    return [];
  }
}

/**
 * Guarda la lista de IDs favoritos en localStorage
 * @param {Array<string>} favoriteIds - Array de IDs a guardar
 */
export function saveFavorites(favoriteIds) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
    console.log('⭐ Favoritos guardados:', favoriteIds.length);
  } catch (error) {
    console.error('Error guardando favoritos:', error);
  }
}

/**
 * Alterna el estado de favorito de un contacto
 * @param {string} contactId - ID del contacto
 * @returns {Array<string>} Nueva lista de favoritos actualizada
 */
export function toggleFavorite(contactId) {
  const favorites = getFavorites();
  const newFavorites = favorites.includes(contactId)
    ? favorites.filter(id => id !== contactId) // Quitar de favoritos
    : [...favorites, contactId]; // Agregar a favoritos
  saveFavorites(newFavorites);
  return newFavorites;
}

/**
 * Guarda el término de búsqueda en localStorage
 * @param {string} query - Término de búsqueda
 */
export function saveSearchQuery(query) {
  try {
    localStorage.setItem(SEARCH_KEY, query);
  } catch (error) {
    console.error('Error guardando búsqueda:', error);
  }
}

/**
 * Obtiene el término de búsqueda guardado
 * @returns {string} Término de búsqueda guardado o string vacío
 */
export function getSearchQuery() {
  try {
    return localStorage.getItem(SEARCH_KEY) || '';
  } catch (error) {
    console.error('Error leyendo búsqueda:', error);
    return '';
  }
}

/**
 * Guarda la preferencia de ordenamiento en localStorage
 * @param {string} order - 'asc' o 'desc'
 */
export function saveSortOrder(order) {
  try {
    localStorage.setItem(SORT_ORDER_KEY, order);
    console.log('📋 Orden guardado:', order);
  } catch (error) {
    console.error('Error guardando orden:', error);
  }
}

/**
 * Obtiene la preferencia de ordenamiento guardada
 * @returns {string} 'asc' o 'desc'
 */
export function getSortOrder() {
  try {
    return localStorage.getItem(SORT_ORDER_KEY) || 'asc';
  } catch (error) {
    console.error('Error leyendo orden:', error);
    return 'asc';
  }
}