# 🧠 perguntAI — Geração Inteligente de Exercícios com IA Local (Ollama Mistral)

O **perguntAI** é uma plataforma interativa que transforma qualquer texto de estudo em **listas de exercícios geradas automaticamente** por uma LLM rodando localmente (via **Ollama Mistral**).  
Após responder as questões, o usuário recebe uma **avaliação completa** e pode **baixar um PDF** com o desempenho.


![Welcome page do projeto](./frontend/public/images/readme/welcome.png)


Tudo acontece **localmente**, mantendo privacidade total e execução extremamente rápida — sem enviar nenhum dado para a nuvem.


## 🌟 Propósito do projeto

O objetivo do perguntAI é oferecer uma ferramenta moderna para estudos:

- 📚 **Gerar questões automaticamente** a partir de qualquer texto.
- 🔒 **Privacidade absoluta** — processamento 100% local.
- ⚡ **Baixa latência** — sem dependências externas.
- 🛠️ **Código aberto**, modular e fácil de contribuir.
- 🧩 **Arquitetura extensível**, pronta para receber novos tipos de exercícios ou modelos de IA.


## 🛠️ Funcionalidades principais

### 👤 Para o usuário

- ✍️ Inserir textos, resumos ou materiais de estudo.
- ⚙️ Selecionar quantidade/tipo de questões, dificuldade e linguagem desejada.
- 🧠 Receber perguntas abertas, múltipla escolha ou misturado.
- ✔️ Obter validação com base nas respostas aceitáveis.
- 📊 Visualizar um resumo de desempenho.
- 📄 Baixar um **PDF final** contendo:
  - Perguntas
  - Suas respostas
  - Respostas corretas
  - Estatísticas de acertos e erros

![questões geradas](./frontend/public/images/readme/questões_geradas.png)

---

![relatório de avaliação](./frontend/public/images/readme/relatório.png)

---

![pdf de avaliação](./frontend/public/images/readme/pdf.png)


## 📚 Modelagem de Dados (sem banco de dados)

Toda a lógica funciona **em memória**, usando estruturas simples, transparentes e expansíveis.


## 🗂️ Estrutura do Backend (Node + TypeScript)

O backend é escrito em **Express 5**, com foco em modularidade e limpeza de camadas.

### 🧩 Destaques técnicos do backend

- **Express 5 + TypeScript**
- **Axios** para comunicação com o Ollama
- **PDFKit** para geração de PDF
- **UUID** para identificadores locais
- **Helmet + HPP + Compression + CORS** para segurança e otimização
- **Estrutura limpa por camadas** (controllers → services → utils)


## 🖥️ Estrutura do Frontend (React + TypeScript + Vite)

Frontend modular, organizado por features, espelhando a arquitetura do backend.

### 💎 Destaques técnicos do frontend

- **React 19 + Vite**
- **React Router DOM 7**
- **Context API + Reducer** para gerenciamento de sessão
- **Axios** para comunicação com o backend
- **Componentes desacoplados** prontos para expansão
- **UI responsiva** seguindo os requisitos de usabilidade


## ✨ Requisitos Funcionais (resumo)

- Inserir texto e gerar exercícios (RF01)
- Configurar quantidade, tipo, dificuldade e linguagem (RF02)
- Validar respostas (RF02 - Grupo 2)
- Exibir resumo de desempenho (RF03)
- Gerar PDF com estatísticas e conteúdo (RF03)
- Conectar ao Ollama local (Grupo 4)


## ⚙️ Requisitos Não Funcionais

- ⚡ Até **10 segundos** para gerar perguntas localmente
- 📱 Interface responsiva e intuitiva
- 🛡️ Tratamento de erros (Ollama offline, timeouts, etc.)
- 🖥️ Funciona em qualquer navegador moderno
- 🔒 Zero envio de dados para servidores externos
- 🧩 Código modular e extensível
- 💻 Compatível com Windows, Linux e macOS


## 🌍 Objetivo Open-Source

O perguntAI foi desenvolvido para ser:

- **Simples de entender**
- **Fácil de modificar**
- **Ideal para aprendizado**
- **Aberto para contribuições da comunidade**

Novas features futuras incluem:

- 🎨 tema claro/escuro  
- 🧪 novos tipos de exercícios  
- 🤖 suporte a diferentes LLMs no Ollama  

---