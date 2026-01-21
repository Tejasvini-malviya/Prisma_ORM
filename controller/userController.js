import prisma from "../DB/db.config.js";

export const fetchUser = async (req, res) => {
  const users = await prisma.user.findMany({});
  return res.json({
    status: 200,
    data: users,
  });
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
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (findUser) {
    return res.json({ status: 400, message: "email is already taken" });
  }

  const newUser = await prisma.user.create({
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
//show all users
export const showUsers = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
  return res.json({
    status: 200,
    data: user,
  });
};
//Update the user
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, name, password } = req.body;

  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name,
      email,
      password,
    },
  });
  return res.json({
    status: 200,
    message: "user updated successfully",
  });
};

//delete user
export const deleteUser = async(req,res)=>{{
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  return res.json({
    status:200,
    message:"user deleted successfully"
  })
}};