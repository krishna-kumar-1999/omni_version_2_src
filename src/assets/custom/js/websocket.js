function socket_connect(){
    let socket = new WebSocket("wss://developtesting.my3cx.sg:4010");

    socket.onopen = function(e) {
        console.log('socket connected');
    };
    
    socket.onmessage = function(event) {
        $('#socket_data').val(event.data)
        $("#socket_data").click()
    };
    
    socket.onclose = function(event) {
        console.log('close');
    };
    
    socket.onerror = function(error) {
        console.log('error');
    };
}