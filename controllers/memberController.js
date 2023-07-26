const Member = require('../models/memberModel')
// const mongoose = require('mongoose')

const getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {
    getMembers
}