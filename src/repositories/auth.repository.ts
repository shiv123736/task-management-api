
export let refreshToken: string[] = [];


export const addToken = async (token: string) => {
    refreshToken.push(token);
    return token;
}

export const verifyToken = (vtoken: string) => {
    const token = refreshToken.find((t) => t == vtoken)
    if(!token) {
        return null;
    }
    return token;
}

export const removeToken = (token: string) => {
    const result = refreshToken.filter(t => t !== token);
    refreshToken = result;
}