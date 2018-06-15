import expect from 'expect';
import checkInvalidModifyEventDetails from '../../validations/modifyevent.validate';

describe('add event validator tests', () => {
  it('returns an array of error messages on invalid inputs', () => {
    const inputs = {
      name: 'My Birthday',
      type: undefined,
      startDate: 'lkjkhgjk',
      endDate: '2018-05-03',
      center: 'Nice center'
    };
    expect(Array.isArray(checkInvalidModifyEventDetails(inputs))).toBeTruthy();
  });
  it('returns an array of error messages on invalid inputs', () => {
    const inputs = {
      name: 'My Birthday',
      type: '230000',
      startDate: '2018-05-03',
      endDate: 'kdjhhdhdhgd',
      center: 'Nice center'
    };
    expect(Array.isArray(checkInvalidModifyEventDetails(inputs))).toBeTruthy();
  });
  it('returns an array of error messages on invalid inputs', () => {
    const inputs = {
      name: '     ',
      type: '230000',
      startDate: '2018-07-08',
      endDate: '2018-07-04',
      center: 'Nice center'
    };
    expect(Array.isArray(checkInvalidModifyEventDetails(inputs))).toBeTruthy();
  });
  it('returns an array of error messages on invalid inputs', () => {
    const inputs = {
      name: 'My Birthday',
      type: '     ',
      startDate: '2018-07-08',
      endDate: '2018-07-04',
      center: 'Nice center'
    };
    expect(Array.isArray(checkInvalidModifyEventDetails(inputs))).toBeTruthy();
  });
  it('returns an true if no errors are found', () => {
    const inputs = {
      name: '656566665',
      type: '230000',
      startDate: '2018-07-08',
      endDate: '2018-07-10',
      center: 'Nice center'
    };
    expect(checkInvalidModifyEventDetails(inputs)).toBeTruthy();
  });
  it('returns an true if no errors are found', () => {
    const inputs = {
      name: 'Nice Event',
      type: 'Seminar',
      startDate: '2018-07-08',
      endDate: '2018-07-10',
    };
    expect(checkInvalidModifyEventDetails(inputs)).toBeTruthy();
  });
});
