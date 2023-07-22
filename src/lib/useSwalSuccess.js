import Swal from 'sweetalert2'

export default function useSwalSuccess(text) {
  return Swal.fire({
    icon: 'success',
    title: 'Success!',
    text,
    confirmButtonColor: '##20C997',
    iconColor: '#20C997',
    confirmButtonText: 'done'
  })
}
