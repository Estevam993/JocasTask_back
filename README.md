# Jocas Task API
Um breve passo a passo sobre a API que estou criando.
___
# Sumário
- [Jocas Task API](#jocas-task-api)
- [Sumário](#sumário)
- [Objetivo](#objetivo)
- [End-points](#end-points)
  - [Users](#users)
    - [Create](#create)
    - [Get](#get)
    - [Update](#update)
    - [Delete](#delete)
  - [Auth](#auth)
  - [Frames](#frames)
    - [Create](#create-1)
    - [Get by user id](#get-by-user-id)
    - [Update](#update-1)
    - [Delete](#delete-1)

___
# Objetivo
O objetivo principal desta API, é fazer um CRUD para um KANBAN.

Este CRUD terá que:
- Criar um usuário, atualizar um usuário, exibir um usuário, e autenticar o usuário.
- Criar uma task, atualizar uma task, exibir uma task.
- Criar uma coluna, atualizar uma coluna e exibir as colunas.
___
# End-points
## Users
### Create
==POST== **`/user`**

<p style="text-align:center">BODY</p>

```json
{
  "name": "teste",
  "email": "teste@teste.com.br",
  "password": "teste"
}
```
- Este end-point criara um usuário novo.

> [!WARNING] ATENÇÃO
> É necessário a senha ter 3 caracteres.
### Get
==GET== **`/user/:id?`**

- Este end-point mostra todos os usuários, ou então apenas um se colocado id.
### Update
==POST== **`/user/update/:id`**

<p style="text-align:center">BODY</p>

```json
{
  "name": "Teste 2",
  "password": "123"
}
```
- Atualiza o usuário de acordo com os campos enviados.
### Delete
==DELETE== **`/user/:id`**
- Desativa o usuário informado.
___
## Auth
==POST== **`/auth/login`**

<p style="text-align:center">BODY</p>

```json
{
  "email": "teste@teste.com.br",
  "password": "123"
}
```
- Caso a senha esteja correta, retorna um toquem.

___
## Frames
A partir daqui, será necessário o jwt token para utilizar os endpoints. 
### Create
==POST== **`/frames`**

<p style="text-align:center">BODY</p>

```json
{
  "description": "Meu quadro"
}
```
- Este end-point criara um quadro novo.
### Get by user id
==GET== **`/frames`**

- Este end-point mostra todos os quadros do usuário atual
### Update
==POST== **`/frames/update/4`**

<p style="text-align:center">BODY</p>

```json
{
  "name": "Teste 2",
  "password": "123"
}
```
- Atualiza o usuário de acordo com os campos enviados.
### Delete
==DELETE== **`/user/:id`**
- Desativa o quadro informado.