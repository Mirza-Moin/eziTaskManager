import {server} from './app.js'
import { connectDb } from './data/database.js';

connectDb()

server.listen(process.env.PORT,()=>{
    console.log('server is working');
})