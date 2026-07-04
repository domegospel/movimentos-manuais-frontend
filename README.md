# Movimentos Manuais Frontend

Frontend desenvolvido em Angular para o desafio técnico Java + Angular - BNP Paribas & Antlia.

A aplicação permite consultar e incluir movimentos manuais consumindo uma API backend de movimentos manuais.

Este frontend foi mantido independente da implementação interna do backend. Por isso, ele pode consumir tanto a API desenvolvida em **arquitetura em camadas** quanto a API desenvolvida em **arquitetura hexagonal**, desde que uma delas esteja rodando localmente na porta `8080`.

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
- Campo de ano com sugestão baseada no ano atual e possibilidade de digitação manual.
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

Para o frontend funcionar corretamente, **uma das APIs backend** precisa estar rodando em:

```text
http://localhost:8080
```

Este frontend pode consumir qualquer uma das duas versões do backend:

### Backend em camadas

```text
https://github.com/domegospel/movimentos-manuais-api
```

### Backend com arquitetura hexagonal

```text
https://github.com/domegospel/movimentos-manuais-api-hexagonal
```

As duas APIs expõem os mesmos endpoints REST, por isso o frontend não precisa de alteração para alternar entre elas.

## Endpoints consumidos pelo frontend

```http
GET  /api/produtos
GET  /api/produtos/{codProduto}/cosifs
GET  /api/movimentos-manuais
POST /api/movimentos-manuais
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

## Comportamento dos campos

### Produto

O combo de produto é carregado pela API:

```http
GET /api/produtos
```

### COSIF

O combo de COSIF é carregado conforme o produto selecionado:

```http
GET /api/produtos/{codProduto}/cosifs
```

### Ano

O campo de ano permite selecionar anos sugeridos com base no ano atual e também permite digitação manual.

### Valor

O campo de valor utiliza máscara no padrão brasileiro, por exemplo:

```text
100.000,00
```

No envio para a API, o valor é convertido para número.

## Observações técnicas

- O projeto utiliza Angular standalone.
- A comunicação com a API é feita via `HttpClient`.
- O formulário utiliza `FormsModule` com `ngModel`.
- A máscara de valor foi implementada sem bibliotecas externas.
- O grid exibe os valores no padrão brasileiro.
- O backend precisa estar com CORS liberado para `http://localhost:4200`.
- O frontend foi mantido desacoplado da arquitetura interna do backend.
- O mesmo frontend funciona tanto com a API em camadas quanto com a API hexagonal.

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

## Checklist de validação

Antes da entrega, valide:

```text
1. Subir uma das APIs backend em http://localhost:8080.
2. Subir o frontend em http://localhost:4200.
3. Verificar se o grid carrega automaticamente.
4. Clicar em Novo.
5. Selecionar produto.
6. Verificar se o COSIF é carregado.
7. Preencher mês, ano, valor e descrição.
8. Clicar em Incluir.
9. Confirmar se o movimento aparece no grid.
```

## Repositórios relacionados

Backend em camadas:

```text
https://github.com/domegospel/movimentos-manuais-api
```

Backend com arquitetura hexagonal:

```text
https://github.com/domegospel/movimentos-manuais-api-hexagonal
```

Frontend Angular:

```text
https://github.com/domegospel/movimentos-manuais-frontend
```

Substitua `domegospel` pelo seu usuário real do GitHub.

## Observação final

Foram criadas duas versões do backend para o desafio:

1. `movimentos-manuais-api`  
   Implementação em arquitetura em camadas tradicional.

2. `movimentos-manuais-api-hexagonal`  
   Implementação alternativa utilizando arquitetura hexagonal, separando domínio, casos de uso, portas e adapters.

Ambas mantêm o mesmo contrato REST e podem ser consumidas por este mesmo frontend Angular.
