// components/zonaCliente/CuentaPanel/1_MisDatosPersonales/1.1_ProfileForm/ProfileForm.jsx
import { useState } from 'react';

export default function ProfileForm({ email }) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    provincia: '',
    ciudad: '',
    genero: 'otro',
    telefono: '',
    email: email || '',
  });

  const onChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'radio' ? value : value }));
  };

  // Nota: el submit real debería delegarse a un hook/servicio
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Guardar perfil', form);
  };

  return (
    <form onSubmit={onSubmit} className="perfil-form">
      <div className="perfil-grid2">
        <div className="form-field">
          <label>Nombre</label>
          <input name="nombre" type="text" placeholder="Nombre" value={form.nombre} onChange={onChange} />
        </div>
        <div className="form-field">
          <label>Apellido</label>
          <input name="apellido" type="text" placeholder="Apellido" value={form.apellido} onChange={onChange} />
        </div>
      </div>

      <div className="perfil-grid2">
        <div className="form-field">
          <label>Provincia</label>
          <select name="provincia" value={form.provincia} onChange={onChange}>
            <option value="" disabled>Provincia</option>
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
          </select>
        </div>
        <div className="form-field">
          <label>Ciudad</label>
          <select name="ciudad" value={form.ciudad} onChange={onChange}>
            <option value="" disabled>Ciudad</option>
            <option value="Madrid">Madrid</option>
            <option value="Móstoles">Móstoles</option>
          </select>
        </div>
      </div>

      <div className="sexo-row">
        <label>Sexo</label>
        <div className="sexo-group">
          <label><input type="radio" name="genero" value="femenino" checked={form.genero === 'femenino'} onChange={onChange} /> Femenino</label>
          <label><input type="radio" name="genero" value="masculino" checked={form.genero === 'masculino'} onChange={onChange} /> Masculino</label>
          <label><input type="radio" name="genero" value="otro" checked={form.genero === 'otro'} onChange={onChange} /> Otro</label>
        </div>
      </div>

      <h3 className="section-title">Contacto</h3>
      <div className="perfil-grid2">
        <div className="form-field">
          <label>Teléfono</label>
          <input name="telefono" type="tel" placeholder="+34 600 000 000" value={form.telefono} onChange={onChange} />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input name="email" type="email" value={form.email} disabled />
        </div>
      </div>

      <div className="md-actions">
        <button type="submit" className="md-btn-success">Guardar</button>
      </div>
    </form>
  );
}
