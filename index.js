const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//process.env.PORT From system //PORT with ip ex.localhost are ip
const PORT = 5000;
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({status: 'OK'});//on web
    console.log('Get /');

});

//for connect line
app.post('/webhook', (req, res) => {
    let body = req.body;
    let respone = {
        status: 'OK',
        body: body
    }
    res.send(respone);//on web
    console.log('POST /');
    console.log(body);
    
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    
});