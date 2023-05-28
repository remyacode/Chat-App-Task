const express = require('express');
const fs = require('fs');

const app = express();
  

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

app.get('/login', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Enter Username</title>
      </head>
      <body>
        <form action="/" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
          
          <br>
          <input type="text" name="username" id="username" >
          <button type="submit">Login</button>
        </form>
      </body>
    </html>
  `);
});

app.get('/', (req, res) => {
  fs.readFile("username.txt",(err,data)=>{
    if(err){
      console.log(err);
      data='No chats exists';
    }
    res.send(`
    <html>
      <head>
        <title>Message Page</title>
      </head>
      <body>
        ${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')"
        >

        ${fs.readFileSync('username.txt')}
          <br>
          <input type="text" name="message">
          <input type="hidden" name="username" id="username" >
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
  `);
  })
  });
app.post('/login', (req, res) => {
  console.log(req.body.username)
  //console.log(req.body.message)
  fs.writeFile("username.txt", `${req.body.username}`, { flag: 'a' }, (err) =>
  err ? console.log(err) : res.redirect("/")
  )
    });

app.post('/', (req, res) => {
      console.log(req.body)
        //.username);console.log(req.body.message)

      fs.writeFile("username.txt", `${req.body.username}: ${req.body.message} `, { flag: 'a' }, (err) =>

        err ? console.log(err) : res.redirect("/")
      )
    });

app.listen(3999, () => {
  console.log('Server is running on port 3000');
});
