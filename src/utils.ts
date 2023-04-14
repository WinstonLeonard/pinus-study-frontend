export const isLoggedIn = (token: string, userId: number) => {
    return token !== "" && userId !== 0;
}
