import swal from 'sweetalert';

const actionRejectedPrompter = (errorMessage) => {
  let errors = errorMessage;
  if (Array.isArray(errorMessage)) {
    errors = '';
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

const toastPrompter = (text) => {
  swal(text, {
    buttons: false,
    icon: 'success',
    timer: 2000,
    className: 'toast-prompt'
  });
};

export {
  actionRejectedPrompter,
  toastPrompter,
  actionRejectedPrompterTimer
};
