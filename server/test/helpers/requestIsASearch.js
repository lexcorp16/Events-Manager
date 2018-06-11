import expect from 'expect';
import requestIsASearch from '../../helpers/requestIsASearch';

describe('test suite for request is a search helper function', () => {
  it('returns true if a request contains search queries', () => {
    const queryMockData = { name: 'rogaros' };
    expect(requestIsASearch({ query: queryMockData })).toBeTruthy();
  });
  it('returns false if a request does not contains search queries', () => {
    expect(requestIsASearch({ query: {} })).toBeFalsy();
  });
});
