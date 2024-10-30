![Screenshot](/public/capadura-homepage.jpg)

# Projeto Capadura - Repo Back-end

O projeto foi dividido em dois repositórios, sendo esse aqui para o **back-end**. Para acessar o repositório do **front-end**, [clique aqui](https://github.com/eidynho/capadura).

## Introdução

[Capadura](https://capadura.vercel.app) é uma ferramenta onde os leitores podem compartilhar avaliações de livros, fazer comentários durante a leitura e descobrir novos livros.

## 🤖 Tech stack

- Typescript
- Node.js
- Fastify
- Prisma ORM
- AWS S3
- AWS Cloudfront
- Redis
- PostgreSQL

## 💻 Principais funcionalidades

### Sistema

- [x] Registro de usuário
- [x] Sistema de autenticação com e-mail/senha
- [x] Sistema de autenticação com Google OAuth
- [x] Autenticação com JWT

### Livros

- [x] Criar livro
- [x] Editar livro
- [x] Listagem dos dados do livro

#### Leitura

- [x] Criar leitura de livro
- [x] Editar leitura de livro
- [x] Deletar leitura de livro
- [x] Criar progresso de leitura
- [x] Editar progresso de leitura
- [x] Deletar progresso de leitura
- [x] Listagem de todos os progressos de uma leitura
- [x] Listagem de leituras finalizadas do usuário
- [x] Listagem da quantidade de leituras finalizadas por livro
- [x] Listagem da quantidade de páginas lidas por dia do usuário

#### Avaliação de livros

- [x] Adicionar avaliação de livro
- [x] Editar avaliação de livro
- [x] Listagem da quantidade de avaliações por nota do livro
- [x] Listagem da quantidade de avaliações por nota do usuário

#### Livros favoritos

- [x] Adicionar livros favoritos do usuário
- [x] Remover livros favoritos do usuário
- [x] Listagem de livros favoritos por usuário

#### Lista de livros

- [x] Criar/editar/deletar de lista de livros
- [x] Adicionar/deletar livro na lista
- [x] Remover livro da lista
- [x] Listagem das listas do usuário
- [x] Listagem dos livros de uma lista do usuário

#### Curtidas

- [x] Curtir livro
- [x] Descurtir livro
- [x] Listagem de livros curtidos por usuário
- [x] Total de curtidas por livro

### Perfil

- [x] Rota para trazer os dados do usuário por id/nome de usuário
- [x] Editar informações do perfil do usuário

#### Seguidores/seguindo

- [x] Seguir usuários
- [x] Desseguir usuários
- [x] Rota para saber se o usuário atual segue o perfil que está vendo
- [x] Rota para saber se o usuário atual é seguido pelo perfil que está vendo
- [x] Listagem de quem o usuário segue/é seguido
- [x] Contagem de quantos o usuário segue/é seguido

#### Atividades recentes do usuário

- [x] Criar e listar as últimas atividades do usuário
    - [x] Curtir livro
    - [x] Iniciar/pausar/retomar leitura
    - [x] Adicionar progresso de leitura
    - [x] Avaliação de livro

## 🌏 Contribuições

Para quem deseja contribuir: recomendo abrir uma discussão com a alteração que deseja fazer por meio de uma issue, ou uma discussão ou fale comigo diretamente. Estarei aberto para novas implementações ou sugestões :)

### Implementações desejadas para o futuro

- [ ] Isolar a camada de DTO
- [ ] Isolar a camada de entidades
- [ ] Testes unitário/integração e e2e em toda a aplicação
- [ ] Documentação das rotas

## ⚙️ Variaveis de ambiente

Caso precise fazer upload de imagens, as variáveis da S3 e do Cloudfront devem ser preenchidas com as respectivas chaves.

```
S3_BUCKET_NAME=
S3_BUCKET_REGION=
S3_ACCESS_KEY=
S3_SECRET_ACCESS_KEY=

CLOUDFRONT_BASE_URL=
CLOUDFRONT_DISTRIBUTION_ID=
CLOUDFRONT_PRIVATE_KEY=
CLOUDFRONT_KEY_PAIR_ID
```

Caso precise fazer login através do OAuth com Google, a variável `GOOGLE_CLIENT_ID` e `GOOGLE_SECRET_ID` deverão ser criadas através do [serviço de OAuth do Google](https://console.cloud.google.com) e inseridas manualmente.

## 🗒️ Licença

MIT © [Vinicius Eidy Okuda](https://github.com/eidynho)
