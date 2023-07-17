import Swal from 'sweetalert2'

export default function useSwalSuccess(text) {
  return Swal.fire({
    icon: 'success',
    title: 'Confirmed!',
    text,
    confirmButtonColor: '#228BE6',
    iconColor: '#20C997',
    confirmButtonText: 'done'
  })
}
