import { io } from "socket.io-client";
import { HOST_URL, PORT } from "./hostDetails";

const RECONNECTION_LIMIT = 10;
const socket = io(`${HOST_URL}`); //add option in second parameter an object

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

window.addEventListener('online', () => {
    socket.connect();
});