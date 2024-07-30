import mongoose from 'mongoose';

const popupSchema = mongoose.Schema({
    message: String,
    corner: String,
    color: String,
    published: Boolean,
    website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SiteModel',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    id: String
});

const popupModel = mongoose.model('popupModel', popupSchema);

export default popupModel;