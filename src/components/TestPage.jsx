import { contactService } from '../services/contactService';

// Test rápido en consola
async function testService() {
  try {
    const contacts = await fetchContacts();
    console.log('Test exitoso:', contacts);
  } catch (error) {
    console.log('Test fallido:', error);
  }
}

function TestPage() {
  const handleTestService = async () => {
    await testService();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Página de Pruebas</h1>
      <button onClick={handleTestService}>
        🧪 Probar Contact Service
      </button>
      <p>Abre la consola (F12) para ver los resultados</p>
    </div>
  );
}

export default TestPage;