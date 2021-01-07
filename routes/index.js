var express = require('express');
var router = express.Router();

/* GET documents page. */
router.get('/index', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    
    collection.find({}, {}, function(e, docs){
        res.render('index', {
            'title': 'Gestion des documents',
            'documents': docs
        });
    });
    
});


module.exports = router;
