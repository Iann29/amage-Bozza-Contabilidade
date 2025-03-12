import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionarioButton } from './QuestionarioButton';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';

interface InformacoesAdicionaisProps {
  onNext: (data: any) => void;
  onPrevious: () => void;
}

const InformacoesAdicionais: React.FC<InformacoesAdicionaisProps> = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    sistema_gestao: 'Não',
    sistema_gestao_nome: '',
    contabilidade_atual: 'Não',
    motivo_troca: '',
    prazo_entrega: '',
    expectativas: '',
    orcamento: '',
    outras_informacoes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    // Mostrar/esconder campo do nome do sistema de gestão
    if (name === 'sistema_gestao') {
      const sistemaNomeContainer = document.getElementById('sistema-nome-container');
      if (sistemaNomeContainer) {
        sistemaNomeContainer.style.display = value === 'Sim' ? 'block' : 'none';
      }
    }

    // Mostrar/esconder campo do motivo de troca da contabilidade
    if (name === 'contabilidade_atual') {
      const motivoTrocaContainer = document.getElementById('motivo-troca-container');
      if (motivoTrocaContainer) {
        motivoTrocaContainer.style.display = value === 'Sim' ? 'block' : 'none';
      }
    }
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <motion.section 
      className="form-section active" 
      id="section4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Informações Adicionais</h2>
      
      <div className="form-group">
        <label>Utiliza algum sistema de gestão (ERP)?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="sistema-nao" 
              name="sistema_gestao" 
              value="Não" 
              checked={formData.sistema_gestao === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="sistema-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="sistema-sim" 
              name="sistema_gestao" 
              value="Sim"
              checked={formData.sistema_gestao === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="sistema-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className="form-group" id="sistema-nome-container" style={{ display: formData.sistema_gestao === "Sim" ? 'block' : 'none' }}>
        <label htmlFor="sistema-nome">Qual sistema utiliza?</label>
        <input 
          type="text" 
          id="sistema-nome" 
          name="sistema_gestao_nome" 
          placeholder="Nome do sistema de gestão"
          value={formData.sistema_gestao_nome}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label>Já possui contabilidade atualmente?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="contabilidade-nao" 
              name="contabilidade_atual" 
              value="Não" 
              checked={formData.contabilidade_atual === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="contabilidade-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="contabilidade-sim" 
              name="contabilidade_atual" 
              value="Sim"
              checked={formData.contabilidade_atual === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="contabilidade-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className="form-group" id="motivo-troca-container" style={{ display: formData.contabilidade_atual === "Sim" ? 'block' : 'none' }}>
        <label htmlFor="motivo-troca">Motivo da troca:</label>
        <textarea 
          id="motivo-troca" 
          name="motivo_troca" 
          placeholder="Descreva o motivo pelo qual deseja trocar de contabilidade"
          value={formData.motivo_troca}
          onChange={handleChange}
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="prazo-entrega">Qual o prazo que você necessita para receber uma proposta?</label>
        <select 
          id="prazo-entrega" 
          name="prazo_entrega"
          value={formData.prazo_entrega}
          onChange={handleChange}
        >
          <option value="">Selecione uma opção</option>
          <option value="Urgente (até 2 dias)">Urgente (até 2 dias)</option>
          <option value="Rápido (3 a 5 dias)">Rápido (3 a 5 dias)</option>
          <option value="Normal (1 a 2 semanas)">Normal (1 a 2 semanas)</option>
          <option value="Sem pressa (mais de 2 semanas)">Sem pressa (mais de 2 semanas)</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="expectativas">Quais são suas principais expectativas em relação aos serviços contábeis?</label>
        <textarea 
          id="expectativas" 
          name="expectativas" 
          placeholder="Descreva suas expectativas"
          value={formData.expectativas}
          onChange={handleChange}
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="orcamento">Qual o orçamento disponível para serviços contábeis?</label>
        <select 
          id="orcamento" 
          name="orcamento"
          value={formData.orcamento}
          onChange={handleChange}
        >
          <option value="">Selecione uma faixa</option>
          <option value="Até R$ 500/mês">Até R$ 500/mês</option>
          <option value="De R$ 501 a R$ 1.000/mês">De R$ 501 a R$ 1.000/mês</option>
          <option value="De R$ 1.001 a R$ 2.000/mês">De R$ 1.001 a R$ 2.000/mês</option>
          <option value="De R$ 2.001 a R$ 3.000/mês">De R$ 2.001 a R$ 3.000/mês</option>
          <option value="De R$ 3.001 a R$ 5.000/mês">De R$ 3.001 a R$ 5.000/mês</option>
          <option value="Acima de R$ 5.000/mês">Acima de R$ 5.000/mês</option>
          <option value="A definir conforme proposta">A definir conforme proposta</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="outras-informacoes">Outras informações relevantes:</label>
        <textarea 
          id="outras-informacoes" 
          name="outras_informacoes" 
          placeholder="Compartilhe outras informações que possam ser relevantes para a elaboração da proposta"
          value={formData.outras_informacoes}
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

export default InformacoesAdicionais;
