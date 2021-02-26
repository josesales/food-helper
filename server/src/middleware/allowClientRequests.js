//Config that allows the requests coming from a client. Make the request not get blocked by CORS policy implemented by the browsers

module.exports = (req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*'); // Grants access to all clients domain
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');// Grants access to the methods the client can send
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');// Grants access to the headers of the client's request

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); //OPTIONS method should not reach the graphql api
    }

    next();
}