import prisma from "../DB/db.config.js";

export const fetchUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    return res.json({
      status: 200,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json({ status: 200, data: users });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        status: 400,
        message: "name and email are required",
      });
    }

    const findUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (findUser) {
      return res.status(400).json({ status: 400, message: "email is already taken" });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return res.status(201).json({
      status: 201,
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error creating user",
      error: error.message,
    });
  }
};
//show all users
export const showUsers = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ status: 400, message: "Invalid user ID" });
    }
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    return res.json({ status: 200, data: user });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Error fetching user", error: error.message });
  }
};
//Update the user
export const updateUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ status: 400, message: "Invalid user ID" });
    }
    const { email, name, password } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, email, password },
    });
    return res.json({ status: 200, message: "user updated successfully", data: user });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Error updating user", error: error.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ status: 400, message: "Invalid user ID" });
    }
    await prisma.user.delete({
      where: { id: userId },
    });
    return res.json({ status: 200, message: "user deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Error deleting user", error: error.message });
  }
};