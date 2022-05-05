export const wait = async (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export const resolve = async (promise) => {
    const resolved = {
        data: null,
        error: null
    };

    try {
        resolved.data = await promise;
    } catch (e) {
        resolved.error = e;
    }

    return resolved;
}

export const fetcher = (...args) => fetch(...args).then((res) => res.json())