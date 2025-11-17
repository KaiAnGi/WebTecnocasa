// components/zonaCliente/CuentaPanel/ProfilePanel/ProfilePanel.jsx
export default function ProfilePanel({ active = 'Información Perfil', onSelect }) {
  const items = [
    'Información Perfil',
    'Datos Personales',
    'Privacidad',
    'Cambiar Contraseña',
    'Borrar Usuario',
  ];

  return (
    <div className="profile-panel">
      <div className="pp-avatar">
        <div className="pp-top"></div>
        <div className="pp-body"></div>
      </div>
      <ul className="pp-menu">
        {items.map((label) => (
          <li
            key={label}
            className={label === active ? 'active' : ''}
            onClick={() => onSelect?.(label)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect?.(label); }}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
