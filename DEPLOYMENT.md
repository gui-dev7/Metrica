# Deploy da metrica: GitHub + Vercel

Este projeto está preparado para deploy na Vercel usando GitHub como origem.

## 1. Requisitos locais

Instale:

- Git: https://git-scm.com/downloads
- Conta GitHub autenticada no navegador
- Conta Vercel conectada ao GitHub

Nesta máquina, `git` e `gh` não estavam disponíveis no terminal no momento da preparação. Por isso, o push para GitHub precisa ser feito depois de instalar/autenticar o Git.

## 2. Criar o repositório no GitHub

No GitHub:

1. Clique em `New repository`.
2. Nome sugerido: `metrica`.
3. Visibilidade: `Private` enquanto o produto ainda estiver sendo ajustado.
4. Não marque README, `.gitignore` ou license, porque este projeto já tem arquivos locais.
5. Crie o repositório.

## 3. Enviar o projeto para a branch main

Na pasta do projeto:

```bash
git init
git branch -M main
git add .
git commit -m "chore: prepare metrica for vercel deploy"
git remote add origin https://github.com/SEU_USUARIO/metrica.git
git push -u origin main
```

Se usar SSH:

```bash
git remote add origin git@github.com:SEU_USUARIO/metrica.git
git push -u origin main
```

## 4. Importar na Vercel

Na Vercel:

1. Vá em `Add New...` → `Project`.
2. Escolha o repositório `metrica`.
3. Framework Preset: `Next.js`.
4. Root Directory: `.`.
5. Install Command: `npm install`.
6. Build Command: `npm run build`.
7. Output Directory: deixe vazio, a Vercel detecta Next.js automaticamente.
8. Production Branch: `main`.
9. Node.js Version: `22.x`.

O projeto também define `engines.node = 22.x` em `package.json`.

## 5. Variáveis de ambiente na Vercel

Configure em `Project Settings` → `Environment Variables`.

Mínimo para publicar:

```txt
NEXT_PUBLIC_APP_URL=https://metrica.dev
APP_URL=https://metrica.dev
SITE_DOMAIN=https://metrica.dev
API_ALLOWED_ORIGINS=https://metrica.dev,https://www.metrica.dev
API_RATE_LIMIT_WINDOW_MS=60000
API_RATE_LIMIT_MAX=40
BACKEND_STORAGE=auto
ADMIN_API_TOKEN=gere-um-token-forte
```

Quando ativar Supabase:

```txt
BACKEND_STORAGE=supabase
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
SUPABASE_SCHEMA=public
```

Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no frontend.

## 6. Banco de dados

Antes de usar Supabase em produção:

1. Abra o SQL Editor no Supabase.
2. Execute `database/supabase.sql`.
3. Configure as variáveis acima na Vercel.
4. Faça um novo deploy.

Sem Supabase, o site funciona, mas leads e simulações usam memória efêmera.

## 7. Domínio

Na Vercel:

1. Abra o projeto.
2. Vá em `Settings` → `Domains`.
3. Adicione:

```txt
metrica.dev
www.metrica.dev
```

4. Ajuste o DNS conforme a Vercel indicar.

## 8. Deploy automático

Depois que o GitHub estiver conectado:

- Todo push em `main` gera deploy de produção.
- Pull requests geram preview deploys.
- A workflow `.github/workflows/ci.yml` roda typecheck, lint e build no GitHub antes de merge.

## 9. Checklist final

Antes de publicar:

```bash
npm ci
npm run check
```

Depois do deploy:

```txt
https://metrica.dev/api/health
```

O `status` deve retornar `ok` ou `degraded` apenas se Supabase tiver sido solicitado sem variáveis configuradas.
