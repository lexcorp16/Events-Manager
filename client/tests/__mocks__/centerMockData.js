const centerMockData = {
  successAddCenterResponse: {
    message: 'center successfully created',
    primaryCenterDetails: {
      name: 'Great Center',
      type: 'hall',
      capacity: '23000',
      createdAt: '23-01-02',
      updatedAt: '23-01-02',
    },
    rentalCostAndfacilities: {
      rentalCost: '50000000',
      facilities: ['lounge', 'swimming-pool']
    }
  },
  genericErrorResponse: {
    error: 'oops, an error occured'
  },
  ImageFile: {
    imageFile: {
      name: 'concert.jpg',
      size: '2.3mb'
    }
  },
  successFetchCenter: {
    id: '1234',
    name: 'Great Center',
    type: 'hall',
    capacity: '23000',
    createdAt: '23-01-02',
    updatedAt: '23-01-02',
    rentalCost: '50000000',
    facilities: ['lounge', 'swimming-pool']
  }
};

export default centerMockData;
