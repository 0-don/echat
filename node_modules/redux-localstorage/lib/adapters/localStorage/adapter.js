"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (storage) {
  return {
    0: storage,

    put: function put(key, value, callback) {
      try {
        callback(null, storage.setItem(key, value));
      } catch (e) {
        callback(e);
      }
    },

    get: function get(key, callback) {
      try {
        callback(null, storage.getItem(key));
      } catch (e) {
        callback(e);
      }
    },

    del: function del(key, callback) {
      try {
        callback(null, storage.removeItem(key));
      } catch (e) {
        callback(e);
      }
    }
  };
};

module.exports = exports["default"];