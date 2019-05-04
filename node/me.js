const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
app.get('/api',(req,res)=>{
    res.json({
        message:'welcome to the api'
    });
});
app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
            
        }else{
            res.json({
                message:'post created...',
                authData
            });

        }
    });
    
});
app.post('/api/login',(req,res)=>{
    //mock user
    const user={
        id:1,
        username:'brad',
        email:'brad@gmail.com'

    }
    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token

        });
    });
});
//FORMAT OF TOKEN
//Authorization :Bearer <acess_token>

//verify Token
function verifyToken(req,res,next){
    //Get auth header value
    const bearerheader=req.headers['Authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the Space
        const bearer=bearerHeader.split('');
        //Get token from array
        const bearerToken=bearer[1];
        //set the Token
        req.token=bearerToken;
        //next Middleware
        next();

    }else{
        //forbidden
        res.sendStatus(403);
    }

}

app.listen(5002,()=>console.log('server started on 5002'));