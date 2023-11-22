import { RenderAddButton } from "./presentation/render-add-button/render-add-button";
import { RenderButton } from "./presentation/render-button/render.button";
import { RenderModal } from "./presentation/render-modal/render-modal";
import { RenderTable } from "./presentation/render-table/render.table";
import usersStore from "./store/users.store";
import { saveUser } from "./usecases/save-user";

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
    RenderModal(element, async( userLike ) => {
        const user = await saveUser( userLike );
        usersStore.onUserChange( user );
        RenderTable();
    });
}