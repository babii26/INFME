import jwt = require('jsonwebtoken');
import express = require("express");


   function VerifyToken(req:any, res:any, next:any){
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({auth:false, message:'No token provided'});

    jwt.verify(token, 'InfMed_20232024', function(err:any, decoded:any){
        if (err)
            return res.status(500).send({auth:false, message:'Failed to authenticate token.'});
        req.user = decoded.user;
        next();    
    });    
}

module.exports = VerifyToken;




