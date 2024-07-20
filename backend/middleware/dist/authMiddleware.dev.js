"use strict";

// backend/middleware/authMiddleware.js
var jwt = require('jsonwebtoken');

var User = require('../models/User');

var protect = function protect(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function protect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
            _context.next = 16;
            break;
          }

          _context.prev = 1;
          token = req.headers.authorization.split(' ')[1];
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findById(decoded.id).select('-password'));

        case 6:
          req.user = _context.sent;
          next();
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error('Token verification error:', _context.t0);
          res.status(401).json({
            message: 'Not authorized, token failed'
          });

        case 14:
          _context.next = 17;
          break;

        case 16:
          res.status(401).json({
            message: 'Not authorized, no token'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

module.exports = {
  protect: protect
};