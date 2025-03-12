import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionarioButton } from './QuestionarioButton';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';

interface ServicosNecessidadesProps {
  onNext: (data: any) => void;
  onPrevious: () => void;
}

const ServicosNecessidades: React.FC<ServicosNecessidadesProps> = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    servicos_contabeis: [] as string[],
    servicos_contabeis_outro: '',
    servicos_fiscais: [] as string[],
    servicos_fiscais_outro: '',
    folha_pagamento: 'Não',
    folha_pagamento_funcionarios: '',
    consultoria_empresarial: [] as string[],
    consultoria_empresarial_outro: '',
    planejamento_tributario: 'Não',
    consultoria_societaria: 'Não',
    necessidades_especificas: ''
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [name]: [...prev[name as keyof typeof prev] as string[], value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
      }));
    }

    // Mostrar/esconder campo "Outro" para Serviços Contábeis
    if (name === 'servicos_contabeis') {
      const contabeisOutroContainer = document.getElementById('contabeis-outro-container');
      if (contabeisOutroContainer) {
        const showOther = (formData.servicos_contabeis as string[]).includes('Outro') || (value === 'Outro' && checked);
        contabeisOutroContainer.style.display = showOther ? 'flex' : 'none';
      }
    }

    // Mostrar/esconder campo "Outro" para Serviços Fiscais
    if (name === 'servicos_fiscais') {
      const fiscaisOutroContainer = document.getElementById('fiscais-outro-container');
      if (fiscaisOutroContainer) {
        const showOther = (formData.servicos_fiscais as string[]).includes('Outro') || (value === 'Outro' && checked);
        fiscaisOutroContainer.style.display = showOther ? 'flex' : 'none';
      }
    }

    // Mostrar/esconder campo "Outro" para Consultoria Empresarial
    if (name === 'consultoria_empresarial') {
      const consultoriaOutroContainer = document.getElementById('consultoria-outro-container');
      if (consultoriaOutroContainer) {
        const showOther = (formData.consultoria_empresarial as string[]).includes('Outro') || (value === 'Outro' && checked);
        consultoriaOutroContainer.style.display = showOther ? 'flex' : 'none';
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mostrar/esconder campo de quantidade de funcionários para Folha de Pagamento
    if (name === 'folha_pagamento') {
      const folhaQtdContainer = document.getElementById('folha-qtd-container');
      if (folhaQtdContainer) {
        folhaQtdContainer.style.display = value === 'Sim' ? 'block' : 'none';
      }
    }
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <motion.section 
      className="form-section active" 
      id="section3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Serviços e Necessidades</h2>
      
      <div className="form-group">
        <label>Quais serviços contábeis você necessita?</label>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="contabeis-lanc" 
              name="servicos_contabeis" 
              value="Lançamentos Contábeis"
              checked={(formData.servicos_contabeis as string[]).includes("Lançamentos Contábeis")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="contabeis-lanc">Lançamentos Contábeis</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="contabeis-demonst" 
              name="servicos_contabeis" 
              value="Demonstrações Contábeis"
              checked={(formData.servicos_contabeis as string[]).includes("Demonstrações Contábeis")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="contabeis-demonst">Demonstrações Contábeis</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="contabeis-concil" 
              name="servicos_contabeis" 
              value="Conciliações Bancárias"
              checked={(formData.servicos_contabeis as string[]).includes("Conciliações Bancárias")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="contabeis-concil">Conciliações Bancárias</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="contabeis-relat" 
              name="servicos_contabeis" 
              value="Relatórios Gerenciais"
              checked={(formData.servicos_contabeis as string[]).includes("Relatórios Gerenciais")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="contabeis-relat">Relatórios Gerenciais</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="contabeis-atend" 
              name="servicos_contabeis" 
              value="Atendimento a Auditorias"
              checked={(formData.servicos_contabeis as string[]).includes("Atendimento a Auditorias")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="contabeis-atend">Atendimento a Auditorias</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="contabeis-outro" 
              name="servicos_contabeis" 
              value="Outro"
              checked={(formData.servicos_contabeis as string[]).includes("Outro")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="contabeis-outro">Outro</label>
          </div>
          <div className="checkbox-other" id="contabeis-outro-container" style={{ display: (formData.servicos_contabeis as string[]).includes("Outro") ? 'flex' : 'none' }}>
            <input 
              type="text" 
              id="contabeis-outro-texto" 
              name="servicos_contabeis_outro" 
              placeholder="Especifique outros serviços contábeis"
              value={formData.servicos_contabeis_outro}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label>Quais serviços fiscais você necessita?</label>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="fiscais-escrit" 
              name="servicos_fiscais" 
              value="Escrituração Fiscal"
              checked={(formData.servicos_fiscais as string[]).includes("Escrituração Fiscal")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="fiscais-escrit">Escrituração Fiscal</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="fiscais-apuracao" 
              name="servicos_fiscais" 
              value="Apuração de Impostos"
              checked={(formData.servicos_fiscais as string[]).includes("Apuração de Impostos")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="fiscais-apuracao">Apuração de Impostos</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="fiscais-obrig" 
              name="servicos_fiscais" 
              value="Obrigações Acessórias"
              checked={(formData.servicos_fiscais as string[]).includes("Obrigações Acessórias")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="fiscais-obrig">Obrigações Acessórias</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="fiscais-nf" 
              name="servicos_fiscais" 
              value="Emissão de Notas Fiscais"
              checked={(formData.servicos_fiscais as string[]).includes("Emissão de Notas Fiscais")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="fiscais-nf">Emissão de Notas Fiscais</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="fiscais-atend" 
              name="servicos_fiscais" 
              value="Atendimento a Fiscalizações"
              checked={(formData.servicos_fiscais as string[]).includes("Atendimento a Fiscalizações")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="fiscais-atend">Atendimento a Fiscalizações</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="fiscais-outro" 
              name="servicos_fiscais" 
              value="Outro"
              checked={(formData.servicos_fiscais as string[]).includes("Outro")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="fiscais-outro">Outro</label>
          </div>
          <div className="checkbox-other" id="fiscais-outro-container" style={{ display: (formData.servicos_fiscais as string[]).includes("Outro") ? 'flex' : 'none' }}>
            <input 
              type="text" 
              id="fiscais-outro-texto" 
              name="servicos_fiscais_outro" 
              placeholder="Especifique outros serviços fiscais"
              value={formData.servicos_fiscais_outro}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label>Necessita de serviços de folha de pagamento?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="folha-nao" 
              name="folha_pagamento" 
              value="Não" 
              checked={formData.folha_pagamento === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="folha-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="folha-sim" 
              name="folha_pagamento" 
              value="Sim"
              checked={formData.folha_pagamento === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="folha-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className="form-group" id="folha-qtd-container" style={{ display: formData.folha_pagamento === "Sim" ? 'block' : 'none' }}>
        <label htmlFor="folha-qtd">Quantidade de funcionários na folha:</label>
        <input 
          type="number" 
          id="folha-qtd" 
          name="folha_pagamento_funcionarios" 
          min="1"
          value={formData.folha_pagamento_funcionarios}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label>Necessita de serviços de consultoria empresarial?</label>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="consultoria-financeira" 
              name="consultoria_empresarial" 
              value="Consultoria Financeira"
              checked={(formData.consultoria_empresarial as string[]).includes("Consultoria Financeira")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="consultoria-financeira">Consultoria Financeira</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="consultoria-custos" 
              name="consultoria_empresarial" 
              value="Gestão de Custos"
              checked={(formData.consultoria_empresarial as string[]).includes("Gestão de Custos")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="consultoria-custos">Gestão de Custos</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="consultoria-controles" 
              name="consultoria_empresarial" 
              value="Controles Internos"
              checked={(formData.consultoria_empresarial as string[]).includes("Controles Internos")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="consultoria-controles">Controles Internos</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="consultoria-processos" 
              name="consultoria_empresarial" 
              value="Melhoria de Processos"
              checked={(formData.consultoria_empresarial as string[]).includes("Melhoria de Processos")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="consultoria-processos">Melhoria de Processos</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="consultoria-outro" 
              name="consultoria_empresarial" 
              value="Outro"
              checked={(formData.consultoria_empresarial as string[]).includes("Outro")}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="consultoria-outro">Outro</label>
          </div>
          <div className="checkbox-other" id="consultoria-outro-container" style={{ display: (formData.consultoria_empresarial as string[]).includes("Outro") ? 'flex' : 'none' }}>
            <input 
              type="text" 
              id="consultoria-outro-texto" 
              name="consultoria_empresarial_outro" 
              placeholder="Especifique outros serviços de consultoria"
              value={formData.consultoria_empresarial_outro}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label>Necessita de planejamento tributário?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="planejamento-nao" 
              name="planejamento_tributario" 
              value="Não" 
              checked={formData.planejamento_tributario === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="planejamento-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="planejamento-sim" 
              name="planejamento_tributario" 
              value="Sim"
              checked={formData.planejamento_tributario === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="planejamento-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label>Necessita de consultoria societária?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="societaria-nao" 
              name="consultoria_societaria" 
              value="Não" 
              checked={formData.consultoria_societaria === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="societaria-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="societaria-sim" 
              name="consultoria_societaria" 
              value="Sim"
              checked={formData.consultoria_societaria === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="societaria-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="necessidades-especificas">Necessidades específicas ou problemas que precisam ser resolvidos:</label>
        <textarea 
          id="necessidades-especificas" 
          name="necessidades_especificas" 
          placeholder="Descreva necessidades específicas ou problemas que sua empresa enfrenta e que você gostaria de resolver com nossos serviços"
          value={formData.necessidades_especificas}
          onChange={handleChange}
        ></textarea>
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

export default ServicosNecessidades;
