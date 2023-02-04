import axios from 'axios'

axios.defaults.timeout = 5000

const METHOD = {
    GET: 'get',
    POST: 'post'
}

async function request(url, method, params, config) {
    switch (method) {
        case METHOD.GET:
            return axios.get(url, {params, ...config})
        case METHOD.POST:
            return axios.post(url, params, config)
        default:
            return axios.get(url, {params, ...config})
    }
}

export async function create(origin_url) {
    return request(
        "https://xn--s7y.fun/create",
        METHOD.POST,
        {"origin_url":origin_url}
    )
}

export async function get_qr_code(url) {
    return request(
        "https://xn--s7y.fun/get_qr_code",
        METHOD.POST,
        {"url":url}
    )
}
