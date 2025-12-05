// Footer.jsx

export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer 
            style={{ 

                backgroundColor: '#222',
                color: '#fff',
                textAlign: 'center',
                padding: '10px',
                position: 'fixed',
                bottom: 0,
                width: '100%'

            }}
        >
            © {year} Contact Manager. | Todos los derechos reservados.
        </footer>
    );
}