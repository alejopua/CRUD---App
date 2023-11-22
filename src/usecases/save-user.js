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

    if (user.id) {
        throw 'not implemented'
    }

    const updatedUser = await createUser ( userToSave )
    return updatedUser;
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

    const newUser = res.json();
    console.log({newUser});
    return newUser;
}