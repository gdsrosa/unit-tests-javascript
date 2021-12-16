const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a query string when a object is passed', () => {
    const obj = {
      name: 'Gabriel',
      job: 'developer',
    };

    expect(queryString(obj)).toBe('name=Gabriel&job=developer');
  });

  it('should create a valid query string even when an array is passed', () => {
    const obj = {
      name: 'Gabriel',
      job: 'developer',
      skills: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Gabriel&job=developer&skills=JS,TDD');
  });

  it('should throw an error when an object is passed', () => {
    const obj = {
      name: 'Gabriel',
      job: 'developer',
      skills: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => queryString(obj)).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string into object', () => {
    const queryString = 'name=Gabriel&job=developer';
    const obj = {
      name: 'Gabriel',
      job: 'developer',
    };

    expect(parse(queryString)).toEqual(obj);
  });
  it('should convert a query string of a single key into object', () => {
    const queryString = 'name=Gabriel';
    const obj = {
      name: 'Gabriel',
    };

    expect(parse(queryString)).toEqual(obj);
  });

  it('should convert a query string into object taking care of the array', () => {
    const queryString = 'name=Gabriel&job=developer&skills=JS,TDD';
    const obj = {
      name: 'Gabriel',
      job: 'developer',
      skills: ['JS', 'TDD'],
    };

    expect(parse(queryString)).toEqual(obj);
  });
});
