import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionarioButton } from './QuestionarioButton';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';

interface ContatoProps {
  onNext: (data: any) => void;
  onPrevious: () => void;
}

const Contato: React.FC<ContatoProps> = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    nome_contato: '',
    cargo_contato: '',
    email_contato: '',
    telefone_contato: '',
    celular_contato: '',
    whatsapp: 'Não',
    meio_contato_preferido: '',
    horario_contato_preferido: '',
    agendamento: 'Não',
    data_horario_agendamento: ''
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpa o erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mostrar/esconder campo de agendamento
    if (name === 'agendamento') {
      const agendamentoContainer = document.getElementById('agendamento-container');
      if (agendamentoContainer) {
        agendamentoContainer.style.display = value === 'Sim' ? 'block' : 'none';
      }
    }

    // Limpa o erro quando o usuário seleciona uma opção
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    
    // Campos obrigatórios
    if (!formData.nome_contato.trim()) newErrors.nome_contato = true;
    if (!formData.email_contato.trim()) newErrors.email_contato = true;
    if (!formData.telefone_contato.trim() && !formData.celular_contato.trim()) {
      newErrors.telefone_contato = true;
      newErrors.celular_contato = true;
    }
    if (!formData.meio_contato_preferido) newErrors.meio_contato_preferido = true;
    
    // Validações específicas
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email_contato && !emailRegex.test(formData.email_contato)) {
      newErrors.email_contato = true;
    }
    
    // Validar telefone
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (formData.telefone_contato && !telefoneRegex.test(formData.telefone_contato)) {
      newErrors.telefone_contato = true;
    }
    
    // Validar celular
    if (formData.celular_contato && !telefoneRegex.test(formData.celular_contato)) {
      newErrors.celular_contato = true;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <motion.section 
      className="form-section active" 
      id="section5"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Informações de Contato</h2>
      
      <div className={`form-group ${errors.nome_contato ? 'has-error' : ''}`}>
        <label htmlFor="nome-contato">Nome Completo <span className="required">*</span></label>
        <input 
          type="text" 
          id="nome-contato" 
          name="nome_contato" 
          value={formData.nome_contato}
          onChange={handleChange}
          required 
        />
        <div className="error-message">Este campo é obrigatório</div>
      </div>
      
      <div className="form-group">
        <label htmlFor="cargo-contato">Cargo</label>
        <input 
          type="text" 
          id="cargo-contato" 
          name="cargo_contato"
          value={formData.cargo_contato}
          onChange={handleChange}
        />
      </div>
      
      <div className={`form-group ${errors.email_contato ? 'has-error' : ''}`}>
        <label htmlFor="email-contato">E-mail <span className="required">*</span></label>
        <input 
          type="email" 
          id="email-contato" 
          name="email_contato" 
          value={formData.email_contato}
          onChange={handleChange}
          required 
        />
        <div className="error-message">E-mail inválido</div>
      </div>
      
      <div className={`form-group ${errors.telefone_contato ? 'has-error' : ''}`}>
        <label htmlFor="telefone-contato">Telefone Comercial <span className="required">*</span></label>
        <input 
          type="tel" 
          id="telefone-contato" 
          name="telefone_contato" 
          placeholder="(00) 0000-0000" 
          value={formData.telefone_contato}
          onChange={handleChange}
          required 
        />
        <div className="error-message">Informe pelo menos um telefone válido</div>
      </div>
      
      <div className={`form-group ${errors.celular_contato ? 'has-error' : ''}`}>
        <label htmlFor="celular-contato">Celular <span className="required">*</span></label>
        <input 
          type="tel" 
          id="celular-contato" 
          name="celular_contato" 
          placeholder="(00) 00000-0000" 
          value={formData.celular_contato}
          onChange={handleChange}
          required 
        />
        <div className="error-message">Informe pelo menos um telefone válido</div>
      </div>
      
      <div className="form-group">
        <label>O celular tem WhatsApp?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="whatsapp-nao" 
              name="whatsapp" 
              value="Não" 
              checked={formData.whatsapp === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="whatsapp-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="whatsapp-sim" 
              name="whatsapp" 
              value="Sim"
              checked={formData.whatsapp === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="whatsapp-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className={`form-group ${errors.meio_contato_preferido ? 'has-error' : ''}`}>
        <label htmlFor="meio-contato">Meio de contato preferido <span className="required">*</span></label>
        <select 
          id="meio-contato" 
          name="meio_contato_preferido"
          value={formData.meio_contato_preferido}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma opção</option>
          <option value="E-mail">E-mail</option>
          <option value="Telefone">Telefone</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Videochamada">Videochamada</option>
          <option value="Presencial">Presencial</option>
        </select>
        <div className="error-message">Selecione uma opção</div>
      </div>
      
      <div className="form-group">
        <label htmlFor="horario-contato">Horário preferido para contato</label>
        <select 
          id="horario-contato" 
          name="horario_contato_preferido"
          value={formData.horario_contato_preferido}
          onChange={handleChange}
        >
          <option value="">Selecione uma opção</option>
          <option value="Manhã (8h às 12h)">Manhã (8h às 12h)</option>
          <option value="Tarde (13h às 18h)">Tarde (13h às 18h)</option>
          <option value="Noite (após 18h)">Noite (após 18h)</option>
          <option value="Qualquer horário comercial">Qualquer horário comercial</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Gostaria de agendar uma reunião para discutir a proposta?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="agendamento-nao" 
              name="agendamento" 
              value="Não" 
              checked={formData.agendamento === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="agendamento-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="agendamento-sim" 
              name="agendamento" 
              value="Sim"
              checked={formData.agendamento === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="agendamento-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className="form-group" id="agendamento-container" style={{ display: formData.agendamento === "Sim" ? 'block' : 'none' }}>
        <label htmlFor="agendamento-data">Data e horário preferidos para a reunião:</label>
        <input 
          type="text" 
          id="agendamento-data" 
          name="data_horario_agendamento" 
          placeholder="Ex: 15/04/2025 às 14:00"
          value={formData.data_horario_agendamento}
          onChange={handleChange}
        />
      </div>
      
      <div className="btn-container">
        <QuestionarioButton 
          type="button" 
          variant="prev"
          onClick={onPrevious}
          icon={<BiLeftArrowAlt size={20} />}
        >
          Anterior
        </QuestionarioButton>
        <QuestionarioButton 
          type="button" 
          variant="next"
          onClick={handleNext}
          icon={<BiRightArrowAlt size={20} />}
        >
          Próximo
        </QuestionarioButton>
      </div>
    </motion.section>
  );
};

export default Contato;
