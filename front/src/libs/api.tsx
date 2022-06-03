type id = number;
type name = string;
type date = string;
type email = string;
type role = string;
type points = number;
type idCategory = number;
type content = string;
type weeklyPoints = number;
type dollarPerPoint = number;
interface User {
    id: id,
    email: email,
    roles: role[],
    firstname: name,
    lastname: name,
    parent?: id
}
const exampleResponse = {
    getUser: {
        "id": 0,
        "email": "user@example.com",
        "roles": [
            "string"
        ],
        "firstname": "Théo ",
        "lastname": "Léao",
        "parent": "string"
    }

}

export async function getUser(id: User["id"]): Promise<any> {
    let requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
    };
    const res = await fetch(`http://localhost:8000/api/users/${id}`, requestOptions);
    return res.text();
}
export async function getUsers(): Promise<any> {
    let requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
    };
    const res = await fetch("http://localhost:8000/api/users", requestOptions); 
    return res.text(); 
}

export async function getUserChilds(userId: number): Promise<any> {
    const users  = await getUsers();
    console.log(users)
    return JSON.parse(users).filter(user => user.parent?.id === userId);
}