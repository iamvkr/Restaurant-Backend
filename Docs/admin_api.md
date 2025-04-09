### 1. Register
- Endpoint - `/api/v1/admin/register`
- Method - `POST`
- Body params -
```js
{ 
    username:string,  //required
    email:string, //required
    password:string //required
}
```

- Response

```json
{
    "token": "string",
    "admin": {
        "username": "string",
        "email": "string",
        "password": "string",
        "_id": "string",
        "__v": 0
    }
}
```

### 2. Login
- Endpoint - `/api/v1/admin/login`
- Method - `POST`
- Body params -
```js
{
    email:string, //required
    password:string //required
}
```

- Response

```json
{
    "token": "string",
    "admin": {
        "_id": "string",
        "username": "string",
        "email": "string",
        "password": "string",
        "__v": 0
    }
}
```

### 3. Profile
- Endpoint - `/api/v1/admin/profile`
- Method - `GET`
- Requires Authorization - `Bearer token` || `cookies.token`
- Response

```json
{
    "_id": "string",
    "username": "string",
    "email": "string",
}
```

### 4. Logout
- Endpoint - `/api/v1/admin/logout`
- Method - `GET`
- Requires Authorization - `Bearer token` || `cookies.token`
- Response :

```json
{
    "message": "Logged out"
}