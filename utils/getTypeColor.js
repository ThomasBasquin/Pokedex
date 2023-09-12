const capitalize = (type) => type.charAt(0).toUpperCase() + type.slice(1);

export const getTypeColors = (type) => {
    const capType = capitalize(type);
    return {
        primaryClass: `primary${capType}`,
        secondaryTextClass: `secondaryText${capType}`,
        secondaryBackgroundClass: `secondaryBackground${capType}`,
    };
};