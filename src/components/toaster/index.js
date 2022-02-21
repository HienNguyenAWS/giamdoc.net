import { toast } from 'react-toastify'

const toaster = {
    error: (message) => {
        toast.error(message)
    },
    success: (message) => {
        toast.success(message)
    },
    info: (message) => {
        toast.info(message)
    }
}

export default toaster
