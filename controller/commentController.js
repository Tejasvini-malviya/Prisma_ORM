import prisma from "../DB/db.config.js";

export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({});
  return res.json({
    status: 200,
    data: comments,
  });
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    return res.json({ status: 200, data: comments });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Error fetching comments",
      error: error.message,
    });
  }
};

export const createComment = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (findUser) {
    return res.json({ status: 400, message: "email is already taken" });
  }

  const newComment = await prisma.comment.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({
    status: 200,
    message: "user created successfully",
    data: newUser,
  });
};
//show all comments
export const showComments = async (req, res) => {
  const commentId = req.params.id;
  const comment = await prisma.comment.findFirst({
    where: {
      id: Number(commentId),
    },
  });
  return res.json({
    status: 200,
    data: comment,
  });
};
//Update the comment
export const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { email, name, password } = req.body;

  await prisma.comment.update({
    where: {
      id: Number(commentId),
    },
    data: {
      name,
      email,
      password,
    },
  });
  return res.json({
    status: 200,
    message: "comment updated successfully",
  });
};

//delete comment
export const deleteComment = async (req, res) => {
  {
    const commentId = req.params.id;
    await prisma.comment.delete({
      where: {
        id: Number(commentId),
      },
    });
    return res.json({
      status: 200,
      message: "comment deleted successfully",
    });
  }
};
