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

/**
 * 
 * @param {User} updatedUser 
 */
const onUserChange = async(updatedUser) => {

    let wasfound = false;

    state.Users = state.Users.map( user => {
        if (user.id === updatedUser.id) {
            wasfound = true;
            return updatedUser;
        }
        return user;
    })

    if (state.Users.length < 10 && !wasfound) {
        state.Users.push(updatedUser);
    }


}

const reloadPage = async() => {
    const users = await loadPageByPage( state.CurrentPage );
    if (users.length === 0) {
        await loadPreviousPage();
        return;
    }
    state.Users = users;
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

    