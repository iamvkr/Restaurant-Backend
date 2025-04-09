### 1. Register
- Endpoint - `/api/v1/users/register`
- Method - `POST`
- Body params -

```js
{ 
    username:string,  //required
    email:string, //required
    password:string //required
}
```

- Response:

```json
{
    "token": "string",
    "user": {
        "username": "string",
        "email": "string",
        "password": "string",
        "reservations": ["reservationIds"],
        "_id": "string",
        "__v": 0
    }
}
```

### 2. Login
- Endpoint - `/api/v1/users/login`
- Method - `POST`
- Body params -

```js
{
    email:string, //required
    password:string //required
}
```

- Response :

```json
{
    "token": "string",
    "user": {
        "username": "string",
        "email": "string",
        "password": "string",
        "reservations": ["reservationIds"],
        "_id": "string",
        "__v": 0
    }
}
```

### 3. Profile
- Endpoint - `/api/v1/users/profile`
- Method - `GET`
- Requires Authorization - `Bearer token` || `cookies.token`
- Response :

```json
{
    "_id": "string",
    "username": "string",
    "email": "string"
}
```

### 4. Logout
- Endpoint - `/api/v1/users/logout`
- Method - `GET`
- Requires Authorization - `Bearer token` || `cookies.token`
- Response :

```json
{
    "message": "Logged out"
}
```