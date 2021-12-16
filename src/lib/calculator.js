module.exports.sum = (first, second) => {
  const firstNumber = parseInt(first, 10);
  const secondNumber = parseInt(second, 10);

  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    throw new Error('Unable to make sum!');
  }

  return firstNumber + secondNumber;
};
