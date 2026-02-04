import mongoose from 'mongoose';

const investorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        investments: [
            {
                project: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Project',
                },
                amount: {
                    type: Number,
                    required: true,
                },
                stake: {
                    type: Number,
                    required: true,
                },
                date: {
                    type: Date,
                    default: Date.now,
                }
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Investor = mongoose.model('Investor', investorSchema);

export default Investor;
