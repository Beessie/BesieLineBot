//-------------require-------------//
const express = require('express');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');

//-------------Intitial-------------//
const app = express();
const PORT = process.env.PORT || 5000; //process.env.PORT From system //PORT with ip ex.localhost are ip
const client = new line.Client({
    channelAccessToken: 'ZZSw8EgXeCrX04FfO1UfQuPzxs7R8KeY6wFPkBFtkSJvr2083VQgyvd/vesiypHXaQFPqogoj66f8V3zEZYqfWv1sYPho8DJJ5TDfUSU0HHes2qyjt5Q1+vUk7YsZMnk2NY6/TgY1b2nQd87nnVawAdB04t89/1O/w1cDnyilFU='
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send({
        status: 'OK'
    }); //on web
    console.log('Get /');

});


//for connect line
app.post('/webhook', (req, res) => {
    console.log('POST /');
    console.log('body');
    console.log(req.body);
    //Check Empty object
    if (Object.keys(req.body).length !== 0) {
        let body = req.body;
        let events = body.events[0];
        //---------Param-------///     
        let replyToken = events.replyToken;
        let type = events.type;
        //--------------------//
        let message = [];

        switch (type) {
            //Event--> Text,Sticker
            case 'message':
                message = {
                    type: 'text',
                    text: 'HELLO'
                };
                replyMessage(replyToken, message);
                break;
                //Event--> add Friend or unblock
            case 'follow':
                message = {
                    type: 'text',
                    text: 'Thx'
                };
                replyMessage(replyToken, message);
                break;
                //Event-->UnFriend or block
            case 'unfollow':
                message = {
                    type: 'text',
                    text: 'Unfriend Why?'
                };
                replyMessage(replyToken, message);
                break;

            default:
                break;
        }
    } else {
        res.status(400).send({
            errorMessage: 'body is empty'
        });
    }
});
//---------------------------------------//

//-------------Function------------------//
const replyMessage = (replyToken, message) => {
    console.log(`->replyMessage:: replyToken: ${replyToken}, message: ${message})`);
    client.replyMessage(replyToken, message)
        .then(() => {
            console.log(`Reply Successfully!`);
        })
        .catch((err) => {
            console.log(`Error is error: ${err}`);
        });
}
const pushMessage = (userID, message) => {
    console.log(`->pushMessage:: userID: ${userID}, message: ${message})`);
    client.pushMessage(userID, message)
        .then(() => {
            console.log(`Reply Successfully!`);
        })
        .catch((err) => {
            console.log(`Error is error: ${err}`);
        });
}

//---------------------------------------//
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});