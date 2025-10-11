import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.ts";
import prisma from "../prismaClient.ts";

// function to register a new user
export async function registerUser(
  email: string,
  password: string,
  name?: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.userAccount.create({
    data: { email, password: hashedPassword, name },
  });
}

// function to login
export async function loginUser(email: string, password: string) {
  const user = await prisma.userAccount.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid password");
  const token = generateToken(user.id);

  return { token, user };
}

// update user name
export async function updateUserName (userId : number, name : string) {
  return await prisma.userAccount.update({
    where : { id : userId },
    data : { name }
  })  
}