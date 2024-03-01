// // import { Socket } from "socket.io";

// export const sio = (server)=>{
//     return Socket(server,{
//         transport: ['polling'],
//         cors:{
//             origin:"*"
//         }
//     })                 
// };

// export const connection = (io)=>{
//     io.on("connection", socket=>{
//         console.log("a user is connected")

//         socket.on("message",message=>{
//             console.log(`message from ${socket.id}: ${message}`)
//         })
//         socket.on("disconnect",()=>{
//             console.log(`socket ${socket.id} disconnected`)
//         })
//     })
// }