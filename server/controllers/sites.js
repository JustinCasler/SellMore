import SiteModel from '../models/siteModel.js';

export const getSites = async (req, res) => {
    try {
        const sites = await SiteModel.find({ user: req.userId });
        res.status(200).json(sites);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createSite = async (req, res) => {
    const {name, url} = req.body;

    try {
        const newSite = await SiteModel.create({
            name,
            url,
            user: req.userId
        })
        await newSite.save();
        res.status(201).json(newSite);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
