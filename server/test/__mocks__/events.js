const events = {
  validEventDetails: {
    name: 'My Birthday',
    type: 'Birthday',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    user: '94b76279-c907-4e07-88eb-eb1a514d00ad',
    center: '9f22c6ac-e68c-47d0-89b3-14f049e4aee5',
  },
  conflictingEventDates: {
    name: 'My Birthday',
    type: 'Birthday',
    startDate: '2018-08-07',
    endDate: '2018-07-09',
    center: 'bc4725b5-1840-4ab3-8fc9-08132572dedc',
  },
  invalidEventDetails: {
    name: '83764764 hdfghd',
    type: '645455osjh',
    startDate: 'hghghg',
    endDate: 'hggfgf',
    center: 'jhjfhfhf',
  },
  missingEventDetails: {},
  emptyEventDetails: {
    name: '       '
  },
  pastStartDate: {
    name: 'My Birthday',
    type: '   ',
    startDate: new Date('2017-07-09').toISOString(),
    endDate: new Date().toISOString(),
    user: '94b76279-c907-4e07-88eb-eb1a514d00ad',
    center: '9f22c6ac-e68c-47d0-89b3-14f049e4aee5',
  },
  pastEndDate: {
    name: 'My Birthday',
    type: 'Birthday',
    startDate: new Date('2018-09-09').toISOString(),
    endDate: new Date('2017-07-05').toISOString(),
    user: '94b76279-c907-4e07-88eb-eb1a514d00ad',
    center: '9f22c6ac-e68c-47d0-89b3-14f049e4aee5',
  },
  greaterStartDate: {
    startDate: '2020-08-09',
    endDate: '2020-08-03'
  },
  modificationDetails: {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  }
};

export default events;
