// components/zonaCliente/CuentaPanel/1_MisDatosPersonales/1.3_PrivacySettings/PrivacySettings.jsx
import { useState } from 'react';

export default function PrivacySettings({ initial = { alertMail: 'no', mk: 'no' }, onSave }) {
  const [consent, setConsent] = useState(initial);

  const onChange = (e) => {
    const { name, value } = e.target;
    setConsent((prev) => ({ ...prev, [name]: value }));
  };

  const save = (e) => {
    e.preventDefault();
    // delegar a servicio/hook para persistir
    onSave?.(consent);
  };

  return (
    <section className="md-section">
      <h3>Privacy</h3>

      <div className="md-setting-row">
        <div>
          <div className="md-setting-title">Consentimiento Alert Mail <span className="md-setting-help">(leer)</span></div>
        </div>
        <div className="md-radio-group" role="radiogroup" aria-label="Consentimiento Alert Mail">
          <label className="md-radio">
            <input type="radio" name="alertMail" value="si" checked={consent.alertMail === 'si'} onChange={onChange} />
            <span>Si</span>
          </label>
          <label className="md-radio">
            <input type="radio" name="alertMail" value="no" checked={consent.alertMail === 'no'} onChange={onChange} />
            <span>No</span>
          </label>
        </div>
      </div>

      <div className="md-setting-row">
        <div>
          <div className="md-setting-title">Consentimiento Marketing <span className="md-setting-help">(leer)</span></div>
        </div>
        <div className="md-radio-group" role="radiogroup" aria-label="Consentimiento Marketing">
          <label className="md-radio">
            <input type="radio" name="mk" value="si" checked={consent.mk === 'si'} onChange={onChange} />
            <span>Si</span>
          </label>
          <label className="md-radio">
            <input type="radio" name="mk" value="no" checked={consent.mk === 'no'} onChange={onChange} />
            <span>No</span>
          </label>
        </div>
      </div>

      <div className="md-actions">
        <button className="md-btn-success" onClick={save}>Guardar</button>
      </div>
    </section>
  );
}
