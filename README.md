# 🌱 RWA Banking Dashboard

Este projeto é um **mini dashboard bancário** desenvolvido como parte de um **teste técnico Frontend**, simulando operações financeiras e visualização de ativos RWA (Real World Assets), com foco em **UX, clareza de código e boas práticas**.

---

## ✨ Funcionalidades

- Dashboard com visão geral da conta
- Saldo atual calculado dinamicamente
- Entradas, saídas e total de transações
- Gráfico de evolução do saldo
- Simulação de novas operações (entrada/saída)
- Lista de transações com loading e empty state
- Portfólio RWA (exemplo com ativos do agro)
- Persistência em `localStorage`
- Feedback visual com toasts e modais
- Layout responsivo (desktop e mobile)

---

## 🛠️ Stack utilizada

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form + Zod**
- **Context API**
- **Jest + Testing Library**

---

## 🧠 Decisões técnicas

### Server vs Client Components
- Páginas e layouts utilizam **Server Components** sempre que possível
- Componentes interativos (forms, listas, menus) são **Client Components**
- Hooks e estados são isolados apenas onde necessários

### Gerenciamento de estado
- **Context API** para:
  - Usuário
  - Transações
  - Toasts
- Escolha feita por simplicidade e clareza, evitando overengineering

### Arquitetura
- Separação clara entre:
  - `lib/` → regras de negócio
  - `contexts/` → estado global
  - `components/` → UI reutilizável
- Funções puras isoladas para facilitar testes

---

## 🧪 Testes

Os testes foram pensados para cobrir **o que realmente importa**, sem excesso:

### Testes unitários
- Funções de cálculo financeiro (`lib/finance`)
- Garantem confiabilidade das regras de negócio

### Testes de componente
- `TransactionList`
- Cobertura de:
  - Empty state
  - Renderização de transações

### Estratégia
- Priorizei **qualidade e intenção**, não quantidade
- Evitei testes frágeis de layout ou estilos
- O dashboard, por ser majoritariamente composição de componentes, não foi extensivamente testado

### Rodar os testes
```bash
npm test
🎨 UX e Design
Layout pensado em hierarquia visual clara

Separação entre:

Informações de impacto (entradas/saídas)

Insights (resultado do período)

Contexto (portfólio RWA e atividades recentes)

Uso de cores para comunicar estados (verde/vermelho)

Espaçamento e alinhamento refinados para evitar ruído visual

📁 Estrutura de pastas (resumo)
src/
 ├─ app/
 ├─ components/
 ├─ contexts/
 ├─ lib/
 ├─ mocks/
 └─ __tests__/
     ├─ unit/
     └─ components/
🚀 Como rodar o projeto
npm install
npm run dev
Acesse:
👉 http://localhost:3000

🔮 Próximos passos (se houvesse mais tempo)
Testes de integração mais amplos

Filtro avançado de transações

Customização de usuário (nome, avatar, preferências)

Gráficos mais completos (períodos configuráveis)

Integração com backend real / API

👩‍💻 Observações finais
Este projeto foi desenvolvido com foco em:

Clareza de código

Boas práticas de frontend

Experiência do usuário

Facilidade de manutenção

Obrigado pela oportunidade 🚀
