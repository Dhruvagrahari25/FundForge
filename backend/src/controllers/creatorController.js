import Creator from '../models/Creator.js';

// @desc    Get current creator profile
// @route   GET /api/creators/profile
// @access  Private/Creator
const getCreatorProfile = async (req, res) => {
    const creator = await Creator.findOne({ user: req.user._id }).populate('user', 'name email').populate('projects');

    if (creator) {
        res.json(creator);
    } else {
        res.status(404).json({ message: 'Creator profile not found' });
    }
};

// @desc    Create or update creator profile
// @route   POST /api/creators/profile
// @access  Private/Creator
const createCreatorProfile = async (req, res) => {
    const { description } = req.body;

    const creator = await Creator.findOne({ user: req.user._id });

    if (creator) {
        creator.description = description || creator.description;
        const updatedCreator = await creator.save();
        res.json(updatedCreator);
    } else {
        const newCreator = await Creator.create({
            user: req.user._id,
            description,
        });
        res.status(201).json(newCreator);
    }
};

export { getCreatorProfile, createCreatorProfile };
