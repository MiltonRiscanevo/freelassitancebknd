import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pkg from 'pg'

const {Client} = pkg

const app = express()

app.use(cors())

app.use(express.json())

dotenv.config()
const PORT = process.env.PORT || 9001

app.post('/user', (req, res, next)=>{
    console.log(req.body);
    const userData = req.body

    saveUserdata(parseInt(userData.cedula) , userData.nombre, userData.apellido, userData.clave, userData.correo, userData.telefono )
})

app.get('/getusers',async(req,res)=>{
    const getDbUser =await getDataBaseUsers()
    res.send(getDbUser)
})

app.put('/user/:id', async(req,res, next)=>{
    try {
       const userData = req.body

       editUserdata(parseInt(userData.cedula), userData.nombre, userData.apellido, userData.clave, userData.correo, userData.telefono)
    } catch (error) {
        
    }
})

app.delete("/user/:id", async(req, res, next)=>{
    try {
        let {id}= req.params
        id = parseInt(id,10)

        const deleteUser = await deleteDataUser(id)
        if (deleteUser === 1) {
            return res.json({
                message: 'delete user by system'
            })
        }
    } catch (error) {
        next(error)
    }
})

app.listen(PORT, ()=>{
    console.log(`listen on port: ${PORT}`);
})



//funcion para postear los ususarios desde el cliente
const saveUserdata = async (cedula, nombre, apellido, clave, correo, telefono)=>{

    //conexion a la base de datos de la nube
    const client = new Client({
        user: 'mnfoipfwoxjrgd',
        host: 'ec2-3-225-213-67.compute-1.amazonaws.com',
        database: 'ddttcmfu63aenk',
        password: 'd42756a53b865008755e09cc190e2f0741008b46aa597cb2cac94a9a0d362d20',
        port: 5432,
        ssl:{
            rejectUnauthorized: false,
        }
      })
    await client.connect()

    //creando query para insertar datos

    const insert = 
    "INSERT INTO usuarios VALUES ( '"+
     cedula +
     "','"+ 
     nombre +
     "','"+ 
     apellido +
     "','"+ 
     clave +
     "','"+ 
     correo +
     "','"+ 
     telefono +
     "')"

     console.log(`executing query: ${insert}`);
    const res = await client.query(insert)
    console.log(res.rows) // Hello world!
    await client.end()
}

// funcion para obtener los datos de la base de datos

const getDataBaseUsers = async ()=>{

    //conexion a la base de datos de la nube
    const client = new Client({
        user: 'mnfoipfwoxjrgd',
        host: 'ec2-3-225-213-67.compute-1.amazonaws.com',
        database: 'ddttcmfu63aenk',
        password: 'd42756a53b865008755e09cc190e2f0741008b46aa597cb2cac94a9a0d362d20',
        port: 5432,
        ssl:{
            rejectUnauthorized: false,
        }
      })
    await client.connect()

    const getDataUserPostgresql= "SELECT * FROM usuarios"

    console.log(`executing query: ${getDataUserPostgresql}`);
    const res = await client.query(getDataUserPostgresql)
    console.log(res.rows) // Hello world!
    return res.rows
    await client.end()


}

//funcion para borrar datos de la base
const deleteDataUser = async (id)=>{

    //conexion a la base de datos de la nube
    const client = new Client({
        user: 'mnfoipfwoxjrgd',
        host: 'ec2-3-225-213-67.compute-1.amazonaws.com',
        database: 'ddttcmfu63aenk',
        password: 'd42756a53b865008755e09cc190e2f0741008b46aa597cb2cac94a9a0d362d20',
        port: 5432,
        ssl:{
            rejectUnauthorized: false,
        }
      })
    await client.connect()

    const deleteUserPostgresql= `DELETE FROM usuarios WHERE cedula= ${id}`

    console.log(`executing query: ${deleteUserPostgresql}`);
    const res = await client.query(deleteUserPostgresql)
    console.log(res.rows) 
    return res.rows
    
}

const editUserdata = async (cedula, nombre, apellido, clave, correo, telefono)=>{

    //conexion a la base de datos de la nube
    const client = new Client({
        user: 'mnfoipfwoxjrgd',
        host: 'ec2-3-225-213-67.compute-1.amazonaws.com',
        database: 'ddttcmfu63aenk',
        password: 'd42756a53b865008755e09cc190e2f0741008b46aa597cb2cac94a9a0d362d20',
        port: 5432,
        ssl:{
            rejectUnauthorized: false,
        }
      })
    await client.connect()

    //creando query para insertar datos

    const edit = 
    "UPDATE usuarios SET'"+
    cedula+
    "','"+ 
    nombre +
    "','"+ 
    apellido +
    "','"+ 
    clave +
    "','"+ 
    correo +
    "','"+ 
    telefono +
    "' WHERE '"+cedula+"'"

     console.log(`executing query: ${edit}`);
    const res = await client.query(edit)
    console.log(res.rows) // Hello world!
    await client.end()
}