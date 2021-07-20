const FETCH_USER_TOKEN = "FETCH_USER_TOKEN"

const fetchUserToken = () => {
    return {
        type: FETCH_USER_TOKEN
    }
}

export {fetchUserToken, FETCH_USER_TOKEN}