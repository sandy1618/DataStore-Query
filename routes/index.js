var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

router.use(bodyParser.json());

router.get('/', function (req, res) {
    request('https://api.bittrex.com/api/v1.1/public/getmarketsummaries', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var check = "";
            var query = "";
            var success = "";
            var result = JSON.parse(body);
            var raw = JSON.stringify(body.result);
            res.render("index", { raw, success } );
        }
    });
});

router.post('/post', function (req, res) {
    request('https://api.bittrex.com/api/v1.1/public/getmarketsummaries', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var check = "";
            var _result = "";
            var query = "";
            var data = JSON.parse(body);
            mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Connected to mongodb database instance.");
                }
                const db = client.db('bittrex');
                db.dropCollection("bittrex_data", (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Droping obsolete database from fifo queue : " + result);
                    }
                });
                db.collection("bittrex_data").insertMany(data.result, (err, result) => {
                    if (err) {
                        console.log(err);
                        var success = "Data Store returned error.";
                        res.render("index", { body, success });
                        client.close();
                    } else {
                        success = "Data Store returned 0.";
                        _result = result;
                        res.send({ _result, data });
                        client.close();
                    }
                });
            });
        }
    });
});

router.get('/post', function (req, res) {
    request('https://api.bittrex.com/api/v1.1/public/getmarketsummaries', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var check = "";
            var query = "";
            var _result = "";
            var data = JSON.parse(body);
            mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Connected to mongodb database instance.");
                }
                const db = client.db('bittrex');
                db.collection("bittrex_data").find().toArray((err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        _result = result;
                        res.render("bittrex-datastore", { _result, data });
                        client.close();
                    }
                });
            });
        }
    });
});

router.get('/recent', function (req, res) {
    request('https://api.bittrex.com/api/v1.1/public/getmarketsummaries', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var check = "";
            var query = "";
            var data = JSON.parse(body);
            res.send(data.result);
        }
    });
});

router.get('/poloniex', function (req, res) {
    request('https://poloniex.com/public?command=returnTicker', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var check = "";
            var query = "";
            var poloniex_data = JSON.parse(body);
            res.send(poloniex_data);
        }
    });
});

router.get('/poloniex-post', function (req, res) {
    request('https://poloniex.com/public?command=returnTicker', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var check = "";
            var query = "";
            var _result = "";
            var poloniex_data = JSON.parse(body);
            mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Connected to mongodb database instance.");
                }
                const db = client.db('poloniex');
                db.collection("poloniex_data").find().toArray((err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        _result = result;
                        res.send(poloniex_data);
                        // res.render("binance-datastore", { _result, binance_data });
                        client.close();
                    }
                });
            });
        }
    });
});

router.post('/poloniex-post', function (req, res) {
    request('https://poloniex.com/public?command=returnTicker', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var check = "";
            var _result = "";
            var query = "";
            var poloniex_data = JSON.parse(body);
            mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Connected to mongodb database instance.");
                }
                const db = client.db('poloniex');
                db.dropCollection("poloniex_data", (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Droping obsolete database from fifo queue : " + result);
                    }
                });
                db.collection("poloniex_data").insertMany(poloniex_data, (err, result) => {
                    if (err) {
                        console.log(err);
                        var success = "Data Store returned error.";
                        // res.render("index", { body, success });
                        client.close();
                    } else {
                        success = "Data Store returned 0.";
                        _result = result;
                        res.send({ _result, poloniex_data });
                        client.close();
                    }
                });
            });
        }
    });
});

router.get('/binance', function (req, res) {
    request('https://api.binance.com/api/v1/ticker/24hr', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var check = "";
            var query = "";
            var binance_data = JSON.parse(body);
            res.send(binance_data);
        }
    });
});

router.get('/binance-post', function (req, res) {
    request('https://api.binance.com/api/v1/ticker/24hr', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var check = "";
            var query = "";
            var _result = "";
            var binance_data = JSON.parse(body);
            mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Connected to mongodb database instance.");
                }
                const db = client.db('binance');
                db.collection("binance_data").find().toArray((err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        _result = result;
                        res.send(binance_data);
                        // res.render("binance-datastore", { _result, binance_data });
                        client.close();
                    }
                });
            });
        }
    });
});

router.post('/binance-post', function (req, res) {
    request('https://api.binance.com/api/v1/ticker/24hr', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var check = "";
            var _result = "";
            var query = "";
            var binance_data = JSON.parse(body);
            mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Connected to mongodb database instance.");
                }
                const db = client.db('binance');
                db.dropCollection("binance_data", (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Droping obsolete database from fifo queue : " + result);
                    }
                });
                db.collection("binance_data").insertMany(binance_data, (err, result) => {
                    if (err) {
                        console.log(err);
                        var success = "Data Store returned error.";
                        // res.render("index", { body, success });
                        client.close();
                    } else {
                        success = "Data Store returned 0.";
                        _result = result;
                        res.send({ _result, binance_data });
                        client.close();
                    }
                });
            });
        }
    });
});

module.exports = router;
