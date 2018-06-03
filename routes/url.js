const express = require('express');
const router = express.Router();
const operations = require('../models/Url');

router.post('/url', (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    console.log(req.headers.host);
    let customResponse = {};
    operations.checkAndCreate(req.body.url).then(result => {
        // res.send(result);
        if (result.length > 0) {
            customResponse.tinyurl = `${req.headers.host}/${result[0].shortid}`;
            res.send(customResponse);
        }
    }).catch(err => {
        res.send(err);
    });
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    operations.getUrl(req.params.id).then((result) => {
        let customResponse = {};
        if (result.length > 0) {
            customResponse.url = result[0].original_url;
            res.send(customResponse);
        } else {
            res.json({
                'error': 'URL not found'
            });
        }
    }).catch((err) => {
        res.send(err);
    })
    // res.redirect(temp);
});

module.exports = router;