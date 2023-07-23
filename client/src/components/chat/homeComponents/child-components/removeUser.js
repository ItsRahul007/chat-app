// Filtering requested user from the array
export default function removeUser(array, id){
    const data = array.filter(e => {return e._id !== id});
    return data;
};