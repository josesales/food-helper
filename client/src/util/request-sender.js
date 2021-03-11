
export const get = async (route, token = null) => {

    try {

        const res = await fetch(`http://localhost:5000${route}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : ''
            },
            // body: body ? JSON.stringify(body) : ''
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Error while trying to communicate with the API. Route: ' + route);
        }

        let resData = await res.json();
        return resData;
    } catch (error) {
        console.log(error);
    }
}

export const postPatch = async (route, method = 'POST', body, token = null) => {

    try {

        const res = await fetch(`http://localhost:5000${route}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : ''
            },
            body: body ? JSON.stringify(body) : ''
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Error while trying to communicate with the API. Route: ' + route);
        }

        let resData = await res.json();
        return resData;
    } catch (error) {
        console.log(error);
    }
}