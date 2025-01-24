# Jocas Task API
Um breve passo a passo sobre a API que estou criando.
___
# Sumário
- [Jocas Task API](#jocas-task-api)
- [Sumário](#sumário)
- [Objetivo](#objetivo)
- [End-points](#end-points)
  - [Users](#users)
  - [Auth](#auth)

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

==GET== **`/user/:id?`**

- Este end-point mostra todos os usuários, ou então apenas um se colocado id.

==POST== **`/user/update/:id`**

<p style="text-align:center">BODY</p>

```json
{
    "name": "Teste 2",
    "password": "123"
}
```
- Atualiza o usuário de acordo com os campos enviados.

==DELETE== **`/user/delete/:id`**
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
- Caso a senha esteja correta, retorna um token.

