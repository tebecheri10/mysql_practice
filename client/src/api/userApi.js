export class UserApi{
     _baseUrl = 'http://localhost:5000/api';

     createUser(user) {
        return fetch(`${this._baseUrl}/create-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

     getUsers() {
        return fetch(`${this._baseUrl}/get-users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    deleteUser (id) {
        return fetch(`${this._baseUrl}/delete-user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}