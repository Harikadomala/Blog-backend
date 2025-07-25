// api/v1/contact/routes.js
import express from 'express';
import { submitContactForm } from './controller.js';

const router = express.Router();

router.post('/submit', submitContactForm);

export default router;
