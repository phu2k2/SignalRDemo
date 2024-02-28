//create connection
var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

//connect to methods that hub invokes aka receive notifications from hub
connection.on("ReceiveMessage", (user, message) => {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${user} says ${message}`;
});

//invoke hub methods aka send notification to hub
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

connection.start().then(function () {
    document.getElementById(sendMessage).disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});