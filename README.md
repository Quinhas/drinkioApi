<h1 align="center">Drink.io - API</h1>

<p align="center">
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=5965E0&labelColor=121214" alt="License">

  <img src="https://img.shields.io/github/forks/Quinhas/drinkioApi?label=forks&message=MIT&color=5965E0&labelColor=121214" alt="Forks">

  <img src="https://img.shields.io/github/stars/Quinhas/drinkioApi?label=stars&message=MIT&color=5965E0&labelColor=121214" alt="Stars">
</p>

## 👨‍💻 Tecnologias

Esse projeto foi desenvolvido utilizando as seguintes tecnologias:

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)

## 🚀 Instalação e Configuração

```bash

# Para rodar essa aplicação é necessário ter instalado o Docker: https://www.docker.com/

# Clone o repositório e entre na pasta do projeto
$ git clone git@github.com:Quinhas/drinkioApi.git && cd drinkioApi

# Instale as dependências
$ npm install
# ou
$ yarn install

# Crie um arquivo .env a partir do .env.default e atualize as variáveis de ambiente

# Inicie o docker
$ docker-compose up

# Rode o comando para criar o banco de dados
$ yarn prisma db pull

# Execute a aplicação
$ npm run dev
# ou
$ yarn dev

# Caso queira popular o banco de dados
$ yarn restoreData

# Abra http://localhost:3001 no seu navegador para ver a aplicação rodando!
```

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para obter mais detalhes.

---
