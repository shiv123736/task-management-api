
export interface JwtPayload {
    id: string;
    username: string;
    email: string;
    role: string;
    iat?: number; // issued at
    exp?: number; // expiration time
    type: "access" | "refresh";
}