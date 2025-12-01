import Header from './components/Header'
import ContactCard from './components/ContactCard'

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     gap: '16px'
                   }}>
        <ContactCard />
        <ContactCard />
        <ContactCard />
      </main>
    </div>
  )
}