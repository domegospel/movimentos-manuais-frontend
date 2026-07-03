# Movimentos Manuais Frontend

Frontend desenvolvido em Angular para o desafio técnico Java + Angular - BNP Paribas & Antlia.

A aplicação permite consultar e incluir movimentos manuais consumindo a API backend `movimentos-manuais-api`.

## Tecnologias utilizadas

- Angular
- TypeScript
- HTML
- CSS
- RxJS
- Angular HttpClient
- Angular Forms

## Funcionalidades

- Listagem automática dos movimentos manuais cadastrados.
- Cadastro de novo movimento manual.
- Combo de produtos carregado pela API.
- Combo de COSIF carregado de acordo com o produto selecionado.
- Campo de ano com seleção baseada no ano atual.
- Máscara de valor no padrão brasileiro.
- Grid com valores formatados em moeda brasileira.
- Validação de campos obrigatórios.
- Habilitação dos campos ao clicar em `Novo`.
- Limpeza do formulário ao clicar em `Limpar`.
- Atualização automática do grid após inclusão.

## Pré-requisitos

Antes de rodar o projeto, é necessário ter instalado:

- Node.js
- npm
- Angular CLI

Para verificar:

```bash
node -v
npm -v
ng version
```

## Como instalar as dependências

Na raiz do projeto frontend, execute:

```bash
npm install
```

## Como rodar o projeto

Execute:

```bash
ng serve
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

## Backend necessário

Para o frontend funcionar corretamente, a API backend precisa estar rodando em:

```text
http://localhost:8080
```

Endpoints consumidos pelo frontend:

```http
GET  /api/produtos
GET  /api/produtos/{codProduto}/cosifs
GET  /api/movimentos-manuais
POST /api/movimentos-manuais
```

## Repositório do backend

```text
https://github.com/domegospel/movimentos-manuais-api
```

## Estrutura do projeto

```text
src/app
 ├── models
 │   ├── movimento-manual.model.ts
 │   ├── produto-cosif.model.ts
 │   └── produto.model.ts
 ├── services
 │   ├── movimento-manual.service.ts
 │   ├── produto-cosif.service.ts
 │   └── produto.service.ts
 ├── app.config.ts
 ├── app.css
 ├── app.html
 ├── app.routes.ts
 └── app.ts
```

## Fluxo da tela

1. Ao abrir a tela, os movimentos manuais são carregados automaticamente.
2. O usuário clica em `Novo`.
3. Os campos do formulário são habilitados.
4. O usuário informa mês, ano, produto, COSIF, valor e descrição.
5. Ao clicar em `Incluir`, o frontend envia os dados para a API.
6. A API gera automaticamente o número do lançamento.
7. O grid é atualizado com o novo movimento cadastrado.

## Observações técnicas

- O projeto utiliza Angular standalone.
- A comunicação com a API é feita via `HttpClient`.
- O formulário utiliza `FormsModule` com `ngModel`.
- A máscara de valor foi implementada sem bibliotecas externas.
- O grid exibe os valores no padrão brasileiro.
- O backend precisa estar com CORS liberado para `http://localhost:4200`.

## Comandos úteis

Instalar dependências:

```bash
npm install
```

Rodar aplicação:

```bash
ng serve
```

Gerar build:

```bash
ng build
```

Acessar aplicação local:

```text
http://localhost:4200
```
