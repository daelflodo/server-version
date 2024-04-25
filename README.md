<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
 
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## .env
[PORT](https://github.com/nestjs/nest) = \
[DB_HOST](https://github.com/nestjs/nest) = \
[DB_PORT](https://github.com/nestjs/nest) = \
[DB_USER](https://github.com/nestjs/nest) = \
[DB_PASSWORD](https://github.com/nestjs/nest) = \
[DB_NAME](https://github.com/nestjs/nest) =

## docker-compose, init.sql
[Docker:](https://github.com/nestjs/nest) Ejecutar en el terminal para crear el contenedor del archivo docker-compose.yml 
 ```bash
sudo docker-compose up
```
```bash
# Al ejecutar el archivo si no existe la base de dato la crea
SELECT 'CREATE DATABASE adminiodb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE dataname = 'adminiodb')\gexec
```
## Migraciones
* Generar una migracion
````
npm run m:gen -- ./migrations/'name_migration'

````
* Ejecutar la Migracion generada
````
npm run m:run
````
## Exceptions
### Request CustomException
````
import { createCustomException } from 'src/common/exceptions/exceptionsGenerator';

if (userFound) {
      const CustomException = createCustomException(
        'La Cedula ya esta registrada para otro usuario',
        409,
        'User',
      );
      throw new CustomException();
    }
````
### Response CustomException
````
{
    "timesstamps": "2024-04-21T18:43:38.308Z",
    "path": "/api/user",
    "error": {
        "message": "La Cedula ya esta registrada para otro usuario",
        "error": "ERROR_USER_CONFLICTC",
        "statusCode": 409
    }
}
````


## Support

- Author - [David Flores](https://github.com/daelflodo)