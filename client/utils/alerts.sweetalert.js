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

export {
  addEventPrompter,
  deleteEventPrompter,
};
