var middleFunc = function(req, res, next){
var jwt=require('jsonwebtoken');

  if(req.session.islogin){
    jwt.verify(req.cookies.token,'himanshu',(err,data)=>{
      if(err)
      {
        res.redirect("/login");
      }
      else{
        next();
        }
    });

    
 } else {
   //Ask for id password
   res.redirect("/login");
//   next();
 }

}


module.exports ={
  middleFunc,
}