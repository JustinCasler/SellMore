import SiteModel from '../models/siteModel.js';

export const getSites = async (req, res) => {
    const { userId } = req.params;
    try {
        const sites = await SiteModel.find({ user: userId });
        res.status(200).json(sites);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createSite = async (req, res) => {
    const site = req.body;
    const newSite = new SiteModel(site);

    console.log(req)
    try {
        await newSite.save();
        res.status(201).json(newSite);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
