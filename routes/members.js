const express = require('express')
const router = express.Router()
const {
    getMembers,
    addMember
} = require("../controllers/memberController")

// Get members
router.get('/', getMembers);

// Add a new member
router.post('/', addMember);

module.exports = router

