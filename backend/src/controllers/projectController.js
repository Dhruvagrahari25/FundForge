import Project from '../models/Project.js';
import Creator from '../models/Creator.js';

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    const projects = await Project.find({});
    res.json(projects);
};

// @desc    Fetch single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
    const project = await Project.findById(req.params.id).populate('creator');

    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Creator
const createProject = async (req, res) => {
    const {
        name,
        description,
        completionTargetDate,
        targetAmount,
        milestones,
        riskScore,
    } = req.body;

    // Ensure creator profile exists
    const creatorProfile = await Creator.findOne({ user: req.user._id });
    if (!creatorProfile) {
        return res.status(400).json({ message: 'Creator profile required. Please complete your profile first.' });
    }

    const project = new Project({
        name,
        description,
        completionTargetDate,
        targetAmount,
        milestones,
        riskScore,
        creator: req.user._id,
    });

    const createdProject = await project.save();

    // Add project to creator's list
    creatorProfile.projects.push(createdProject._id);
    await creatorProfile.save();

    res.status(201).json(createdProject);
};

export { getProjects, getProjectById, createProject };
