import { loadPageByPage } from "../usecases/load.users-by-page"

const state = {
    CurrentPage: 0,
    Users: [],
}

const loadNextPage = async() => {
    const users = await loadPageByPage( state.CurrentPage + 1 );
    if (users.length === 0) return;
    state.CurrentPage += 1;
    state.Users = users;
}

const loadPreviousPage = async() => {
    if (state.CurrentPage <= 1) return; 
    const users = await loadPageByPage( state.CurrentPage - 1  )
    state.CurrentPage -= 1;
    state.Users = users;
}

const onUserChange = async() => {

}

const reloadPage = async() => {

}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChange,
    reloadPage,

    /**
     * 
     * @returns {Users[]}
     */
    getUsers: () => [...state.Users],
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.CurrentPage,
}

    