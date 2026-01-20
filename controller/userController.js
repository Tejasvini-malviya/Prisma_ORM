import prisma from "../DB/db.config.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json({ status: 200, data: users });
  } catch (error) {
    return res.json({ status: 500, message: "Error fetching users", error: error.message });
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
      }
  })

  return res.json({status:200, message:"user created successfully", data:newUser});
}