import expect from 'expect';
import models from '../../db/models';
import centers from '../__mocks__/centers';

const { validCenterDetails } = centers;
const { Centers } = models;

describe('center models', () => {
  it('saves center data', () => {
    Centers.create(validCenterDetails)
      .then((center) => {
        expect(center.name).toEqual(validCenterDetails.name);
        expect(center.address).toEqual(validCenterDetails.address);
        expect(center.rentalCost).toEqual(validCenterDetails.rentalCost);
      });
  });
});
