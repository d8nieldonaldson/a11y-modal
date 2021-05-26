const main = document.querySelector('main');
const modalHeader = document.querySelector('header.modal-header');
const modalTrigger = document.querySelector('.modal-trigger');
const modalCloseButton = modalHeader.querySelector('.close-modal');
const modalBackground = document.querySelector('.modal-background');
const modalContent = modalBackground.querySelector('.modal-container');
const allFocusableElements =
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
    const focusableItems = modal.querySelectorAll(allFocusableElements);
    // skip close button, move to next focusable
    focusableItems[1].focus();
}

function getFocusableElements(container) {
    const focusableContent = container.querySelectorAll(allFocusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];
    return [firstFocusableElement, lastFocusableElement];
}

modalHeader.addEventListener('click', e => {
    if (e.target.matches('.close-modal')) {
        if (isModalOpen) {
            closeModal(modalBackground);
        }
    }
});

main.addEventListener('click', e => {
    if (e.target.matches('.modal-trigger')) {
        openModal(modalBackground);
        modalCloseButton.setAttribute('tabindex', 0);
    }
});
document.addEventListener('keydown', function(e) {
    if (isModalOpen) {
        const [firstFocusableElement, lastFocusableElement] = getFocusableElements(modalBackground);
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

// click modal background to close modal
modalBackground.addEventListener('click', e => {
    if (!(modalContent && modalContent.contains(e.target))) {
        if (isModalOpen) {
            closeModal(modalBackground);
        }
    }
});