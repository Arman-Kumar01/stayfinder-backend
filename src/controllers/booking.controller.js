import Booking from '../models/booking.model.js';
import Listing from '../models/listing.model.js';

export const createBooking = async (req, res) => {
  try {
    const { listingId, startDate, endDate } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const booking = new Booking({
      listing: listingId,
      user: req.user.userId,
      startDate,
      endDate
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('listing', 'title price location images');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    await booking.remove();
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
