const { sum } = require('./calculator');

it('should sum 2 and 2 and the result must be 4', () => {
  expect(sum(2, 2)).toBe(4);
});

it('should sum 2 + 2 even if one of the values is a string', () => {
  expect(sum('2', '2')).toBe(4);
});

it('should throw an error if the values aren`t summable', () => {
  expect(() => {
    sum('', '2');
  }).toThrowError();

  expect(() => {
    sum([2, 3]);
  }).toThrowError();

  expect(() => {
    sum({});
  }).toThrowError();

  expect(() => {
    sum();
  }).toThrowError();
});
