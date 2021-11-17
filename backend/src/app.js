import express, {json} from 'express'
import cors from 'cors'

//Importing Routes
import addressRoutes from './routes/address'


//Initialization
const app = express()
app.use(cors())


//Middlewares
app.use(json())
app.use(express.urlencoded({ extended: true })); 

//Def. Routes
app.use('/api/address', addressRoutes )

//export
export default app