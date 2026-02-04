import mongoose from 'mongoose';

const creatorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Creator = mongoose.model('Creator', creatorSchema);

export default Creator;
