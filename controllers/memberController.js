const Member = require('../models/memberModel');

const getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addMember = async (req, res) => {
    try {
        // Receiving member data from the request body
        const newMemberData = req.body;

        // Validate the new member data
        if (
          !newMemberData ||
          !newMemberData.name ||
          !newMemberData.role ||
          !newMemberData.year ||
          !newMemberData.rating
        ) {
          return res.status(400).json({ message: 'Invalid member data. Please provide name, role, year, and rating.' });
        }

        // Create a new member using the Member model
        const newMember = new Member({
            name: newMemberData.name,
            role: newMemberData.role,
            year: newMemberData.year,
            rating: newMemberData.rating
        });

        // Save the new member to the database
        const savedMember = await newMember.save();

        // Return the newly added member as the response
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getMembers,
    addMember
};
