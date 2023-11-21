import './render-add-button.css';

/**
 * 
 * @param {HTMLElement} element
 */
export const RenderAddButton = ( element ) => {
    const buttonAdd = document.createElement('button');
    buttonAdd.innerText = '+';
    buttonAdd.classList.add('button-add');

    element.append( buttonAdd );

    //TODO:
    buttonAdd.addEventListener('click', () =>{
        // if (!callback) return;
        // callback()
        throw Error('Not implemented');
    })
}