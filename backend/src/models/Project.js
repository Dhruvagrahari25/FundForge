import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        launchDate: {
            type: Date,
            default: Date.now,
        },
        completionTargetDate: {
            type: Date,
            required: true,
        },
        targetAmount: {
            type: Number,
            required: true,
        },
        fundsRaised: {
            type: Number,
            default: 0,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['active', 'completed'],
            default: 'active',
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        investors: [
            {
                investor: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                amount: Number,
                stake: Number,
            },
        ],
        milestones: [String],
        updates: [
            {
                date: {
                    type: Date,
                    default: Date.now,
                },
                title: String,
                description: String,
            },
        ],
        riskScore: {
            type: Number,
            default: 0,
        },
        healthScore: {
            type: Number,
            default: 100,
        },
        trendingScore: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
