const API_BASE_URL = process.env.REACT_APP_BE_API_URL
console.log(API_BASE_URL)

export interface FetchRequest {
    path: string
    method: string
    body?: object
}

export async function fetchRequest<T>(
    params: FetchRequest
): Promise<T> {
    try {
        const response = await fetch(API_BASE_URL + params.path, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: params.method,
            body: JSON.stringify(params.body),
        })

        if (response.status === 200) {
            try {
                const data = (await response.json()) as T
                return { ...data, state: 'success' }
            } catch {
                return { state: 'success' } as T
            }
        } else {
            const data = (await response.json()) as T
            return { ...data, state: 'error' }
        }
    } catch {
        return {
            instance: params.path,
            state: 'error',
        } as T
    }
}