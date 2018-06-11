import expect from 'expect';
import models from '../../db/models';
import events from '../__mocks__/events';

const { validEventDetails } = events;
const { Events } = models;

describe('event models', () => {
  it('saves event data', () => {
    Events.create(validEventDetails)
      .then((event) => {
        expect(event.name).toEqual(validEventDetails.name);
        expect(event.type).toEqual(validEventDetails.type);
        expect(event.center).toEqual(validEventDetails.center);
      });
  });
});
