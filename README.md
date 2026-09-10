# Site Institucional — Insieme Assessoria

Site estático (HTML5 + CSS3 + JavaScript puro) para a Insieme Assessoria, sem dependências,
sem backend e sem banco de dados. Funciona apenas abrindo o `index.html` no navegador.

## Estrutura do projeto

```text
/
├── index.html
├── privacidade.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/   (imagens do site)
│   └── icons/    (favicon)
└── README.md
```

## 1. Como abrir o site localmente no VS Code

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server** (opcional, mas recomendada) ou apenas dê duplo clique
   no arquivo `index.html` para abri-lo direto no navegador.
3. Com Live Server: clique com o botão direito em `index.html` → **Open with Live Server**.

Nenhuma instalação de dependências é necessária.

## 2. Como alterar textos

Todos os textos ficam diretamente no arquivo `index.html`, dentro de tags como `<h1>`, `<h2>`,
`<p>`, `<li>`. Basta abrir o arquivo, localizar a seção desejada (cada seção tem um comentário
`<!-- ===== NOME DA SEÇÃO ===== -->`) e editar o texto entre as tags.

## 3. Como alterar imagens

O site já vem com uma foto real (`assets/images/hero.jpg`) de um banco gratuito ([Pexels](https://www.pexels.com/photo/3183197/),
uso livre, sem atribuição obrigatória), mostrando uma equipe trabalhando em conjunto com notebooks
e tablets. Para trocar por outra foto:

1. Baixe uma foto **gratuita e livre de direitos autorais** em um banco de imagens confiável, por
   exemplo:
   - [Unsplash](https://unsplash.com) (buscar por "team", "office", "technology", "healthcare")
   - [Pexels](https://www.pexels.com)
   - [Pixabay](https://pixabay.com)
2. Salve o arquivo em `assets/images/hero.jpg`, substituindo o atual (ou use outro nome).
3. Se usar outro nome de arquivo, atualize o `src` do `<img>` na seção "Início" (Hero) do
   `index.html`:

   ```html
   <img src="assets/images/hero.jpg" alt="Descrição da foto" width="1600" height="1068">
   ```

4. Para a imagem de compartilhamento em redes sociais (Open Graph), o arquivo
   `assets/images/og-cover.jpg` já está incluído (gerado a partir da identidade visual da
   Insieme). Substitua-o por uma arte definitiva quando desejar, mantendo o nome do arquivo e as
   dimensões (1200x630px).

Os favicons (`assets/icons/favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`) também
já estão incluídos, gerados a partir da marca da Insieme. Substitua-os a qualquer momento por
versões definitivas com os mesmos nomes de arquivo.

## 4. Onde colocar o WhatsApp

Abra `js/script.js` e preencha a constante no topo do arquivo:

```js
const WHATSAPP_NUMBER = "5511999999999"; // DDI + DDD + número, apenas dígitos
```

O botão flutuante e o link na seção de contato são ativados automaticamente ao preencher esse valor.

## 5. Onde colocar o LinkedIn

Ainda em `js/script.js`:

```js
const LINKEDIN_URL = "https://www.linkedin.com/company/insieme-assessoria";
```

## 6. Onde colocar o e-mail

Ainda em `js/script.js`:

```js
const CONTACT_EMAIL = "contato@insiemeassessoria.com.br";
```

Esse e-mail é usado no cartão "E-mail" da seção de contato (abre o aplicativo de e-mail do
visitante com `mailto:`).

Enquanto `WHATSAPP_NUMBER`, `LINKEDIN_URL` ou `CONTACT_EMAIL` estiverem vazios, o cartão
correspondente aparece visualmente desabilitado (sem link quebrado) até você preencher o dado.

## 7. Como publicar no GitHub

1. Crie um repositório novo no GitHub (ex: `insieme-assessoria`).
2. No terminal, dentro da pasta do projeto:

   ```bash
   git init
   git add .
   git commit -m "Site institucional Insieme Assessoria"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/insieme-assessoria.git
   git push -u origin main
   ```

## 8. Como ativar o GitHub Pages

1. No repositório, acesse **Settings → Pages**.
2. Em **Source**, selecione a branch `main` e a pasta `/root`.
3. Salve. O GitHub fornecerá uma URL do tipo
   `https://SEU-USUARIO.github.io/insieme-assessoria/`.

## 9. Como usar um domínio próprio depois

1. No provedor do domínio (`insiemeassessoria.com.br`), crie um registro `CNAME` apontando o
   subdomínio desejado (ex: `www`) para `SEU-USUARIO.github.io`.
2. No GitHub, em **Settings → Pages → Custom domain**, informe `www.insiemeassessoria.com.br`.
3. Crie um arquivo `CNAME` (sem extensão) na raiz do projeto contendo apenas:

   ```text
   www.insiemeassessoria.com.br
   ```

4. Aguarde a propagação do DNS e ative "Enforce HTTPS" na mesma tela.

## 10. Como publicar alternativamente no Cloudflare Pages

1. Crie uma conta gratuita em [pages.cloudflare.com](https://pages.cloudflare.com).
2. Clique em **Create a project → Connect to Git** e selecione o repositório do GitHub.
3. Em **Build settings**, deixe o comando de build vazio e o diretório de saída como `/`
   (é um site estático, sem processo de build).
4. Clique em **Save and Deploy**.
5. Para usar o domínio próprio, acesse o projeto → **Custom domains** → adicione
   `www.insiemeassessoria.com.br` e siga as instruções de DNS apresentadas.

## Observações finais

- Não há formulário no site: o contato acontece diretamente por WhatsApp, e-mail ou LinkedIn,
  configurados em `js/script.js`.
- O site é responsivo e testado para desktop, tablet e celular.
- O rodapé exibe o ano de copyright automaticamente via `js/script.js`.
