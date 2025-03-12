import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionarioButton } from './QuestionarioButton';
import { BiRightArrowAlt } from 'react-icons/bi';

interface InformacoesEmpresaProps {
  onNext: (data: any) => void;
}

const InformacoesEmpresa: React.FC<InformacoesEmpresaProps> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    razao_social: '',
    nome_fantasia: '',
    cnpj: '',
    data_fundacao: '',
    endereco: '',
    telefone: '',
    email: '',
    site: '',
    regime_tributario: '',
    regime_tributario_outro: '',
    setor_atuacao: '',
    setor_atuacao_outro: '',
    atividade_principal: '',
    faturamento: '',
    funcionarios: ''
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    // Mostrar/esconder campos adicionais para "Outro"
    if (name === 'regime_tributario') {
      const regimeOutroContainer = document.getElementById('regime-outro-container');
      if (regimeOutroContainer) {
        regimeOutroContainer.style.display = value === 'Outro' ? 'flex' : 'none';
      }
    }

    if (name === 'setor_atuacao') {
      const setorOutroContainer = document.getElementById('setor-outro-container');
      if (setorOutroContainer) {
        setorOutroContainer.style.display = value === 'Outro' ? 'flex' : 'none';
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
    if (!formData.razao_social.trim()) newErrors.razao_social = true;
    if (!formData.cnpj.trim()) newErrors.cnpj = true;
    if (!formData.telefone.trim()) newErrors.telefone = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.regime_tributario) newErrors.regime_tributario = true;
    if (!formData.setor_atuacao) newErrors.setor_atuacao = true;
    if (!formData.atividade_principal.trim()) newErrors.atividade_principal = true;
    if (!formData.faturamento) newErrors.faturamento = true;
    if (!formData.funcionarios) newErrors.funcionarios = true;
    
    // Validações específicas
    // Validar CNPJ
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (formData.cnpj && !cnpjRegex.test(formData.cnpj)) {
      newErrors.cnpj = true;
    }
    
    // Validar telefone
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (formData.telefone && !telefoneRegex.test(formData.telefone)) {
      newErrors.telefone = true;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = true;
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
      id="section1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Informações da Empresa</h2>
      
      <div className={`form-group ${errors.razao_social ? 'has-error' : ''}`}>
        <label htmlFor="razao-social">Razão Social <span className="required">*</span></label>
        <input 
          type="text" 
          id="razao-social" 
          name="razao_social" 
          value={formData.razao_social}
          onChange={handleChange}
          required 
        />
        <div className="error-message">Este campo é obrigatório</div>
      </div>
      
      <div className="form-group">
        <label htmlFor="nome-fantasia">Nome Fantasia</label>
        <input 
          type="text" 
          id="nome-fantasia" 
          name="nome_fantasia"
          value={formData.nome_fantasia}
          onChange={handleChange}
        />
      </div>
      
      <div className={`form-group ${errors.cnpj ? 'has-error' : ''}`}>
        <label htmlFor="cnpj">CNPJ <span className="required">*</span></label>
        <input 
          type="text" 
          id="cnpj" 
          name="cnpj" 
          placeholder="00.000.000/0000-00" 
          value={formData.cnpj}
          onChange={handleChange}
          required 
        />
        <div className="error-message">CNPJ inválido</div>
      </div>
      
      <div className="form-group">
        <label htmlFor="data-fundacao">Data de Fundação</label>
        <input 
          type="text" 
          id="data-fundacao" 
          name="data_fundacao" 
          placeholder="DD/MM/AAAA"
          value={formData.data_fundacao}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="endereco">Endereço Completo</label>
        <textarea 
          id="endereco" 
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
        ></textarea>
      </div>
      
      <div className={`form-group ${errors.telefone ? 'has-error' : ''}`}>
        <label htmlFor="telefone">Telefone <span className="required">*</span></label>
        <input 
          type="tel" 
          id="telefone" 
          name="telefone" 
          placeholder="(00) 00000-0000" 
          value={formData.telefone}
          onChange={handleChange}
          required 
        />
        <div className="error-message">Telefone inválido</div>
      </div>
      
      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
        <label htmlFor="email">E-mail para Contato <span className="required">*</span></label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <div className="error-message">E-mail inválido</div>
      </div>
      
      <div className="form-group">
        <label htmlFor="site">Site (se houver)</label>
        <input 
          type="text" 
          id="site" 
          name="site"
          value={formData.site}
          onChange={handleChange}
        />
      </div>
      
      <div className={`form-group ${errors.regime_tributario ? 'has-error' : ''}`}>
        <label>Regime Tributário Atual <span className="required">*</span></label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="regime-simples" 
              name="regime_tributario" 
              value="Simples Nacional" 
              checked={formData.regime_tributario === "Simples Nacional"}
              onChange={handleRadioChange}
              required 
            />
            <label htmlFor="regime-simples">Simples Nacional</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="regime-presumido" 
              name="regime_tributario" 
              value="Lucro Presumido"
              checked={formData.regime_tributario === "Lucro Presumido"}
              onChange={handleRadioChange}
            />
            <label htmlFor="regime-presumido">Lucro Presumido</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="regime-real" 
              name="regime_tributario" 
              value="Lucro Real"
              checked={formData.regime_tributario === "Lucro Real"}
              onChange={handleRadioChange}
            />
            <label htmlFor="regime-real">Lucro Real</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="regime-mei" 
              name="regime_tributario" 
              value="MEI"
              checked={formData.regime_tributario === "MEI"}
              onChange={handleRadioChange}
            />
            <label htmlFor="regime-mei">MEI</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="regime-outro" 
              name="regime_tributario" 
              value="Outro"
              checked={formData.regime_tributario === "Outro"}
              onChange={handleRadioChange}
            />
            <label htmlFor="regime-outro">Outro</label>
          </div>
          <div className="radio-other" id="regime-outro-container" style={{ display: formData.regime_tributario === "Outro" ? 'flex' : 'none' }}>
            <input 
              type="text" 
              id="regime-outro-texto" 
              name="regime_tributario_outro" 
              placeholder="Especifique o regime tributário"
              value={formData.regime_tributario_outro}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="error-message">Selecione uma opção</div>
      </div>
      
      <div className={`form-group ${errors.setor_atuacao ? 'has-error' : ''}`}>
        <label>Setor de Atuação <span className="required">*</span></label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="setor-comercio" 
              name="setor_atuacao" 
              value="Comércio" 
              checked={formData.setor_atuacao === "Comércio"}
              onChange={handleRadioChange}
              required 
            />
            <label htmlFor="setor-comercio">Comércio</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="setor-servicos" 
              name="setor_atuacao" 
              value="Serviços"
              checked={formData.setor_atuacao === "Serviços"}
              onChange={handleRadioChange}
            />
            <label htmlFor="setor-servicos">Serviços</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="setor-industria" 
              name="setor_atuacao" 
              value="Indústria"
              checked={formData.setor_atuacao === "Indústria"}
              onChange={handleRadioChange}
            />
            <label htmlFor="setor-industria">Indústria</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="setor-comercio-servicos" 
              name="setor_atuacao" 
              value="Comércio e Serviços"
              checked={formData.setor_atuacao === "Comércio e Serviços"}
              onChange={handleRadioChange}
            />
            <label htmlFor="setor-comercio-servicos">Comércio e Serviços</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="setor-outro" 
              name="setor_atuacao" 
              value="Outro"
              checked={formData.setor_atuacao === "Outro"}
              onChange={handleRadioChange}
            />
            <label htmlFor="setor-outro">Outro</label>
          </div>
          <div className="radio-other" id="setor-outro-container" style={{ display: formData.setor_atuacao === "Outro" ? 'flex' : 'none' }}>
            <input 
              type="text" 
              id="setor-outro-texto" 
              name="setor_atuacao_outro" 
              placeholder="Especifique o setor de atuação"
              value={formData.setor_atuacao_outro}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="error-message">Selecione uma opção</div>
      </div>
      
      <div className={`form-group ${errors.atividade_principal ? 'has-error' : ''}`}>
        <label htmlFor="atividade-principal">Detalhamento da Atividade Principal <span className="required">*</span></label>
        <textarea 
          id="atividade-principal" 
          name="atividade_principal" 
          value={formData.atividade_principal}
          onChange={handleChange}
          required
        ></textarea>
        <div className="error-message">Este campo é obrigatório</div>
      </div>
      
      <div className={`form-group ${errors.faturamento ? 'has-error' : ''}`}>
        <label>Faturamento Médio Mensal <span className="required">*</span></label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="faturamento-1" 
              name="faturamento" 
              value="Até R$ 10.000" 
              checked={formData.faturamento === "Até R$ 10.000"}
              onChange={handleRadioChange}
              required 
            />
            <label htmlFor="faturamento-1">Até R$ 10.000</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="faturamento-2" 
              name="faturamento" 
              value="De R$ 10.001 a R$ 30.000"
              checked={formData.faturamento === "De R$ 10.001 a R$ 30.000"}
              onChange={handleRadioChange}
            />
            <label htmlFor="faturamento-2">De R$ 10.001 a R$ 30.000</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="faturamento-3" 
              name="faturamento" 
              value="De R$ 30.001 a R$ 100.000"
              checked={formData.faturamento === "De R$ 30.001 a R$ 100.000"}
              onChange={handleRadioChange}
            />
            <label htmlFor="faturamento-3">De R$ 30.001 a R$ 100.000</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="faturamento-4" 
              name="faturamento" 
              value="De R$ 100.001 a R$ 300.000"
              checked={formData.faturamento === "De R$ 100.001 a R$ 300.000"}
              onChange={handleRadioChange}
            />
            <label htmlFor="faturamento-4">De R$ 100.001 a R$ 300.000</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="faturamento-5" 
              name="faturamento" 
              value="De R$ 300.001 a R$ 1.000.000"
              checked={formData.faturamento === "De R$ 300.001 a R$ 1.000.000"}
              onChange={handleRadioChange}
            />
            <label htmlFor="faturamento-5">De R$ 300.001 a R$ 1.000.000</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="faturamento-6" 
              name="faturamento" 
              value="Acima de R$ 1.000.000"
              checked={formData.faturamento === "Acima de R$ 1.000.000"}
              onChange={handleRadioChange}
            />
            <label htmlFor="faturamento-6">Acima de R$ 1.000.000</label>
          </div>
        </div>
        <div className="error-message">Selecione uma opção</div>
      </div>
      
      <div className={`form-group ${errors.funcionarios ? 'has-error' : ''}`}>
        <label>Número de Funcionários <span className="required">*</span></label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="funcionarios-0" 
              name="funcionarios" 
              value="Nenhum" 
              checked={formData.funcionarios === "Nenhum"}
              onChange={handleRadioChange}
              required 
            />
            <label htmlFor="funcionarios-0">Nenhum</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="funcionarios-1" 
              name="funcionarios" 
              value="1 a 5"
              checked={formData.funcionarios === "1 a 5"}
              onChange={handleRadioChange}
            />
            <label htmlFor="funcionarios-1">1 a 5</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="funcionarios-2" 
              name="funcionarios" 
              value="6 a 10"
              checked={formData.funcionarios === "6 a 10"}
              onChange={handleRadioChange}
            />
            <label htmlFor="funcionarios-2">6 a 10</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="funcionarios-3" 
              name="funcionarios" 
              value="11 a 20"
              checked={formData.funcionarios === "11 a 20"}
              onChange={handleRadioChange}
            />
            <label htmlFor="funcionarios-3">11 a 20</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="funcionarios-4" 
              name="funcionarios" 
              value="21 a 50"
              checked={formData.funcionarios === "21 a 50"}
              onChange={handleRadioChange}
            />
            <label htmlFor="funcionarios-4">21 a 50</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="funcionarios-5" 
              name="funcionarios" 
              value="Mais de 50"
              checked={formData.funcionarios === "Mais de 50"}
              onChange={handleRadioChange}
            />
            <label htmlFor="funcionarios-5">Mais de 50</label>
          </div>
        </div>
        <div className="error-message">Selecione uma opção</div>
      </div>
      
      <div className="btn-container">
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

export default InformacoesEmpresa;
