// src/App.jsx

import Header from './components/Header'
import ContactCard from './components/ContactCard'
import Footer from './components/Footer'

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
     }}
    >
      <div
        style={{
          maxwidth: '1200px',
          width: '100%',
          margin: '0 auto',
          //display: 'flex',
          //justifyContent: 'center',
          padding: '0 50px',
          //flex: '1'
        }}
      >
      
        <Header />
        <main 
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <ContactCard />
          <ContactCard />
          <ContactCard />
        </main>
      </div>
      <Footer />
    </div>
  )
}