function showToast(msg) {
    console.log("El mensaje es: ", msg);
    $.toast({
        text: msg,
        position: "top-right"
    })
}

window.socket = null;

function connectToSocketio() {
    console.log("connection attempt")
    let server = window.location.protocol + "//" + window.location.host;
    console.log(server);
    window.socket = io.connect(server);

    //window.socket.emit('enter-room',{room: "test-room"})

    window.socket.on('toast', function(data){
        showToast(data.message);
    })

    window.socket.on('room-enter', function(data){
        console.log("Entering Room "+data.roomId)
        window.location.href = '/app/campaign/'+data.roomId;
    })
}
function joinRoom(name,id,username){
    console.log("Entering Room "+name);
    window.socket.emit('enter-room',{room:name,roomId:id,user:username})
    
    //window.location.href = "/app/campaign/"+id;
}

function messageToServer(msg) {
    window.socket.emit('message-to-server', {message: msg});
}

$(function () {
    console.log("hi");
    connectToSocketio();
})