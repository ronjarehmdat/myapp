const del = require("del");

module.exports = paths => () => del(paths);