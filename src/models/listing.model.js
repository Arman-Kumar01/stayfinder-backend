import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 1000,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        location: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        images: [
            {
                type: String,
                trim: true,
            },
        ],
        availableDates: [
            {
                type: Date,
            },
        ],
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'listings',
    }
);

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;
