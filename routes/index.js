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

router.get('/rank-1-10', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    
    collection.find({}, {limit: 10, projection: { "fields.titre_avec_lien_vers_le_catalogue":1}}, function(e, docs){
        res.render('rank-1-10', {
            'title': 'Documents aux rangs 1 à 10',
            'documents': docs
        });
    });
});


router.get('/authors-n', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    
    collection.find({"fields.titre_avec_lien_vers_le_catalogue": /^N/}, {projection: {"fields.titre_avec_lien_vers_le_catalogue":1, "fields.auteur":1}}, function(e, docs){
        res.render('authors-n', {
            'title': 'Auteurs dont le nom du document commence par N',
            'documents': docs
        });
    });
});

module.exports = router;
