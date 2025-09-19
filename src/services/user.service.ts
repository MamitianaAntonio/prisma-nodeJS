import bcrypt from "bcryptjs";
import prisma from "../prismaClient";
import { generateToken } from "../utils/jwt";

// function to register a new user
export async function registerUser(
  email: string,
  password: string,
  name?: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.UserAccount.create({
    data: { email, password: hashedPassword, name },
  });
}

// function to login
export async function loginUser(email: string, password: string) {
  const user = await prisma.UserAccount.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid password");
  const token = generateToken(user.id);

  return { token, user };
}
