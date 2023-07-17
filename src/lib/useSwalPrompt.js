import Swal from 'sweetalert2'

export default function useSwalPrompt(text, preConfirm = null) {
  return Swal.fire({
    title: 'Are you sure?',
    text,
    icon: 'question',
    iconColor: '#228BE6',
    showCancelButton: true,
    confirmButtonColor: '#20C997',
    cancelButtonColor: '#FA5252',
    confirmButtonText: 'CONFIRM',
    cancelButtonText: 'CANCEL',
    focusCancel: true,
    preConfirm
  })
}
