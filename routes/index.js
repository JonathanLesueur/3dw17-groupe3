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

router.get('/titles', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    
    collection.find({}, {projection: { "fields.titre_avec_lien_vers_le_catalogue":1}}, function(e, docs){
        res.render('titles', {
            'title': 'Tous les titres',
            'documents': docs
        });
    });
    
});

module.exports = router;
