import jwt from 'jsonwebtoken';
// verifytoken for socket.io authentication
function verifyTokenForSocket(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
           
    })
}

export { verifyTokenForSocket };