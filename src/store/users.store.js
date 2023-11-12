import { loadPageByPage } from "../usecases/load.users-by-page"

const state = {
    CurrentPage: 0,
    Users: [],
}

const loadNextPage = async() => {
    await loadPageByPage( state.CurrentPage + 1)

}

const loadPreviousPage = async() => {

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
}

    