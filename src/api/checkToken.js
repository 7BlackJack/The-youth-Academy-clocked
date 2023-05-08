
import axios from "axios";

export async function checkToken(queryId, obfuscatedToken) {
    const response = await axios.post('/api/check-token', {
        queryId: queryId,
        token: obfuscatedToken,
    });

    return response.data;
}
