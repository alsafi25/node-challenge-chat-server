const express = require("express");
const cors = require("cors");

const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json())



//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
//const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/", function (request, response) {
 response.sendFile(__dirname + "/index.html");
});
// To read all messages
app.get("/messages", function(req, res){
 res.json(messages)
})
// To create a message

app.post('/messages', (req, res) => {
function validateNewMsg(newMsg) {
 if (
 newMsg !== undefined && 
 newMsg.from !== undefined &&
 newMsg.from.length !== 0 &&
 newMsg.text !== undefined &&
 newMsg.text.length !== 0
 ){
 return true;
 }else{
 return false;
 }
 
 
}
function createId() {
 let newId = messages[messages.length - 1].id + 1;
 return newId;
} 
 let newMsg = {
 
 from: req.body.from,
 text: req.body.text
 }

 if (validateNewMsg(newMsg)) {
 
 newMsg.id = createId();
 messages.push(newMsg);
 res.status(200).send("New message created");
 } else {
 res.status(400).send("Bad request");
 }
})
// Read messages by id
app.get('/messages/:id', (req, res) => {
 const { id } = req.params;
 const msg = messages.find(message => message.id == id);

 if (msg !== undefined) {
 res.json(msg);
 } else {
 res.status(404).send("Not found");
 }
});
//Delete message
app.delete('/messages/:id', (req, res) => {
 const { id } = req.params;
 let index = messages.findIndex(message => message.id === parseInt(id));

 if (index === -1) {
 res.status(404).send("No message with such ID to delete");
 } else {
 messages.splice(index, 1);
 res.status(200).send("Message deleted");
 }
});
//Filter messages
app.get('/messages/search/text', function (req, res){
 let text = req.query.text; 
 let filteredQuotes = (messages, text)=>{
 return messages.filter((m) => (m.text.toLowerCase().includes(text)));
 }
 res.send(filteredQuotes(messages, text));
})
//Read latest messages
app.get('/messages/latest/only', function (req, res){
 const latestMessages = messages.filter(i => i.id <= 10);
 res.send(latestMessages);
});

app.listen(5005);
