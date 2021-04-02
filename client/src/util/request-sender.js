
export const get = async (route, token = null) => {

    try {

        const res = await fetch(`http://localhost:5000${route}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : ''
            },
        });

        let resData = null;

        if (res.status != 404) {
            resData = await res.json();
        }

        if (resData && resData.error) {
            throw new Error(resData.error);
        }

        return resData;
    } catch (error) {
        console.log(error);
    }
}

export const postPatch = async (route, method = 'POST', body, token = null, contentType = 'application/json') => {

    try {

        const res = await fetch(`http://localhost:5000${route}`, {
            method,
            headers: {
                'Content-Type': contentType,
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: body ? JSON.stringify(body) : ''
        });

        let resData = await res.json();

        if (resData.error) {
            throw new Error(resData.error);
        }

        return resData;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const remove = async (route, token = null, contentType = 'application/json') => {

    try {

        const res = await fetch(`http://localhost:5000${route}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': contentType,
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        let resData = await res.json();

        if (resData.error) {
            throw new Error(resData.error);
        }

        return resData;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const upload = async (route, file, id, token = null) => {

    try {
        const form = new FormData();
        form.append('file', file);
        form.append('id', id);

        const res = await fetch(`http://localhost:5000${route}`, {
            method: 'POST',
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: form
        });

        if (res.status !== 200 && res.status !== 201) {

            let resData = await res.json();
            throw new Error('Error during upload: ' + route + '. Message: ' + resData.error);
        }
    } catch (error) {
        console.log(error);
    }
}