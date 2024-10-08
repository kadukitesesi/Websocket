const stompClient = new StompJs.Client({
    brokerURL: 'wss://websocket-production-385f.up.railway.app/websocketdudu',
    debug: function (str) {
        console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});


stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/saudacao', (greeting) => {
        console.log("Mensagem recebida:", greeting.body)
        showGreeting(JSON.parse(greeting.body).conteudo);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    const nome = $("#name").val();
    const mensagem = $("#mensagem").val();

    if (!mensagem) {
        alert("Por favor, digite uma mensagem.");
        return;
    }

    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({
            name: nome,
            mensagem: mensagem
        })
    });
}


function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});