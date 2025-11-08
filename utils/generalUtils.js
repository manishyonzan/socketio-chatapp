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
    console.log("Verifying token in generalUtils:", jwt.verify(token, process.env.JWT_SECRET));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified:", decoded);
        return decoded;
    } catch (err) {
        console.error("Token verification failed:", err.message);
        throw err;
    }
}

export { verifyTokenForSocket };