import bcrypt from "bcryptjs";
import prisma from "../prismaClient";

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
