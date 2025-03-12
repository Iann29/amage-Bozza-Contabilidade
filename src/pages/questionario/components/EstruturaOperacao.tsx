import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionarioButton } from './QuestionarioButton';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';

interface EstruturaOperacaoProps {
  onNext: (data: any) => void;
  onPrevious: () => void;
}

const EstruturaOperacao: React.FC<EstruturaOperacaoProps> = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    possui_filiais: 'Não',
    filiais_quantidade: '',
    filiais_endereco: '',
    possui_socios: 'Não',
    socios_quantidade: '',
    notas_entrada: '',
    notas_saida: '',
    vendas_fora_estado: 'Não',
    importacao_exportacao: 'Não',
    importacao_exportacao_detalhes: '',
    ativo_imobilizado: 'Não'
  });

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

    // Mostrar/esconder campos adicionais com base na seleção
    if (name === 'possui_filiais') {
      const filiaisQtdContainer = document.getElementById('filiais-qtd-container');
      const filiaisEnderecoContainer = document.getElementById('filiais-endereco-container');
      
      if (filiaisQtdContainer && filiaisEnderecoContainer) {
        const display = value === 'Sim' ? 'block' : 'none';
        filiaisQtdContainer.style.display = display;
        filiaisEnderecoContainer.style.display = display;
      }
    }

    if (name === 'possui_socios') {
      const sociosQtdContainer = document.getElementById('socios-qtd-container');
      if (sociosQtdContainer) {
        sociosQtdContainer.style.display = value === 'Sim' ? 'block' : 'none';
      }
    }

    if (name === 'importacao_exportacao') {
      const impExpDetalhesContainer = document.getElementById('imp-exp-detalhes-container');
      if (impExpDetalhesContainer) {
        impExpDetalhesContainer.style.display = value === 'Sim' ? 'block' : 'none';
      }
    }
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <motion.section 
      className="form-section active" 
      id="section2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Estrutura e Operação</h2>
      
      <div className="form-group">
        <label>A empresa possui filiais?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="filiais-nao" 
              name="possui_filiais" 
              value="Não" 
              checked={formData.possui_filiais === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="filiais-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="filiais-sim" 
              name="possui_filiais" 
              value="Sim"
              checked={formData.possui_filiais === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="filiais-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className="form-group" id="filiais-qtd-container" style={{ display: formData.possui_filiais === "Sim" ? 'block' : 'none' }}>
        <label htmlFor="filiais-qtd">Quantas filiais?</label>
        <input 
          type="number" 
          id="filiais-qtd" 
          name="filiais_quantidade" 
          min="1"
          value={formData.filiais_quantidade}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group" id="filiais-endereco-container" style={{ display: formData.possui_filiais === "Sim" ? 'block' : 'none' }}>
        <label htmlFor="filiais-endereco">Endereços das filiais:</label>
        <textarea 
          id="filiais-endereco" 
          name="filiais_endereco" 
          placeholder="Informe os endereços das filiais"
          value={formData.filiais_endereco}
          onChange={handleChange}
        ></textarea>
      </div>
      
      <div className="form-group">
        <label>Possui sócios?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="socios-nao" 
              name="possui_socios" 
              value="Não" 
              checked={formData.possui_socios === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="socios-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="socios-sim" 
              name="possui_socios" 
              value="Sim"
              checked={formData.possui_socios === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="socios-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className="form-group" id="socios-qtd-container" style={{ display: formData.possui_socios === "Sim" ? 'block' : 'none' }}>
        <label htmlFor="socios-qtd">Quantos sócios?</label>
        <input 
          type="number" 
          id="socios-qtd" 
          name="socios_quantidade" 
          min="1"
          value={formData.socios_quantidade}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="notas-entrada">Volume médio mensal de notas fiscais de entrada (compras):</label>
        <input 
          type="number" 
          id="notas-entrada" 
          name="notas_entrada" 
          min="0"
          value={formData.notas_entrada}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="notas-saida">Volume médio mensal de notas fiscais de saída (vendas):</label>
        <input 
          type="number" 
          id="notas-saida" 
          name="notas_saida" 
          min="0"
          value={formData.notas_saida}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label>Possui vendas para fora do estado?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="vendas-fora-nao" 
              name="vendas_fora_estado" 
              value="Não" 
              checked={formData.vendas_fora_estado === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="vendas-fora-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="vendas-fora-sim" 
              name="vendas_fora_estado" 
              value="Sim"
              checked={formData.vendas_fora_estado === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="vendas-fora-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label>Realiza operações de importação ou exportação?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="imp-exp-nao" 
              name="importacao_exportacao" 
              value="Não" 
              checked={formData.importacao_exportacao === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="imp-exp-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="imp-exp-sim" 
              name="importacao_exportacao" 
              value="Sim"
              checked={formData.importacao_exportacao === "Sim"}
              onChange={handleRadioChange}
            />
            <label htmlFor="imp-exp-sim">Sim</label>
          </div>
        </div>
      </div>
      
      <div className="form-group" id="imp-exp-detalhes-container" style={{ display: formData.importacao_exportacao === "Sim" ? 'block' : 'none' }}>
        <label htmlFor="imp-exp-detalhes">Especifique:</label>
        <textarea 
          id="imp-exp-detalhes" 
          name="importacao_exportacao_detalhes" 
          placeholder="Detalhe as operações de importação/exportação"
          value={formData.importacao_exportacao_detalhes}
          onChange={handleChange}
        ></textarea>
      </div>
      
      <div className="form-group">
        <label>Possui algum tipo de ativo imobilizado?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input 
              type="radio" 
              id="ativo-nao" 
              name="ativo_imobilizado" 
              value="Não" 
              checked={formData.ativo_imobilizado === "Não"}
              onChange={handleRadioChange}
            />
            <label htmlFor="ativo-nao">Não</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="ativo-sim-poucos" 
              name="ativo_imobilizado" 
              value="Sim, poucos itens (até 20)"
              checked={formData.ativo_imobilizado === "Sim, poucos itens (até 20)"}
              onChange={handleRadioChange}
            />
            <label htmlFor="ativo-sim-poucos">Sim, poucos itens (até 20)</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="ativo-sim-medio" 
              name="ativo_imobilizado" 
              value="Sim, quantidade média (21 a 100)"
              checked={formData.ativo_imobilizado === "Sim, quantidade média (21 a 100)"}
              onChange={handleRadioChange}
            />
            <label htmlFor="ativo-sim-medio">Sim, quantidade média (21 a 100)</label>
          </div>
          <div className="radio-item">
            <input 
              type="radio" 
              id="ativo-sim-muitos" 
              name="ativo_imobilizado" 
              value="Sim, muitos itens (mais de 100)"
              checked={formData.ativo_imobilizado === "Sim, muitos itens (mais de 100)"}
              onChange={handleRadioChange}
            />
            <label htmlFor="ativo-sim-muitos">Sim, muitos itens (mais de 100)</label>
          </div>
        </div>
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

export default EstruturaOperacao;
