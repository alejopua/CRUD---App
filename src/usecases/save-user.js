import { lHostUserMapper } from '../mappers/localhost-user-mapper';
import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import { User } from '../models/users'

/**
 * 
 * @param {Like<User>} useLiker 
 */
export const saveUser = async( useLiker ) => {
    const user = new User( useLiker );

    if (!user.firstName || !user.lastName) throw 'First name and last name are required';
    
    const userToSave = userModelToLocalhost( user );
    let updatedUser;

    if (user.id) {
        updatedUser = await updateUser( userToSave );
    } else {
        updatedUser = await createUser( userToSave );
    }

    return lHostUserMapper(updatedUser);
}

/**
 * 
 * @param {Like<User>} useLiker 
 */
const createUser = async( user ) => {
    const url = `${ import.meta.env.VITE_BASE_URL}/users`
    const res = await fetch( url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    return newUser;
}

/**
 * 
 * @param {Like<User>} useLiker 
 */
const updateUser = async( user ) => {
    const url = `${ import.meta.env.VITE_BASE_URL}/users/${user.id}`
    const res = await fetch( url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await res.json();
    console.log({updatedUser});
    return updatedUser;
}