import prisma from "../DB/db.config.js";

export const fetchComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({});
    return res.json({
      status: 200,
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error fetching comments",
      error: error.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const {userId , postId, comment } = req.body;

    const findUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!findUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const newComment = await prisma.comment.create({
      data: {
        userId: Number(userId),
        postId: Number(postId),
        comment: comment,
      },
    });

    return res.json({
      status: 201,  
      message: "comment created successfully",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error creating comment",
      error: error.message,
    });
  }
};

export const showComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        User: {
          select: { id: true, name: true },
        },
        Post: {
          select: { id: true, tittle: true },
        },
      },
    });
    
    if (!comment) {
      return res.status(404).json({
        status: 404,
        message: "Comment not found",
      });
    }
    
    return res.json({
      status: 200,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error fetching comment",
      error: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { userId, postId, comment } = req.body;

    // Check if comment exists first
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return res.status(404).json({
        status: 404,
        message: `Comment with ID "${commentId}" not found`,
      });
    }

    // Build update data object with only provided fields
    const updateData = {};
    if (userId !== undefined) updateData.userId = Number(userId);
    if (postId !== undefined) updateData.postId = Number(postId);
    if (comment !== undefined) updateData.comment = comment;

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: updateData,
    });
    return res.json({
      status: 200,
      message: "comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error updating comment",
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return res.json({
      status: 200,
      message: "comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error deleting comment",
      error: error.message,
    });
  }
};
