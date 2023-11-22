import './render-modal.css'
import modalHtml from './render-modal.html?raw'; // ?raw only works in vite
import { User } from '../../models/users';
import { getUserById } from '../../usecases/get-user-by-id';

let modal, form;
let loadedUser = {};

/**
 * 
 * @param {String | Number } id 
 */
export const showModal = async( id ) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};
    if(!id) return;
    const user = await getUserById(id);
    setFormValues( user );
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
};

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=> Promise<avoid>} callback 
 * @returns 
 */
export const RenderModal = (element, callback) => {
    if (modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', (e) => {
        if (e.target.className !== 'modal-container') return;
        hideModal();
    })

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        
        const formData = new FormData( form );
        const userlike = {...loadedUser};

        if (!formData.get('isActive')) {
            formData.append('isActive', 'off');
        }

        for (const [key,value] of formData) {
            if (key === 'balance') {
                userlike[key] = +value;
                continue;
            }

            if (key === 'isActive') {
                userlike[key] = (value === 'on') ? true : false;
                continue;
            }

            userlike[key] = value;
        }
        await callback(userlike);
        hideModal();
    })

    element.append(modal);
}