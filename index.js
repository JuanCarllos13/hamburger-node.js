const { request, response, query } = require('express')
const express = require('express')
const uuid= require('uuid')
const cors = require("cors")
const port = 3001


const app = express()
app.use(express.json())
app.use(cors())


const users = []

const checkUser = (request, response, next) =>{
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({messagem: 'user not founf'})
    }
    request.index = index
    request.UserId = id
    next()

}
const method = (request, response, next) =>{
    console.log(request.method)
    next()

}


app.get('/users',method, (request, response) =>{
    return response.json(users)

})

app.post('/users',method, (request, response) =>{
    const {order, ClientName} = request.body

    //if(age < 18) throw new Error("only allowed users over 18 years old")
    const user = {id:uuid.v4(), order, ClientName}

    users.push(user)

    return response.status(201).json(user)

})  

app.put('/users/:id',method, checkUser,(request, response) =>{
    const {order, ClientName, price, status} = request.body
    const index = request.index
    const id = request.UserId
    const updateUser = { id, order, ClientName, price, status}

    users[index] = updateUser

    return response.json(updateUser)

    

})

app.delete('/users/:id',method, checkUser, (request, response) =>{
    const index = request.index
    users.splice(index,1)

    return response.status(204).json(users)

})
app.get('/users/:id',method, checkUser, (request, response) =>{
    const id = request.UserId
    const index = request.index

    const exactorder= users[index]

    return response.json(exactorder)
})
app.patch('/users/:id', method, checkUser, (request, response) =>{
    const {order, ClientName, price, status} = request.body 
    const index = request.index
    const id = request.userId
   
    const updateOrderPatch = { id, order, ClientName, price, status: "Pedido finalizado"}
    users[index] = updateOrderPatch

    console.log(updateOrderPatch)

    return response.json(updateOrderPatch)
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}🍔`)
})