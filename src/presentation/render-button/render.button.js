import usersStore from '../../store/users.store';
import { RenderTable } from '../render-table/render.table';
import './render.button.css';

export const RenderButton = (element) => {
    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev';

    const currentButton = document.createElement('span');
    currentButton.id = 'currentPage';
    currentButton.innerText = usersStore.getCurrentPage();

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next >';

    element.append(prevButton, currentButton, nextButton);

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currentButton.innerText = usersStore.getCurrentPage();
        RenderTable(element)
    })

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentButton.innerText = usersStore.getCurrentPage();
        RenderTable(element)
    })

}