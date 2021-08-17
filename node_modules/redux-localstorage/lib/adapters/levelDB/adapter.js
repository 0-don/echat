"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (storage) {
  return {
    0: storage,

    put: function put(key, value, callback) {
      try {
        storage.put(key, value, callback);
      } catch (e) {
        callback(e);
      }
    },

    get: function get(key, callback) {
      storage.get(key, function (err, value) {
        // eslint-disable-line consistent-return
        if (err) return callback(err);
        try {
          callback(null, value);
        } catch (e) {
          callback(e);
        }
      });
    },

    del: function del(key, callback) {
      storage.del(key, callback);
    }
  };
};

module.exports = exports["default"];