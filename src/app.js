import { RenderAddButton } from "./presentation/render-add-button/render-add-button";
import { RenderButton } from "./presentation/render-button/render.button";
import { RenderTable } from "./presentation/render-table/render.table";
import usersStore from "./store/users.store";

/**
 * 
 * @param {HTMLElement} element 
 */
export const app = async( element ) => {
    element.innerHTML = 'loading...';
    await usersStore.loadNextPage();
    // console.log(usersStore.getUsers())
    element.innerHTML = '';
    console.log(usersStore.getUsers())

    RenderTable(element);
    RenderButton(element);
    RenderAddButton(element);
}