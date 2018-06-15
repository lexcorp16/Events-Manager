import swal from 'sweetalert';

export const actionRejectedPrompter = (errorMessage) => {
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
    className: 'toast-prompt'
  });
  return { type: 'ERROR_OCCURRED' };
};

export const actionRejectedPrompterTimer = (errorMessage) => {
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
    timer: 2000
  });
  return { type: 'SUCCESS_OCCURRED' };
};

export const toastPrompter = (text) => {
  swal(text, {
    buttons: false,
    icon: 'success',
    timer: 2000,
    className: 'toast-prompt'
  });
};

export default {
  actionRejectedPrompter,
  toastPrompter,
  actionRejectedPrompterTimer
};
