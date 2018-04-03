import swal from 'sweetalert';

const addEventPrompter = () =>
  swal({
    text: 'Event has been added successfully',
    icon: 'success',
  });

const deleteEventPrompter = () => {
  swal({
    text: 'Event has been deleted successfully',
    icon: 'success',
  });
};

const modifyEventPrompter = () => {
  swal({
    text: 'Event has been modified successfully',
    icon: 'success',
  });
};

const centerModifiedPrompter = () => {
  swal({
    text: 'Center has been modified successfully',
    icon: 'success',
  });
};

const signinPrompter = () => {
  swal({
    text: 'Welcome, You have signed in successfully',
    icon: 'success',
  });
};

const signupPrompter = () => {
  swal({
    text: 'Welcome to Events-Manager',
    icon: 'success',
  });
};

const actionRejectedPrompter = (errorMessage) => {
  swal({
    text: errorMessage,
    icon: 'warning',
  });
};

const selectAnEventPrompter = () => {
  swal({
    text: 'select an event to modify',
    icon: 'warning',
  });
};

export {
  addEventPrompter,
  deleteEventPrompter,
  modifyEventPrompter,
  centerModifiedPrompter,
  actionRejectedPrompter,
  signinPrompter,
  signupPrompter,
  selectAnEventPrompter,
};
