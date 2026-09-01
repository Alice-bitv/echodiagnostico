# Guia de Entrega — Site Echo Diagnósticos (v2)

## 1. O que é este site, tecnicamente

Este é um site **estático**: HTML, CSS e JavaScript puro, sem servidor
próprio, sem login e sem banco de dados. Isso importa porque muda
completamente o que "segurança" significa aqui — veja a seção 4.

```
/index.html, /precos.html, /exames.html, /especialidades.html,
/club-echo.html, /unidades.html, /convenios.html, /sobre.html
/assets/styles.css   → cores, fontes, layout
/assets/data.js      → todos os preços, exames e especialidades
/assets/app.js       → busca, filtros, menu, links de WhatsApp, animações
/robots.txt          → instrução para buscadores
/sitemap.xml         → mapa do site para o Google
```

Como editar preço, telefone, cor etc. está no guia anterior (seção
"Como alterar as coisas mais comuns") — continua valendo.

---

## 2. SEO básico já incluso

- **Meta description** própria em cada página.
- **`<link rel="canonical">`** em cada página, apontando para
  `https://www.echodiagnosticos.com.br/...` — troque esse domínio
  pelo domínio real assim que ele for definido (é um find-and-replace
  simples em todos os arquivos `.html`).
- **`robots.txt`** e **`sitemap.xml`** já na raiz do site — depois de
  publicar, envie o sitemap no
  Google Search Console (search.google.com/search-console).
- **`alt` em imagens**, hierarquia de `<h1>`/`<h2>` correta, e HTML
  semântico (`<nav>`, `<main>`, `<footer>`) — tudo isso ajuda o Google
  a entender o site.

## 3. Google Analytics

Já está instalado em todas as páginas, mas com um ID de exemplo:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
...
gtag('config', 'G-XXXXXXXXXX');
```
Troque `G-XXXXXXXXXX` (aparece 2 vezes por página) pelo ID real,
criado em analytics.google.com. Sem essa troca, o Analytics não vai
registrar nada — é só um placeholder.

## 4. Segurança — o que existe hoje e o que ainda não existe

Isso é importante pra você não prometer ao cliente algo que o site
ainda não tem.

**O que este site JÁ tem (nível estático):**
- Nenhuma senha, nenhum dado sensível de usuário armazenado — porque
  não existe cadastro nem login ainda.
- `color-scheme: light` e outras boas práticas de acessibilidade.
- Nenhum código de terceiro suspeito, nenhuma dependência pesada.

**O que NÃO se aplica ainda (porque o recurso não existe no site):**
- **Autenticação de rotas de API** — não existe API própria.
- **Criptografia de senha no banco** — não existe banco de dados nem
  cadastro de usuário.
- **Limite de tentativas de login** — não existe login.
- **Políticas RLS (Row Level Security)** — RLS é recurso de banco de
  dados (ex.: Supabase/Postgres); só faz sentido quando o site tiver
  um backend com tabelas de verdade.

Esses pontos **voltam a ser relevantes no dia em que o Club Echo
tiver pagamento e/ou login pela própria plataforma** (assunto da
seção 6). Quando esse dia chegar, o checklist mínimo é:
1. Toda rota de API exige um token de autenticação válido (JWT,
   sessão, ou chave de API) — nunca uma rota aberta que aceita
   qualquer requisição.
2. Senha nunca é salva em texto puro — usar hash com `bcrypt` (ou
   `argon2`), nunca MD5/SHA1 sozinho.
3. Limitar tentativas de login (ex.: bloquear/atrasar após 5 erros
   seguidos, com uma lib de rate-limiting).
4. Se usar Supabase/Postgres: ativar RLS em toda tabela com dado de
   paciente, com policy que só libera leitura/escrita para o próprio
   usuário dono do dado.
5. Dado sensível de paciente (CPF, histórico de exame) deve ficar
   criptografado em repouso — a maioria dos provedores de banco
   gerenciado (Supabase, RDS) já oferece isso por padrão; confirmar
   que está habilitado.

**O que já dá pra configurar hoje, fora do código (nível domínio/hospedagem):**
- **HTTPS obrigatório numa URL só**: a maioria das hospedagens
  (Netlify, Vercel, Hostinger, etc.) oferece certificado SSL grátis
  (Let's Encrypt) com um clique. Depois de ativar, configure:
  - Redirecionamento **http → https** (sempre)
  - Redirecionamento de **uma versão só** do domínio — escolha
    `www.echodiagnosticos.com.br` OU `echodiagnosticos.com.br` como
    principal, e redirecione a outra pra ela (evita conteúdo
    duplicado pro Google e cadeado inconsistente pro usuário). Isso
    se configura no painel da hospedagem ou nas configurações de DNS/
    redirecionamento do domínio, não no código.
- **Configurações de segurança do domínio**: ativar **DNSSEC** (se o
  registrador oferecer) e travar o domínio contra transferência não
  autorizada (**registrar lock**) no painel do Registro.br ou da
  hospedagem.

## 5. PageSpeed — o que já foi feito

- Fontes carregadas com `preconnect` (carregamento mais rápido).
- CSS e JS enxutos, sem framework pesado.
- Imagens do mapa e do herói carregam com `loading="lazy"` quando
  fora da primeira tela.
- Sem bibliotecas desnecessárias.

Depois de publicar com domínio real, rode o site em
pagespeed.web.dev — isso só funciona com o site no ar (não dá pra
medir um arquivo local). Se aparecer alerta de imagem grande, o mais
comum é comprimir a foto do hero (`index.html`) para WebP.

## 6. Pagamento do Club Echo pela própria plataforma (fase futura)

Hoje, "Quero ser Club Echo" leva ao WhatsApp. Pra virar um checkout
de verdade dentro do site (sem depender de WhatsApp), o caminho
típico é:

1. Escolher um provedor de pagamento com **checkout pronto**
   (ex.: Stripe, Mercado Pago, Pagar.me) — eles cuidam do PCI-DSS
   (armazenar cartão com segurança) por você; o site nunca guarda
   número de cartão diretamente.
2. Isso exige um **backend** (mesmo que pequeno — ex.: uma função
   serverless) pra criar a cobrança e confirmar o pagamento. É aqui
   que os pontos de segurança da seção 4 (autenticação, RLS, etc.)
   passam a valer de verdade.
3. Como você mesma decidiu: fica pra quando o restante do site
   estiver validado com a Echo. Recomendo tratar isso como um
   projeto (e um orçamento) separado — dá pra vender como "fase 2".

## 7. Como colocar no ar (resumo — detalhes no guia anterior)

1. Comprar domínio (Registro.br para `.com.br`, ou pela própria
   hospedagem).
2. Contratar hospedagem — para um site estático como este, qualquer
   hospedagem de qualidade decente serve (Hostinger, Vercel, Netlify
   são opções comuns e confiáveis no Brasil). Evite hospedagem
   gratuita sem SSL ou com anúncios forçados.
3. Subir os arquivos (FTP, painel, ou `git push`, dependendo da
   hospedagem escolhida).
4. Ativar SSL/HTTPS, configurar o redirecionamento de URL única
   (seção 4), enviar o `sitemap.xml` ao Google Search Console.

## 8. O que ainda está pendente de confirmação de preço

Antes de vender/publicar, confirme com a Echo o valor de Cirurgião
Vascular: a fonte original dizia R$250/R$300, o flyer novo mostra
R$79/R$160 — a diferença é grande demais pra publicar sem checar se
não foi erro de impressão do flyer.
