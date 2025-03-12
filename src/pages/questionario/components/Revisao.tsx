import React from 'react';
import { motion } from 'framer-motion';
import { QuestionarioButton } from './QuestionarioButton';
import { BiLeftArrowAlt, BiCheckCircle } from 'react-icons/bi';

interface RevisaoProps {
  formData: any;
  onSubmit: (e: React.FormEvent) => void;
  onPrevious: () => void;
  onNext: () => void; // Esta prop é usada no botão de envio
}

const Revisao: React.FC<RevisaoProps> = ({ formData, onSubmit, onPrevious, onNext }) => {
  // Função auxiliar para renderizar arrays em strings legíveis
  const formatArrayField = (field: string[] | undefined, separator = ', ') => {
    if (!field || !Array.isArray(field)) return '';
    return field.join(separator);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    onSubmit(e);
    onNext(); // Após o envio, avança para a tela de agradecimento
  };

  // Renderiza uma seção de revisão com título e conteúdo
  const renderReviewSection = (title: string, fields: { label: string; value: any }[]) => {
    const hasContent = fields.some(field => {
      if (Array.isArray(field.value)) return field.value.length > 0;
      return field.value && field.value.toString().trim() !== '';
    });

    if (!hasContent) return null;

    return (
      <div className="review-section">
        <h3>{title}</h3>
        {fields.map((field, index) => {
          let value = field.value;
          
          // Não mostrar campos vazios
          if (!value || (typeof value === 'string' && value.trim() === '') || 
              (Array.isArray(value) && value.length === 0)) {
            return null;
          }
          
          // Formatar arrays para exibição
          if (Array.isArray(value)) {
            value = formatArrayField(value);
          }

          return (
            <div className="review-item" key={index}>
              <strong>{field.label}:</strong>
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.section 
      className="form-section active" 
      id="section6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Revisão das Informações</h2>
      <p className="mb-4">Por favor, revise todas as informações abaixo antes de enviar o formulário.</p>
      
      {renderReviewSection('Informações da Empresa', [
        { label: 'Razão Social', value: formData.razao_social },
        { label: 'Nome Fantasia', value: formData.nome_fantasia },
        { label: 'CNPJ', value: formData.cnpj },
        { label: 'Data de Fundação', value: formData.data_fundacao },
        { label: 'Endereço', value: formData.endereco },
        { label: 'Telefone', value: formData.telefone },
        { label: 'E-mail', value: formData.email },
        { label: 'Site', value: formData.site },
        { label: 'Regime Tributário', value: formData.regime_tributario === 'Outro' 
          ? `Outro: ${formData.regime_tributario_outro}` 
          : formData.regime_tributario },
        { label: 'Setor de Atuação', value: formData.setor_atuacao === 'Outro' 
          ? `Outro: ${formData.setor_atuacao_outro}` 
          : formData.setor_atuacao },
        { label: 'Atividade Principal', value: formData.atividade_principal },
        { label: 'Faturamento Médio Mensal', value: formData.faturamento },
        { label: 'Número de Funcionários', value: formData.funcionarios }
      ])}
      
      {renderReviewSection('Estrutura e Operação', [
        { label: 'Possui Filiais', value: formData.possui_filiais },
        { label: 'Quantidade de Filiais', value: formData.filiais_quantidade },
        { label: 'Endereços das Filiais', value: formData.filiais_endereco },
        { label: 'Possui Sócios', value: formData.possui_socios },
        { label: 'Quantidade de Sócios', value: formData.socios_quantidade },
        { label: 'Volume de Notas de Entrada', value: formData.notas_entrada },
        { label: 'Volume de Notas de Saída', value: formData.notas_saida },
        { label: 'Vendas Fora do Estado', value: formData.vendas_fora_estado },
        { label: 'Importação/Exportação', value: formData.importacao_exportacao },
        { label: 'Detalhes de Importação/Exportação', value: formData.importacao_exportacao_detalhes },
        { label: 'Ativo Imobilizado', value: formData.ativo_imobilizado }
      ])}
      
      {renderReviewSection('Serviços e Necessidades', [
        { label: 'Serviços Contábeis', value: formatArrayField(formData.servicos_contabeis) },
        { label: 'Outros Serviços Contábeis', value: formData.servicos_contabeis_outro },
        { label: 'Serviços Fiscais', value: formatArrayField(formData.servicos_fiscais) },
        { label: 'Outros Serviços Fiscais', value: formData.servicos_fiscais_outro },
        { label: 'Folha de Pagamento', value: formData.folha_pagamento },
        { label: 'Funcionários na Folha', value: formData.folha_pagamento_funcionarios },
        { label: 'Consultoria Empresarial', value: formatArrayField(formData.consultoria_empresarial) },
        { label: 'Outras Consultorias', value: formData.consultoria_empresarial_outro },
        { label: 'Planejamento Tributário', value: formData.planejamento_tributario },
        { label: 'Consultoria Societária', value: formData.consultoria_societaria },
        { label: 'Necessidades Específicas', value: formData.necessidades_especificas }
      ])}
      
      {renderReviewSection('Informações Adicionais', [
        { label: 'Sistema de Gestão', value: formData.sistema_gestao },
        { label: 'Nome do Sistema', value: formData.sistema_gestao_nome },
        { label: 'Possui Contabilidade Atual', value: formData.contabilidade_atual },
        { label: 'Motivo da Troca', value: formData.motivo_troca },
        { label: 'Prazo para Proposta', value: formData.prazo_entrega },
        { label: 'Expectativas', value: formData.expectativas },
        { label: 'Orçamento', value: formData.orcamento },
        { label: 'Outras Informações', value: formData.outras_informacoes }
      ])}
      
      {renderReviewSection('Informações de Contato', [
        { label: 'Nome do Contato', value: formData.nome_contato },
        { label: 'Cargo', value: formData.cargo_contato },
        { label: 'E-mail', value: formData.email_contato },
        { label: 'Telefone', value: formData.telefone_contato },
        { label: 'Celular', value: formData.celular_contato },
        { label: 'WhatsApp', value: formData.whatsapp },
        { label: 'Meio de Contato Preferido', value: formData.meio_contato_preferido },
        { label: 'Horário de Contato Preferido', value: formData.horario_contato_preferido },
        { label: 'Deseja Agendar Reunião', value: formData.agendamento },
        { label: 'Data e Hora para Reunião', value: formData.data_horario_agendamento }
      ])}
      
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
          type="submit" 
          variant="submit"
          onClick={handleSubmit}
          icon={<BiCheckCircle size={20} />}
        >
          Enviar
        </QuestionarioButton>
      </div>
    </motion.section>
  );
};

export default Revisao;
