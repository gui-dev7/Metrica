<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-050706?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-6-050706?style=for-the-badge&logo=typescript&logoColor=00ff88" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-050706?style=for-the-badge&logo=tailwindcss&logoColor=00ff88" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel-ready-050706?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel ready" />
</p>

<h1 align="center">metrica</h1>

<p align="center">
  Uma experiência noir e premium para simulação financeira, análise de ROI, lucro, margem, payback e projeções executivas.
</p>

<p align="center">
  <a href="#visao-geral">Visão geral</a> ·
  <a href="#stack">Stack</a> ·
  <a href="#rodando-localmente">Rodar</a> ·
  <a href="#backend">Backend</a> ·
  <a href="#deploy-na-vercel">Deploy</a>
</p>

---

## Visão Geral

`metrica` é um produto web para transformar números de negócio em decisões de crescimento. O usuário informa receita, custos, ticket médio, vendas, investimento e metas, e o sistema calcula cenários financeiros com visual executivo.

A interface segue uma estética noir: fundo preto/grafite, verde dinheiro como destaque, cards discretos, animações GSAP e uma experiência de scrollytelling com planilhas 3D em HTML/CSS.

## Principais Recursos

- Landing page premium com hero, scrollytelling e animações GSAP.
- Simulador financeiro com React Hook Form e validação Zod.
- Dashboard preview e dashboard completo com Recharts.
- Cálculo de receita projetada, lucro bruto, lucro líquido, ROI, payback, margem e economia potencial.
- Cenários conservador, realista e agressivo.
- APIs internas com Route Handlers do Next.js.
- Backend preparado para Supabase/PostgreSQL.
- Deploy preparado para Vercel.
- CI no GitHub com typecheck, lint e build.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js App Router |
| Linguagem | TypeScript |
| UI | React + Tailwind CSS |
| Animações | GSAP + ScrollTrigger |
| Formulários | React Hook Form |
| Validação | Zod |
| Gráficos | Recharts |
| Estado | Zustand |
| Backend | Next.js Route Handlers |
| Banco futuro | Supabase/PostgreSQL |
| Deploy | Vercel |

## Estrutura

```txt
src/
  app/
    api/
    dashboard/
    simulator/
  components/
    animations/
    dashboard/
    landing/
    layout/
    simulator/
    ui/
  lib/
    api/
    calculations/
    services/
    storage/
    validators/
  types/
database/
  supabase.sql
```

## Rodando Localmente

```bash
npm install
npm run dev
```

Abra:

```txt
http://localhost:3000
```

Crie `.env.local` a partir de `.env.example`:

```txt
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_URL=http://localhost:3000
SITE_DOMAIN=https://metrica.dev
API_ALLOWED_ORIGINS=http://localhost:3000,https://metrica.dev,https://www.metrica.dev
API_RATE_LIMIT_WINDOW_MS=60000
API_RATE_LIMIT_MAX=40
BACKEND_STORAGE=auto
ADMIN_API_TOKEN=troque-por-um-token-forte
```

## Scripts

```bash
npm run dev        # ambiente local
npm run build      # build de produção
npm run start      # servir build local
npm run lint       # lint
npm run typecheck  # TypeScript
npm run check      # typecheck + lint + build
npm run preview    # preview Vercel
npm run deploy     # deploy produção Vercel
```

## Backend

Rotas disponíveis:

```txt
GET  /api/health
POST /api/simulations
GET  /api/simulations
POST /api/leads
GET  /api/leads
```

`GET /api/simulations` sem token retorna dados demo para a experiência pública. Para listar dados reais, use:

```txt
Authorization: Bearer <ADMIN_API_TOKEN>
```

ou:

```txt
X-Admin-Token: <ADMIN_API_TOKEN>
```

## Testando APIs

Health:

```bash
curl http://localhost:3000/api/health
```

Criar simulação:

```bash
curl -X POST http://localhost:3000/api/simulations \
  -H "Content-Type: application/json" \
  -d '{"currentMonthlyRevenue":180000,"fixedCosts":52000,"variableCosts":61000,"averageTicket":420,"salesCount":428,"initialInvestment":85000,"growthTarget":38,"projectionMonths":12,"expectedMargin":24,"salesChannel":"Operação híbrida"}'
```

Criar lead:

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Cliente Metrica","email":"cliente@empresa.com","company":"Empresa Demo","phone":"+55 11 00000-0000","interest":"Quero simular ROI e payback."}'
```

## Supabase

O projeto roda sem banco usando memória efêmera. Para persistência real:

1. Crie um projeto no Supabase.
2. Execute `database/supabase.sql` no SQL Editor.
3. Configure as variáveis:

```txt
BACKEND_STORAGE=supabase
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
SUPABASE_SCHEMA=public
```

Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no frontend.

## Deploy Na Vercel

O guia completo está em [`DEPLOYMENT.md`](./DEPLOYMENT.md).

Configuração recomendada:

```txt
Framework: Next.js
Production Branch: main
Install Command: npm install
Build Command: npm run build
Output Directory: vazio
Node.js Version: 22.x
```

Variáveis mínimas na Vercel:

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

Domínios planejados:

```txt
metrica.dev
www.metrica.dev
```

## GitHub CI

O workflow em `.github/workflows/ci.yml` roda automaticamente em `main`:

```txt
npm ci
npm run typecheck
npm run lint
npm run build
```

## Segurança

- Secrets ficam fora do código.
- `.env*` está ignorado no Git.
- Backend valida entrada com Zod.
- Rotas administrativas exigem token.
- Supabase usa service role apenas no servidor.

## Status

Projeto preparado para produção na Vercel, com frontend premium, backend funcional e estrutura pronta para persistência real.
