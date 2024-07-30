import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    id: { type: String }
  });
  
const SiteModel = mongoose.model('SiteModel', siteSchema);

export default SiteModel;
