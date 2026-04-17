import fs from "fs/promises"
import path from "path"
import bcrypt from "bcryptjs"
import type { User } from "./types"

const USERS_FILE = path.join(process.cwd(), "data", "users.json")

interface UsersData {
  users: User[]
}

export async function readUsersFile(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8")
    const parsed: UsersData = JSON.parse(data)
    return parsed.users
  } catch (error) {
    console.error("Error reading users file:", error)
    return []
  }
}

export async function writeUsersFile(users: User[]): Promise<void> {
  const data: UsersData = { users }
  await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2), "utf-8")
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: "admin" | "viewer" = "viewer"
): Promise<User | null> {
  const users = await readUsersFile()

  if (users.some((u) => u.email === email)) {
    return null
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser: User = {
    id: String(Date.now()),
    email,
    name,
    role,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  await writeUsersFile(users)

  return newUser
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await readUsersFile()
  return users.find((u) => u.email === email) || null
}

export async function getAllUsers(): Promise<Omit<User, "password">[]> {
  const users = await readUsersFile()
  return users.map(({ password, ...user }) => user)
}
