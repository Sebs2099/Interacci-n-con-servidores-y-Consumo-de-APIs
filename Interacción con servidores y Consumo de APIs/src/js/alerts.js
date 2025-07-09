import Swal from "sweetalert2";

/**
 * Creates a customized SweetAlert2 Toast instance with predefined settings.
 *
 * - Displays toast notifications at the top-end of the screen.
 * - Hides the confirmation button.
 * - Automatically closes after 3 seconds, with a visible progress bar.
 * - Pauses the timer when the mouse hovers over the toast, and resumes when the mouse leaves.
 *
 * @constant
 * @type {import('sweetalert2').SweetAlertOptions}
 */
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
export function alertSuccess(message) {
    Toast.fire({
        icon: "success",
        title: message
    });
}
export function alertError(message) {
    Toast.fire({
        icon: "error",
        title: message
    });
}