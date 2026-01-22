import prisma from "../DB/db.config.js";

// Get all posts
export const fetchPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ status: 200, data: posts });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error fetching posts",
      error: error.message,
    });
  }
};

// Get post by ID
export const showPosts = async (req, res) => {
  try {
    const postId = Number(req.params.id);

    if (isNaN(postId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid post ID",
      });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        comments: {
          include: {
            User: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        status: 404,
        message: "Post not found",
      });
    }

    return res.json({ status: 200, data: post });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error fetching post",
      error: error.message,
    });
  }
};

// Create post
export const createPost = async (req, res) => {
  try {
    const { userId, tittle, Description } = req.body;

    if (!userId || !tittle || !Description) {
      return res.status(400).json({
        status: 400,
        message: "userId, tittle, and Description are required",
      });
    }

    const userExists = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userExists) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const post = await prisma.post.create({
      data: {
        userId: Number(userId),
        tittle,
        Description,
      },
    });

    return res.status(201).json({
      status: 201,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error creating post",
      error: error.message,
    });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const postId = Number(req.params.id);

    if (isNaN(postId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid post ID",
      });
    }

    const { tittle, Description } = req.body;

    const post = await prisma.post.update({
      where: { id: postId },
      data: { tittle, Description },
    });

    return res.json({
      status: 200,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error updating post",
      error: error.message,
    });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const postId = Number(req.params.id);

    if (isNaN(postId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid post ID",
      });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return res.json({
      status: 200,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error deleting post",
      error: error.message,
    });
  }
};
