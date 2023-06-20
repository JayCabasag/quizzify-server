export const jwtConstants = {
    secret: 'notsecretanymore',
};

export type DecodedToken = {
    id: string
    sub: string
}