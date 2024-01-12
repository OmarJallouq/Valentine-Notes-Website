const express = require('express');
const router = express.Router();

router.get('/inbox', (req, res) => {
    const str = [{
        "from": "Annonymous",
        "to": "Omar",
        "message": "I love you",
    }];
    res.end(JSON.stringify(str));
})

router.post('/send-a-message', (req, res) => {
    res.end('NA');
})

module.exports = router;