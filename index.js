//-------------require-------------//
const express = require('express');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');

//-------------Intitial-------------//
const app = express();
const PORT = process.env.PORT || 5000; //process.env.PORT From system //PORT with ip ex.localhost are ip
const client = new line.Client({
    channelAccessToken: '<channel access token>'
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

    //Check Empty object
    if (Object.keys(req.body).length !== 0) {
        let body = req.body;
        let events = body.events;
        //---------Param-------///     
        let replyToken = events.replyToken;
        let type = events.type;
        //--------------------//

        switch (type) {
            //Event--> Text,Sticker
            case 'message':
                const message = {
                    type: 'text',
                    text: 'HELLO'
                };
                replyMessage(replyToken, message);
                break;
                //Event--> add Friend or unblock
            case 'follow':
                const message = {
                    type: 'text',
                    text: 'Thx'
                };
                replyMessage(replyToken, message);
                    break;
                //Event-->UnFriend or block
            case 'unfollow':
                const message = {
                    type: 'text',
                    text: 'Unfriend Why?'
                };
                replyMessage(replyToken, message);
                break;

            default:
                break;
        }

        // const message = {
        //     type: 'text',
        //     text: 'Hello World!'
        // };

        // client.replyMessage('<replyToken>', message)
        //     .then(() => {
        //         console.log(`Replr Successfully!`);
        //     })
        //     .catch((err) => {
        //         console.log(`Error: ${err}`);
        //     });

    } else {
        res.status(400).send({
            errorMessage: 'body is empty'
        });
    }
});
//---------------------------------------//

//-------------Function------------------//
const reply = (replyToken, message) => {
    client.replyMessage('<replyToken>', message)
    .then(() => {
        console.log(`Reply Successfully!`);
    })
    .catch((err) => {
        console.log(`Error is error: ${err}`);
    });
}
const pushMessage = (userID, message) => {
    client.pushMessage('<replyToken>', message)
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