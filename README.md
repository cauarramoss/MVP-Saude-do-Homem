💙 Vida+ - Seu Assistente de Saúde Inteligente

Vida+ é uma plataforma Full Stack voltada para o bem-estar, que utiliza Inteligência Artificial para analisar hábitos diários (sono, hidratação, alimentação) e fornecer um laudo de saúde personalizado.

🚀 Funcionalidades

Autenticação Completa: Cadastro e Login de usuários seguros (JWT).

Monitoramento de Saúde: Coleta de dados vitais (IMC, sono, ingestão hídrica).

Inteligência Artificial (Python):

Geração automática de laudos clínicos detalhados.

Cálculo preciso de metas diárias (água, calorias).

Recomendações terapêuticas personalizadas.

Algoritmos Avançados:

Implementação do algoritmo Radix Sort para ordenação eficiente do histórico de pacientes por idade.

Interface Moderna: Design responsivo e intuitivo com tema "Clean Health".

🛠️ Tecnologias Utilizadas

O projeto segue uma arquitetura de Microserviços:

Front-end 🎨

React (Vite)

CSS Modules (Design System personalizado)

Axios (Consumo de APIs)

React Router DOM (Navegação)

Back-end Principal 🛡️

NestJS (Node.js Framework)

TypeORM & SQLite (Banco de Dados)

JWT & Bcrypt (Segurança e Criptografia)

Serviço de IA & Algoritmos 🧠

Python (FastAPI)

Pydantic (Validação de Dados)

Radix Sort (Implementação própria para ordenação de Big Data)

📦 Como Rodar o Projeto

Este projeto requer 3 terminais rodando simultaneamente.

1. Pré-requisitos

Node.js (v16 ou superior)

Python (v3.9 ou superior)

Git

2. Clonar o Repositório

git clone [https://github.com/SEU-USUARIO/vida-plus-fullstack.git](https://github.com/SEU-USUARIO/vida-plus-fullstack.git)
cd vida-plus-fullstack


3. Configurar o Back-end (NestJS)

Abra o Terminal 1:

cd back-end
npm install
npm start


O servidor rodará em: http://localhost:3000

4. Configurar a IA (Python)

Abra o Terminal 2:

cd IA/python
pip install -r requirements.txt
uvicorn api.main:app --reload --host 0.0.0.0


A API de IA rodará em: http://localhost:8000

5. Configurar o Front-end (React)

Abra o Terminal 3:

cd front-end
npm install
npm run dev


O site estará acessível em: http://localhost:5173 (ou no seu IP local)

📱 Acesso Mobile (Wi-Fi)

Para testar no celular sem publicar na internet:

Certifique-se de que seu computador e celular estão na mesma rede Wi-Fi.

Descubra o IPv4 do seu computador (comando ipconfig no Windows ou ifconfig no Linux/Mac).

No celular, acesse: http://SEU_IP:5173.

🧪 Testando o Radix Sort

O projeto conta com uma rota exclusiva para demonstrar a eficiência do algoritmo de ordenação Radix Sort.

Gere relatórios para usuários com idades diferentes (ex: 20, 80, 15 anos).

Vá até a página de Relatório.

Clique no botão "🔄 Executar Radix Sort".

A lista será instantaneamente ordenada por idade, processada pelo microserviço em Python.

📝 Licença

Este projeto foi desenvolvido para fins acadêmicos.

Desenvolvido por: Cauã Ramos, Vinicius Ferreira e Leon Mendonça.
