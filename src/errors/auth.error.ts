

export class UserNotCreatedError extends Error {
    constructor() {
        super(`User not created`);
        this.name = "UserNotCreatedError";
    }
}

export class InvalidCredentialsError extends Error {
    constructor(Email: string) {
        super(`Invalid credentials for email ${Email}`);
        this.name = "InvalidCredentialsError";
    }
}

export class UserNotFoundError extends Error {
    constructor(Email: string) {
        super(`User with email ${Email} not found`);
        this.name = "UserNotFoundError";
    }
}

export class UserAlreadyExistsError extends Error {
    constructor(Email: string) {
        super(`User with email ${Email} already exists`);
        this.name = "UserAlreadyExistsError";
    }
}

export class AccessRevokedError extends Error {
    constructor() {
        super('Access Revoked');
        this.name = "AccessRevokedError";
    }
}