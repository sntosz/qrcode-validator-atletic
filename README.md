# Validador de Sócios - A.A.A.E.S.U.C.

Este é um projeto desenvolvido para a **Associação Atlética Acadêmica de Engenharia de Software Unigran Capital** (A.A.A.E.S.U.C.). A aplicação tem como objetivo principal validar a situação dos sócios através da leitura de QR Codes presentes nas carteirinhas dos estudantes.

## 🚀 Funcionalidades

- **Leitura de QR Code**: Utiliza a câmera traseira do dispositivo móvel para escanear QR Codes das carteirinhas.
- **Validação de Status**: Extrai os dados do QR Code (RGM, Nome, Curso, Situação) e exibe de forma clara se o sócio está ativo ou inativo.
- **Verificação de Dispositivo Móvel**: A aplicação foi desenhada primariamente para uso em dispositivos móveis, garantindo que a câmera correta seja acionada.
- **Interface Amigável**: Interface escura (dark mode) moderna, utilizando Tailwind CSS, com animações e feedback visual claro para o usuário.

## 🛠 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

- **[Next.js 15 (App Router)](https://nextjs.org/)**: Framework React para renderização e estrutura da aplicação.
- **[React 19](https://react.dev/)**: Biblioteca JavaScript para construção da interface de usuário.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework de CSS utilitário para estilização rápida e responsiva.
- **[Supabase](https://supabase.com/)**: Backend as a Service (BaaS) utilizado para integração com banco de dados (configurado no projeto).
- **[html5-qrcode](https://github.com/mebjas/html5-qrcode)**: Biblioteca para implementação do leitor de QR Code integrado no navegador.
- **[Lucide React](https://lucide.dev/)**: Conjunto de ícones vetoriais modernos e leves.
- **[Turbopack](https://nextjs.org/docs/architecture/turbopack)**: Bundler rápido utilizado no Next.js para melhorar o tempo de desenvolvimento.

## 📁 Estruturação de Pastas

Abaixo está a estrutura principal de pastas e arquivos do projeto:

```text
qrcode-validation-atletic/
├── app/                        # Diretório principal do Next.js (App Router)
│   ├── components/             # Componentes reutilizáveis da aplicação
│   │   ├── BottomNavigationBar.tsx # Barra de navegação inferior (Scanner/Admin)
│   │   ├── header.tsx          # Cabeçalho da aplicação com o logo da Atlética
│   │   └── mobileChecker.tsx   # Componente que força/verifica o uso em dispositivos móveis
│   ├── globals.css             # Estilos globais (Tailwind e variáveis CSS)
│   ├── layout.tsx              # Estrutura base HTML da aplicação e fontes
│   └── page.tsx                # Página principal com a lógica do leitor de QR Code
├── lib/                        # Arquivos de utilidade e configurações externas
│   └── supabase.ts             # Configuração do cliente Supabase
├── public/                     # Arquivos estáticos servidos publicamente
│   └── logoAaaes.png           # Logo da Atlética
├── .env.example                # Exemplo de variáveis de ambiente necessárias
├── next.config.ts              # Arquivo de configuração do Next.js
├── package.json                # Dependências e scripts do projeto
├── postcss.config.mjs          # Configuração do PostCSS para o Tailwind
└── tsconfig.json               # Configurações do TypeScript
```

## 💻 Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd qrcode-validation-atletic
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   Copie o arquivo `.env.example` para `.env` (ou `.env.local`) e preencha as credenciais necessárias do Supabase.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador, preferencialmente utilizando o modo de desenvolvedor do navegador para simular um dispositivo móvel, ou acesse através do seu celular conectado na mesma rede (via IP local).
