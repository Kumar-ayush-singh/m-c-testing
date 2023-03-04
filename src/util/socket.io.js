import { io } from "socket.io-client";

const RECONNECTION_LIMIT = 10000;
const socket = io('http://localhost:3000'); //add option in second parameter an object

export default socket;



socket.on('connect', ()=>{
    console.log(socket.id + " outside functional component ");
});
socket.on("disconnect", (reason)=>{
    console.warn(`Socket is disconnected because of : ${reason}`);
});



socket.io.on("reconnect_attempt", (attempt)=>{
    console.log("reconnecting attemp is " + attempt);
    if(attempt > RECONNECTION_LIMIT){
        console.log(`connection limit exceeded`);
        socket.disconnect();
    }
})
