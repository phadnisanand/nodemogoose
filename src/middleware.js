function verifyToken(req,res,next) {
  const bearerToken =  req.headers['authorization'];
  if(typeof bearerToken !== 'undefined') {
      const bearer = bearerToken.split(" ");
      const token = bearer[1];
      req.token = token;
      next();
  } else {
    res.send({
      result: "Token is not valid"
    });
  }
}

module.exports = {
  verifyToken
};
