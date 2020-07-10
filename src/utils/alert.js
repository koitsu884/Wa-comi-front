import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SwalR = withReactContent(Swal);

const DEFAULT_WIDTH = '32rem';

export default class Alert {
    static success = (
        title, 
        message, 
        options = {}
    ) => {
        Swal.fire({
            title: title ? title : null,
            html: message,
            onClose: options.onClose,
            width: options.width ?  options.width : DEFAULT_WIDTH,
            showClass: {
                popup: 'animated zoomIn faster'
            },
            hideClass: {
                popup: 'animated zoomOut faster'
            }
        })
    }

    static error = (message, options = {}) => {
        Swal.fire({
            title: 'エラー',
            icon: 'error',
            html: message,
            width: options.width ?  options.width : DEFAULT_WIDTH,
            showClass: {
                popup: 'animated zoomIn faster'
            },
            hideClass: {
                popup: 'animated zoomOut faster'
            }
        })
    }

    static confirm = (message, options = {}) => {
        return Swal.fire({
            title: '確認',
            html: message,
            width: options.width ?  options.width : DEFAULT_WIDTH,
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: "キャンセル",
            showClass: {
                popup: 'animated zoomIn faster'
            },
            hideClass: {
                popup: 'animated zoomOut faster'
            }
        })
    }
}