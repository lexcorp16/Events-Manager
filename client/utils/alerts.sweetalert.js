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

export {
  addEventPrompter,
  deleteEventPrompter,
  modifyEventPrompter,
  centerModifiedPrompter,
};
