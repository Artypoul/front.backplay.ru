export const updateVariantLink = (index, action, value) => {
  action(prev => {
    const copiedVariant = Object.assign({}, prev[index]);
    copiedVariant.link = value;

    const newArray = Array.from(prev);
    newArray[index] = copiedVariant;

    return newArray;
  });
};
