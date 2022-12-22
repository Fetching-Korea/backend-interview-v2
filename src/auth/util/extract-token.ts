enum TYPE {
    BEARER = 'Bearer',
}

export const extractBearerToken = (
    bearerToken: string | undefined,
): string | undefined => {
    if (!bearerToken || bearerToken.split(' ')[0] !== TYPE.BEARER) return;
    return bearerToken.split(' ')[1];
};
