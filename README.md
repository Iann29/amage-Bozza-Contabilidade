# Busca de Aeroportos

Sistema de busca de aeroportos com suporte a filtros por região e busca por texto. O projeto foi desenvolvido usando React, TypeScript e Tailwind CSS.

## Funcionalidades

- Busca de aeroportos por região (Brasil, América Latina, América do Norte, Europa, Ásia, África e Oceania)
- Busca por texto (código IATA, nome do aeroporto, cidade ou país)
- Interface responsiva e moderna
- Suporte a acessibilidade
- Feedback visual durante a busca
- Debounce na busca para melhor performance

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Lodash (para debounce)
- Lucide React (para ícones)

## Estrutura do Projeto

```
src/
  ├── components/
  │   ├── AirportSearch.tsx      # Componente de busca geral
  │   ├── RegionalAirportSearch.tsx  # Componente de busca por região
  │   └── Logo.tsx               # Componente do logo
  ├── data/
  │   └── airports.ts           # Base de dados dos aeroportos
  └── index.css                 # Estilos globais
```

## Como Usar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
