import { useNavigate } from 'react-router-dom';

export default function ContactCard({ contact }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/contact/${contact.id}`);
  }

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{contact.name}</h3>
    </div>
  );
}