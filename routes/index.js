var express = require('express');
var router = express.Router();

/* GET documents page. */
router.get('/', function(req, res) {
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
    
    collection.find({"fields.rang": {$gte: 1, $lte: 10}}, {limit: 10, projection: { "fields.titre_avec_lien_vers_le_catalogue":1, "fields.rang":1}, sort: {"fields.rang": 1}}, function(e, docs){
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

router.get('/no-type-de-document', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    
    collection.find({"fields.type_de_document": { $exists: false}}, {}, function(e, docs){
        res.render('no-type-de-document', {
            'title': 'Tous les documents ayant pas de champ "type_de_document"',
            'documents': docs
        });
    });
});

router.get('/all-types', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    
    collection.distinct("fields.type_de_document", {}, function(e, docs){
        res.render('all-types', {
            'title': 'Tous les types de documents',
            'documents': docs
        });
    });
    
});

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    
    collection.find({}, {}, function(e, docs){
        res.render('index', {
            'title': 'Gestion des documents',
            'documents': docs
        });
    });
});

router.post('/emprunter', function(req, res) {
    var db = req.db;
    var documentRecordid = req.body.document_id;
    var collection = db.get('documents');
    collection.update({"recordid" : documentRecordid},{$set: {est_emprunte: true},$inc: {"fields.nombre_de_reservations": 1}},
    function (err, doc) {
        if (err) {
            res.send("Il y a eu un problème lors de l'insertion de base de données.");
        }
        else {
            res.redirect("/");
        }
    });
});

router.post('/rendre', function(req, res) {
    var db = req.db;
    var documentRecordid = req.body.document_id;
    var collection = db.get('documents');
    collection.update({"recordid" : documentRecordid},{$set: {"est_emprunte": false}},
    function (err, doc) {
        if (err) {
            res.send("Il y a eu un problème lors de l'insertion de base de données.");
        }
        else {
            res.redirect("/");
        }
    });
});

module.exports = router;
