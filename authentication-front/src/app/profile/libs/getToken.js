import Cookies from 'js-cookie'

export function getToken() {
    const token = Cookies.get('authToken')

    if (!token) {
        console.error('No auth token found')
        return null
    }

    try {
        const payload = token.split('.')[1]
        const decodedPayload = atob(payload)
        const parsedPayload = JSON.parse(decodedPayload)
        return parsedPayload
    } catch (error) {
        console.error('Error decoding token:', error)
        return null
    }
}
