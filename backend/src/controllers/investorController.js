import Investor from '../models/Investor.js';

// @desc    Get current investor profile
// @route   GET /api/investors/profile
// @access  Private/Investor
const getInvestorProfile = async (req, res) => {
    const investor = await Investor.findOne({ user: req.user._id }).populate('user', 'name email').populate('investments.project');

    if (investor) {
        res.json(investor);
    } else {
        res.status(404).json({ message: 'Investor profile not found' });
    }
};

// @desc    Create or update investor profile (Mostly internal use or initialization)
// @route   POST /api/investors/profile
// @access  Private/Investor
const createInvestorProfile = async (req, res) => {
    // Investors might not need a "description" but maybe other settings in future
    // For now, just ensuring the profile exists

    const investor = await Investor.findOne({ user: req.user._id });

    if (investor) {
        res.json(investor);
    } else {
        const newInvestor = await Investor.create({
            user: req.user._id,
            investments: []
        });
        res.status(201).json(newInvestor);
    }
};

export { getInvestorProfile, createInvestorProfile };
