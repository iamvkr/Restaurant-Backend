### 1. get Restaurants (user)
- Endpoint - `/api/v1/restaurants`
- Method - `GET`
- Requires User Authorization - `Bearer token` || `cookies.token`
- Response :

```json
{
    "restaurants": [
        {
            "_id": "string",
            "name": "string",
            "location": "string",
            "capacity": "number",
            "cusines": ["string_items"],
            "__v": 0
        }
        // ...
    ]
}
```

### 2. get Restaurants (admin)
- Endpoint - `/api/v1/restaurants/list`
- Method - `GET`
- Requires Admin Authorization - `Bearer token` || `cookies.token`
- Response :

```json
{
    "restaurants": [
        {
            "_id": "string",
            "name": "string",
            "location": "string",
            "capacity": "number",
            "cusines": ["string_items"],
            "__v": 0
        }
        // ...
    ]
}
```

### 3. Create Restaurants
- Endpoint - `/api/v1/restaurants/create`
- Method - `POST`
- Requires Admin Authorization - `Bearer token` || `cookies.token`
- Body params -

```json
{
    "name": "string",// required
    "location": "string",// required
    "capacity": "number", // required
    "cusines": ["string_items"]
}
```

- Response :

```json
{
    "restaurant": {
        "name": "string",
        "location": "string",
        "capacity": "number",
        "cusines": [],
        "_id": "string",
        "__v": 0
    },
    "message": "Restaurant added Successfully"
}
```

### 4. Delete Restaurants
- Endpoint - `/api/v1/restaurants/delete/:id`
- Method - `DELETE`
- Requires Admin Authorization - `Bearer token` || `cookies.token`
- Url params - `id` - 'string' - restaurantId
- Response :

```json
{
    "message": "Restaurant deleted successfully"
}
```
