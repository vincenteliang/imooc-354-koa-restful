const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    __v: { type: Number, select: false },   // 隐藏无用返回
    name: { type: String, required: true },
    password: { type: String, required: true, select: false }   // 默认不暴露密码
});

module.exports = model('User', userSchema);