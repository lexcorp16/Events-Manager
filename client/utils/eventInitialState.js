const initialState = () => {
  const state = {
    events: {
      userEvents: [],
      message: '',
    },
    eventObject: {},
    errorMessage: '',
    status: {
      adding: false,
      added: false,
      error: false,
      modifyEventPrompted: false,
      deleteEventPrompted: false,
      eventIsDeleted: false,
      eventIsModified: false,
      cancellingEvent: false,
      eventCancelled: false,
      fetchingEvents: false,
    }
  };
  if (localStorage.getItem('eventObject')) {
    return {
      ...state,
      events: {
        userEvents: JSON.parse(localStorage.getItem('allUserEvents')),
        message: '',
      },
      eventObject: JSON.parse(localStorage.getItem('eventObject')),
      status: {
        ...state.status,
        modifyEventPrompted: true,
      }
    };
  }
  return state;
};

export default initialState;
