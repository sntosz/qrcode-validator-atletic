# Validador de Sócios - A.A.A.E.S.U.C. 🦁

Este é o sistema oficial de validação desenvolvido para a **Associação Atlética Acadêmica de Engenharia de Software Unigran Capital** (A.A.A.E.S.U.C.). A aplicação tem como objetivo principal validar em tempo real a situação dos sócios através da leitura de QR Codes presentes nas carteirinhas dos estudantes durante eventos e jogos.

🌐 **Acesse em Produção:** [www.validmalware.dev](https://www.validmalware.dev)

---

## 🚀 Funcionalidades Principais

- **Leitura Instantânea de QR Code**: Utiliza a câmera do dispositivo móvel para escanear os QR Codes das carteirinhas diretamente pelo navegador.
- **Validação de Status em Tempo Real**: Extrai o RGM do QR Code e consulta instantaneamente o banco de dados para checar se o sócio está ativo ou inativo.
- **Painel Administrativo Protegido**: Área restrita para a diretoria realizar novos cadastros de associados e acompanhar os dados dos sócios.
- **Autenticação Segura (JWT + Jose)**: Fluxo de autenticação moderno que armazena tokens criptografados em cookies protegidos (`HttpOnly`), gerenciados no servidor com a biblioteca `jose`.
- **Proteção por Middleware**: Bloqueio inteligente de rotas administrativas. Usuários não autenticados são impedidos de acessar o painel, e usuários já logados são impedidos de ver a tela de login novamente.
- **Interface Mobile-First Modern**: Interface escura (*dark mode*) premium, construída com Tailwind CSS v4, componentes Shadcn UI e animações fluidas para feedback visual imediato.

---

## 🛠️ Tecnologias Utilizadas

A arquitetura do projeto foi desenhada para ser extremamente rápida, segura e escalável, sem conexões ociosas ou gargalos em ambiente serverless:

- **[Next.js 15 (App Router)](https://nextjs.org/)**: Framework React para renderização híbrida, gerenciamento de rotas e Server Actions.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estrita em todo o fluxo de dados (payloads de autenticação, respostas do banco e formulários).
- **[Supabase Client Nativo](https://supabase.com/)**: Integração direta e otimizada com o banco de dados PostgreSQL através do SDK oficial, dispensando ORMs pesados.
- **[Jose](https://github.com/panva/jose)**: Biblioteca para assinatura, criptografia e verificação de tokens JWT no Edge/Middleware.
- **[BcryptJS](https://github.com/dcodeIO/bcrypt.js)**: Criptografia robusta para comparação de hashes de senhas da diretoria no servidor.
- **[Tailwind CSS v4](https://tailwindcss.com/)** & **[Shadcn UI](https://ui.shadcn.com/)**: Estilização baseada em utilitários e componentes visuais acessíveis e modernos.
- **[html5-qrcode](https://github.com/mebjas/html5-qrcode)**: Engine robusta de leitura de QR Code integrada diretamente na aplicação.
- **[Lucide React](https://lucide.dev/)**: Iconografia leve e minimalista.

---

## 📂 Estruturação de Pastas Atualizada

A arquitetura separa estritamente a lógica de negócio que roda no servidor das páginas e componentes visuais:

```text
qrcode-validation-atletic/
├── actions/                    # SERVER ACTIONS (Lógica executada estritamente no servidor)
│   ├── admin.ts                # Fluxo de login e logout com o 'jose' e 'bcrypt'
│   └── cadastroCarteirinha.ts  # Inserção de novos sócios no Supabase
├── app/                        # DIRETÓRIO DE ROTAS (Next.js App Router)
│   ├── admin/                  # Grupo de rotas privadas (Painel Administrativo)
│   │   ├── dashboard/          # Painel geral de associados
│   │   └── cadastrarAssociado/ # Tela de formulário de novos sócios
│   ├── login/                  # Tela de login pública da diretoria
│   ├── globals.css             # Estilos globais e variáveis de ambiente CSS (Tailwind v4)
│   ├── layout.tsx              # Componente de layout global da aplicação
│   └── page.tsx                # Página principal (Scanner público de QR Code)
├── components/                 # Componentes de UI e Layout reativos
│   ├── ui/                     # Componentes atômicos do Shadcn UI (Button, Input)
│   ├── BottomNavigationBar.tsx # Menu de navegação inferior responsivo
│   ├── header.tsx              # Cabeçalho padrão com a identidade visual da Atlética
│   └── loginForm.tsx           # Formulário de autenticação conectado às Server Actions
├── lib/                        # Inicializadores de serviços e ferramentas
│   └── supabase.ts             # Configuração do Client Oficial do Supabase
├── types/                      # Definições de tipos globais do TypeScript
│   └── admin.ts                # Interfaces para o payload do Admin e JWT
├── middleware.ts               # INTERCEPTADOR DE SESSÕES (Proteção automática de rotas na raiz)
├── .env                        # Variáveis de ambiente locais (Ignorado pelo Git)
├── package.json                # Dependências, scripts e comandos do projeto
└── tsconfig.json               # Configurações do compilador do TypeScript

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
