### 1. Reserve Table
- Endpoint - `/api/v1/reservations/reserve`
- Method - `POST`
- Requires User Authorization - `Bearer token` || `cookies.token`
- Body params -

```js
{ 
    restaurantId: string,
    guests: number,
    dateTime: new Date().toISOString(),
}
```
- Response :

```json
{
    "reservation": {
        "userId": "string",
        "restaurantId": "string",
        "dateTime": "string_(formated_date)",
        "guests": "number",
        "isActive": "boolean",
        "_id": "string",
        "__v": 0
    },
    "message": "Restaurant reserved successfully"
}
```

### 2. Get Reservation Details
- Endpoint - `/api/v1/reservations/`
- Method - `GET`
- Requires User Authorization - `Bearer token` || `cookies.token`
- Response :

```json
{
    "reservations": [
        {
            "_id": "string",
            "userId": "string",
            "restaurantId": "string",
            "dateTime": "string_(formated_date)",
            "guests": "number",
            "isActive": "boolean",
            "__v": 0
        }
        // ...
    ],
    "message": "Reservations fetched successfully"
}
```

### 3. Cancel Reservations
- Endpoint - `/api/v1/reservations/:id`
- Method - `DELETE`
- Requires User Authorization - `Bearer token` || `cookies.token`
- Response :

```json
{
    "message": "Reservation cancelled successfully"
}
```
