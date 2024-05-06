import { myPackage } from '../src';

describe('index', () => {
  describe('myPackage', () => {
    it('should return a string containing the message', () => {
      const message = 'Hello';

      expect('Hello').toMatch(message);
    });
  });
});
