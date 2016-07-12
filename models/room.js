var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RoomSchema = new Schema({
    name: String,
    description: String,
    floor: Number,
    doors: Number,
    windows: Number
},
{
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

module.exports = mongoose.model('room', RoomSchema);