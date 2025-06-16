import Listing from '../models/listing.model.js';

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('host', 'name email');
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('host', 'name email');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createListing = async (req, res) => {
  try {
    const { title, description, price, location, images, availableDates } = req.body;
    const newListing = new Listing({
      title,
      description,
      price,
      location,
      images,
      availableDates,
      host: req.user.userId
    });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.host.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.host.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await listing.remove();
    res.status(200).json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
