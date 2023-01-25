# API DOC

## Endpoints :

List of available endpoints:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /user`
- `PUT /user`
- `PUT /user/change-password`
- `POST /post`
- `PUT /post/:id`
- `DELETE /post/:id`
- `PUT /post/like/:id`
- `PUT /post/unlike/:id`
- `GET /post`
- `GET /post/:id`
- `GET /post/user/:id`

&nbsp;

## Global header Request :

```json
{
  "Authentication": "Bearer token"
}
```

## 1. POST /auth/register

Request :

-body :

```json
{
    "name" : string,
    "username" : string,
    "email" : string,
    "password" : string,
    "photo" : string
}
```

_Response (201 - Created)_

```json
{
    "success" : true,
    "message" : "Your account has been successfully created",
    "data" : {
        "name" : string,
        "username" : string,
        "email" : string,
        "password" : string,
        "photo" : string
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "success": false,
  "message": "Invalid Data",
  "data": null
}
OR
{
  "success": false,
  "message": "Duplicate email",
  "data": null
},
OR
{
  "success": false,
  "message": "You have entered invalid email address",
  "data": null
}
OR
{
  "success": false,
  "message": "Duplicate username",
  "data": null
}
```

&nbsp;

## 2. POST /auth/login

Request :

-body :

```json
{
    "username" : string,
    "password" : string
}
```

_Response (200 - OK)_

```json
{
    "success" : true,
    "message" : "Successfully logged in",
    "data" : {
        "token" : string
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "success": false,
  "mesage": "Username not found",
  "data": null
}
OR
{
  "success": false,
  "mesage": "Invalid password",
  "data": null
}
```

## 3. POST /auth/logout

Request :

- headers :

_Response(200 - OK)_

```json
{
  "success": true,
  "message": string,
  "data": null
}
```

## 4. GET /user

Request :

- headers

_Response(200 - OK)_

```json
{
  "success" : true,
  "message" : string,
  "data" : {
    "id" : integer,
    "name" : string,
    "username" : string,
    "email" : string,
    "photo" : string,
    "createdAt" : date,
    "updatedAt" : string
  }
}
```

## 5. PUT /user

Request :

- headers
- body

```json
{
  "name" : string,
  "username" : string,
  "email" : string,
  "photo" : string
}
```

_Response(200-OK)_

```json
{
  "success" : true,
  "message" : string,
  "data" : {
    "name" : string,
    "username" : string,
    "email" : string,
    "photo" : string,
    "createdAt" : date,
    "updatedAt" : string
  }
}
```

_Response(400 - Bad Request)_

```json
{
  "success": false,
  "message": "Invalid Data",
  "data": null
}
OR
{
  "success": false,
  "message": "Duplicate email",
  "data": null
},
OR
{
  "success": false,
  "message": "You have entered invalid email address",
  "data": null
},
```

## 6. /user/change-password

request :

- headers
- body :

```json
{
  "oldPassword" : string,
  "newPassword" : string,
  "confirmNewPassword" : string
}
```

_Response(200 - OK)_

```json
{
  "success" : true,
  "message" : string,
  "data" : null
}
```

_Response(400 - Bad Request)_

```json
{
  "success" : false,
  "message" : "Password not found",
  "data" : null
}
OR
{
  "success" : false,
  "message" : "Password not match",
  "data" : null
}
OR
{
  "success" : false,
  "message" : "Invalid Data",
  "data" : null
}
```
