export const changeBassHandler = (index, action) => {
  action(prev => {
    const copiedVariant = Object.assign({}, prev[index]);
    copiedVariant.with_bass = !copiedVariant.with_bass;

    const newArray = Array.from(prev);
    newArray[index] = copiedVariant;

    return newArray;
  });
};
