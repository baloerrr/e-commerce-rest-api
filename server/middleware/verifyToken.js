import jwt from "jsonwebtoken";

const verifyToken = (req,res,next) => {
    try {
        const authHeader = req.headers.token;

        if(authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SEC, (err, user) => {
                if(err) res.status(403).json("Token is not valid");
                req.user = user;
                next();
            });
        } else { 
            return res.status(401).json("You are not authenticated!");
        }
    } catch (error) {
        res.json(error.message);
    }
}

const verifyAndAuthorization = (req,res,next) => {
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You're not allowed to do that");
        }
    });
}

const verifyTokenAdmin = (req,res,next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
          next();
        } else {
          res.status(403).json("You are not alowed to do that!");
        }
      });
}

export { verifyToken, verifyAndAuthorization,  verifyTokenAdmin};
