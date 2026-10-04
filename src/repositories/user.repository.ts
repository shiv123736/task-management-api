import { User}  from "../types/user.types";

const userRepository: User[] = [];

// define a test user
const testUser: User = {
    id: "1",
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    role:"admin",
    createdAt: new Date(),
    updatedAt: new Date()
}

userRepository.push(testUser);

export const findUserByEmail = (email: string): User | undefined => {
    return userRepository.find(user => user.email === email);
}

export const createUser = (user: User): User => {
    let createdUser: User = {
        ...user,
        id: Date.now().toString(),
    };
    userRepository.push(createdUser);
    displayUsers();
    return createdUser;
}

const displayUsers = () => {
    console.log("Current Users in Repository:");
    userRepository.forEach(user => {
        console.log(`ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, password: ${user.password}`);
    });
};
displayUsers();