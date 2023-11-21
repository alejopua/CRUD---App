import modalHtml from './render-modal.html?raw'; // ?raw only works in vite
import './render-modal.css'

let modal;

//TODO: load user for id
export const showModal = () => {
    modal?.classList.remove('hide-modal');
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');

    //TODO: Reset del formulario
}

export const RenderModal = (element) => {
    if (modal) return;
    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    modal.addEventListener('click', (e) => {
        if (e.target.className !== 'modal-container') return;
        hideModal();
    })

    element.append(modal);
}