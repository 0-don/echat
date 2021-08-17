"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (storage) {
  return {
    0: storage,

    put: function put(key, value, callback) {
      try {
        storage.setItem(key, value, callback);
      } catch (e) {
        callback(e);
      }
    },

    get: function get(key, callback) {
      storage.getItem(key, function (err, value) {
        if (err) return callback(err);
        try {
          callback(null, value);
        } catch (e) {
          callback(e);
        }
      });
    },

    del: function del(key, callback) {
      storage.removeItem(key, callback);
    }
  };
};

module.exports = exports["default"];