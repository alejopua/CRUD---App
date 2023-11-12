import usersStore from "./store/users.store";

/**
 * 
 * @param {HTMLElement} element 
 */
export const app = async( element ) => {
    element.innerHTML = 'loading...';
    await usersStore.loadNextPage();

}