var middleFunc = function(req, res, next){
  if(req.session.islogin){

    next();
 } else {
   //Ask for id password
   res.redirect("/login");
//   next();
 }

}


module.exports ={
  middleFunc,
}