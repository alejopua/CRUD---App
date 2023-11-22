import usersStore from '../../store/users.store'
import { deleteUserById } from '../../usecases/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render.table.css'

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
    <tr>
        <th>#ID</th>
        <th>Balance</th>
        <th>FirstName</th>
        <th>LastName</th>
        <th>Active</th>
        <th>Actions</th>
    </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody)

    return table;
}

/**
 * 
 * @param {MouseEvent} e 
 */
const selectUserTable = (e) => {
    const element = e.target.closest('.select-user');
    if(!element) return;

    // const id = element.dataset.id;
    const id = element.getAttribute('data-id');
    showModal(id);
}

/**
 * 
 * @param {MouseEvent} e 
 */
const deleteUserTableListener = async(e) => {
    const element = e.target.closest('.delete-user');
    if(!element) return;

    // const id = element.dataset.id;
    const id = element.getAttribute('data-id');
    
    try {
        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#currentPage').innerText = usersStore.getCurrentPage();
        RenderTable();

    } catch (error) {
        console.log(error);
        alert('Error deleting user');
    }
}

/**
 * 
 * @param {HTMLElement} element 
 */
export const RenderTable = ( element ) => {
    const users = usersStore.getUsers();
    if (!table) {
        table = createTable();
        element.append( table );
        table.addEventListener('click', selectUserTable)
        table.addEventListener('click', deleteUserTableListener)
    }

    let tableHTML = '';

    users.forEach(user => {
        tableHTML += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.balance }</td>
                <td>${ user.firstName }</td>
                <td>${ user.lastName }</td>
                <td>${ user.isActive }</td>
                <td>
                <a href="#/" class="select-user" data-id="${ user.id }">Select</a>
                |
                <a href="#/" class="delete-user" data-id="${ user.id }">Delete</a>
                </td>
            </tr>
        `;
    });

    table.querySelector('tbody').innerHTML = tableHTML;

}