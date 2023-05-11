import axios from "axios";

const api = axios.create({
    baseURL: '/api/young', // 将根据你的代理设置路由到 http://young.i286.com
})

export async function checkToken(queryId, obfuscatedToken) {
    const response = await api.post('/create', {
        account: queryId,
        token: obfuscatedToken,
    });

    return response.data;
}

export async function queryID(queryID) {
    const response = await api.post('/read', {
        account: queryID,
    });

    return response.data
}
