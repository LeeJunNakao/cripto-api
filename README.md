# Instruction

* Start container: `docker-compose run --service-ports app`
* Start server: `node main.js`

## API

### GET /currency?name={name:string}

### POST /currency

#### Request body
```
name: string
quantity: number
```

### PUT /currency

#### Request body
```
name: string
quantity: number
```