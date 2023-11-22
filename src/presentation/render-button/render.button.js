import usersStore from '../../store/users.store';
import { RenderTable } from '../render-table/render.table';
import './render.button.css';

export const RenderButton = (element) => {
    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev';

    const currentPage = document.createElement('span');
    currentPage.id = 'currentPage';
    currentPage.innerText = usersStore.getCurrentPage();

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next >';

    element.append(prevButton, currentPage, nextButton);

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currentPage.innerText = usersStore.getCurrentPage();
        RenderTable(element)
    })

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentPage.innerText = usersStore.getCurrentPage();
        RenderTable(element)
    })

}