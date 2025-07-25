import express from 'express';
import {
  createBlog,
  getAllBlogs,
  deleteBlogById,
  updateBlogById // ✅ Import this
} from './controllers.js';

const router = express.Router();

router.post('/create', createBlog);
router.get('/', getAllBlogs);
router.delete('/:id', deleteBlogById);

// ✅ Add this route for editing blog
router.put('/:id', updateBlogById);

export default router;
