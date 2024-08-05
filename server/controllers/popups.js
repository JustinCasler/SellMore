import popupModel from '../models/popupModel.js';
import mongoose from 'mongoose';

export const getPopups = async (req, res) => {
    const { websiteId } = req.params;
    try {
        const popups = await popupModel.find({ website: websiteId });
        res.status(200).json(popups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPopups = async (req, res) => {
    const { website, published } = req.body;

    try {
        const newPopup = await popupModel.create({
            website,
            published,
            user: req.userId
        });
        res.status(201).json(newPopup);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePopup = async (req, res) => {
    const { id } = req.params;
    const { message, color, corner, user, website, published } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No popup with id: ${id}`);
    }


    const updatedPopup = { message, color, corner, user, website, published: true, _id: id };

    try {
        const result = await popupModel.findByIdAndUpdate(id, updatedPopup, { new: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};