const Jwt = require('jsonwebtoken');
const key = 'blog';

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, key, (err) => {
            if (err) {
                res.status(401).send({ result: "Please add valid Token in Header." })
            }else{
                next();
            }
        })
    } else {
        res.status(403).send({ result: "Please add Token in Header." })
    }
}
module.exports = verifyToken;