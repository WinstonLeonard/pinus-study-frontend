import { isExpired } from "react-jwt";

export const isLoggedIn = (token: string, userId: number) => {
    return token !== "" && userId !== 0 && !isExpired(token);
}
