const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: Date
});

module.exports = mongoose.model('Location', locationSchema);