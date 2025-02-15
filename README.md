# Jocas Task API
Um breve passo a passo sobre a API que estou criando.
___
# Sumário
1. [Objetivo](#objetivo)
2. [Endpoints](#endpoints)
	1. [Users](#users)
		1. Create
		2. Get
		3. Update
		4. Delete
	2. [Auth](#auth)
	3. [Frames](#frames)
		1. Create
		2. Get user by id
		3. Update
		4. Delete
	4. [Columns](#columns)

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
- Atualiza o quadro de acordo com os campos enviados.
### Delete
==DELETE== **`/user/:id`**
- Desativa o quadro informado.
___
## Columns
### Create
==POST== **`/columns`**

<p style="text-align:center">BODY</p>

```json
{
  "description": "Minha coluna"
}
```
- Este end-point criara uma coluna nova.
### Update
==POST== **`/columns/update/:id`**

<p style="text-align:center">BODY</p>

```json
{
  "description": "To Do Now"
}
```
- Atualiza a coluna de acordo com os campos enviados.
### Delete
==DELETE== **`/column/:id`**
- Desativa a coluna informada.
___
## Tasks
### Create
==POST== **`/tasks`**

<p style="text-align:center">BODY</p>

```json
{
  "description": "Minha coluna"
}
```
- Este end-point criara uma tarefa nova.
### Update
==POST== **`/tasks/update/:id`**

<p style="text-align:center">BODY</p>

```json
{
  "description": "To Do Now"
}
```
- Atualiza a tarefa de acordo com os campos enviados.
### Delete
==DELETE== **`/tasks/:id`**
- Desativa a tarefa informada.
