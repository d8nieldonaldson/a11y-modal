const main = document.querySelector('main');
const modalHeader = document.querySelector('header.modal-header');
const modalTrigger = document.querySelector('.modal-trigger');
const modalCloseButton = modalHeader.querySelector('.close-modal');
const modalBackground = document.querySelector('.modal-background');
const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

let isModalOpen = false;

function closeModal(modal) {
    modal.classList.remove('show');
    modal.hidden = !modal.hidden;
    modalTrigger.focus();

}

function openModal(modal) {

    modal.classList.add('show');
    modal.hidden = !modal.hidden;
    isModalOpen = true;
    const focusableItems = modal.querySelectorAll(focusableElements);
    // skip close button, move to next focusable
    focusableItems[1].focus();
}

function gatherFocusable(container) {
    // cache some elements
    const firstFocusableElement = container.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    // array of all focusable
    const focusableContent = container.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
    return [firstFocusableElement, lastFocusableElement];
}

modalHeader.addEventListener('click', e => {
    if (e.target.matches('.close-modal')) {
        if (isModalOpen) {
            closeModal(modalBackground);
        }
    }
})

main.addEventListener('click', e => {
    if (e.target.matches('.modal-trigger')) {
        openModal(modalBackground);
        modalCloseButton.setAttribute('tabindex', 0);
    }
});
document.addEventListener('keydown', function(e) {
    if (isModalOpen) {
        const [firstFocusableElement, lastFocusableElement] = gatherFocusable(modalBackground);
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
        if (isTabPressed) {
            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) { // if focus is on the first element, we need it to loop, 
                    lastFocusableElement.focus(); // so we add focus for the last focusable element
                    e.preventDefault();
                }
            } else { // if only tab key is pressed
                if (document.activeElement === lastFocusableElement) { // if focus is on the last element, we need it to loop,
                    firstFocusableElement.focus(); // so we add focus to the first focusable element
                    e.preventDefault();
                }
            }
        }
        if (e.code === 'Escape') {
            return closeModal(modalBackground);
        }
    }
});