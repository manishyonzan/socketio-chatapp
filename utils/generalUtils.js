import jwt from 'jsonwebtoken';

// verifytoken for socket.io authentication
// function verifyTokenForSocket(token) {
//     return new Promise(async (resolve, reject) => {
//         await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(decoded);
//             }
//         });

//     })
// }

const verifyTokenForSocket = (token) => {

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        throw err;
    }
}

export { verifyTokenForSocket };