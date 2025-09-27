const parseContactType = (contactType) => {
    const isString = typeof contactType === "string";
    if (!isString) return;

    const isContactType = (contactType) => ["work", "home", "personal"].includes(contactType);
    if (isContactType(contactType)) return contactType;
};

const parseFavourite = (isFavourite) => {
    const isString = typeof isFavourite === "string";
    if (!isString) return;

    return isFavourite;
};

export function parseFilterParams(query) {
    const { contactType, isFavourite } = query;

    const parsedContactType = parseContactType(contactType);
    const parsedFavourite = parseFavourite(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedFavourite,
    };
};