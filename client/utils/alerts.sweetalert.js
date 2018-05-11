import swal from 'sweetalert';

const addEventPrompter = () =>
  swal({
    text: 'Event has been added successfully',
    icon: 'success',
    className: 'toast-prompt'
  });

const deleteEventPrompter = () => {
  swal({
    text: 'Event has been deleted successfully',
    icon: 'success',
    className: 'toast-prompt'
  });
};

const modifyEventPrompter = () => {
  swal({
    text: 'Event has been modified successfully',
    icon: 'success',
    className: 'toast-prompt'
  });
};

const centerModifiedPrompter = () => {
  swal({
    text: 'Center has been modified successfully',
    icon: 'success',
    className: 'toast-prompt'
  });
};

const modifyCenterRejectedPrompter = (errorMessage) => {
  swal({
    text: errorMessage,
    icon: 'success',
    className: 'toast-prompt'
  });
};

const signinPrompter = () => {
  swal({
    text: 'Welcome, You have signed in successfully',
    icon: 'success',
    className: 'toast-prompt'
  });
};

const signupPrompter = () => {
  swal({
    text: 'Welcome to Events-Manager',
    icon: 'success',
    className: 'toast-prompt'
  });
};

const actionRejectedPrompter = (errorMessage) => {
  let errors = errorMessage;
  if (Array.isArray(errorMessage)) {
    errors = '';
    console.log('khjgkgujyfj');
    errorMessage.forEach((error) => {
      errors += `${error} \n`;
    });
  }
  swal({
    text: errors,
    icon: 'warning',
    className: 'toast-prompt',
  });
};

const actionRejectedPrompterTimer = (errorMessage) => {
  let errors = errorMessage;
  if (Array.isArray(errorMessage)) {
    errors = '';
    console.log('khjgkgujyfj');
    errorMessage.forEach((error) => {
      errors += `${error} \n`;
    });
  }
  swal({
    text: errors,
    buttons: false,
    icon: 'warning',
    className: 'toast-prompt',
    timer: 2000,
  });
};

const selectAnEventPrompter = () => {
  swal({
    text: 'select an event to modify',
    icon: 'warning',
    className: 'toast-prompt'
  });
};

const toastPrompter = (text) => {
  swal(text, {
    buttons: false,
    icon: 'success',
    timer: 2000,
    className: 'toast-prompt'
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
  modifyCenterRejectedPrompter,
  toastPrompter,
  actionRejectedPrompterTimer
};
