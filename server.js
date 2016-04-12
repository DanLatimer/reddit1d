"use strict"

var express = require('express');
var bodyParser= require('body-parser')
var app = express();
app.use(bodyParser.json());

class Link{
    constructor (title,url,ups,downs,id,time){
        this.title = title;
        this.url = url;
        this.ups = ups;
        this.downs = downs;
        this.id = id;
        this.time = time;
    }

    update(title,url,time) {
        if(title)
            this.title = title;
        if(url)
            this.url = url;
        if(time)
            this.time = time;
    }
}

let links = [];


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/links', function (req, res) {
    res.send(links);
});

app.post('/links',function (req,res){
    var body = req.body;

    var link = new Link(body.title,body.url,0,0,links.length,body.time);
    links.push(link);
    res.send({"id":link.id});
});


app.get('/links/:id?', function(req, res){
    var id = req.params.id;

    res.send(links[id]);
});

app.patch('/links/:id?', function(req, res){
    var id = req.params.id;
    var body = req.body;

    links[id].update(body.title,body.url,body.time);
    res.send();
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});