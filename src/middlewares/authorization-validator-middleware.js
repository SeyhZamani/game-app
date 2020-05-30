const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { routerWrapper } = require('../utils/express-utils');
const AuthorizationError = require('../models/exceptions/authorization-exception');
const logger = require('../utils/logger');

const jwtCert = fs.readFileSync(path.join(__dirname, '../../config/public.pem'), {
    encoding: 'utf8',
});

const authorizationValidator = routerWrapper(async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return next(new AuthorizationError('Unauthorized'));
    }
    token = token.slice(7, token.length);
    jwt.verify(token, jwtCert, (err, decodedToken) => {
        if (err) {
            logger.error(err);
            return next(new AuthorizationError(err));
        }
        logger.info(JSON.stringify(decodedToken));
        req.decodedToken = decodedToken;
        return next();
    });
});

exports.authorizationValidator = authorizationValidator;
