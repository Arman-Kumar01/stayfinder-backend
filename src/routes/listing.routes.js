import express from 'express';
import {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing
} from '../controllers/listing.controller.js';
import { verifyToken, verifyHost } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllListings);
router.get('/:id', getListingById);
router.post('/', verifyToken, verifyHost, createListing);
router.put('/:id', verifyToken, verifyHost, updateListing);
router.delete('/:id', verifyToken, verifyHost, deleteListing);

export default router;
