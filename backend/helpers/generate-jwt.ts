import jwt from "jsonwebtoken";

const generateJWT = (uid: string) : Promise<string> =>  {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY || 'Th!sMyPA!BRT3k3y', {
            expiresIn: '4h'
        }, (err: unknown, token) => {
            if (err) {
                console.log(err);
                reject('Error generating token');
            } else {
                if (token) resolve(token);
            }
        });
    });
}

export default generateJWT;