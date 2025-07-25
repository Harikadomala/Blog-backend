import Blog from '../../../models/blogModel.js';

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const newBlog = new Blog({
      title,
      content,
      tags: tags || [],
      author: '64fca81a6a9b25e72db17384', // fallback static author
    });

    await newBlog.save();

    res.status(201).json({ msg: 'Blog created successfully', blog: newBlog });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a blog by ID
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    res.status(200).json({ msg: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a blog by ID
export const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    res.status(200).json({ msg: 'Blog updated successfully', blog: updatedBlog });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
