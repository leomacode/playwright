import fetch from 'node-fetch';

const getLoginToken = async (username, password) => {
    const response = await fetch('http://localhost:2221/api/login', {
        method: 'post',
        body: JSON.stringify({ "username": username, "password": password })
    });

    if (response.status !== 200) {
        throw new Error("Login error")
    }
    const data = await response.json();
    return data.token
}

export default getLoginToken   