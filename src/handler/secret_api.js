// Doc see also: https://onetimesecret.com/docs/api

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let base64 = require('base-64')

const secret_api = {
    path: {
        share: "https://onetimesecret.com/secret/",
        create: "https://onetimesecret.com/api/v1/share/",
        generate: ""
    },
    ttl: 300 // 5 min
}

async function create_secret(client, secret, passphrase) {
    const res_json = await make_request(client, secret_api.path.create, secret, passphrase)
    return secret_api.path.share + res_json.secret_key
}

async function make_request(client, url, secret, passphrase) {
    const params = new URLSearchParams()
    params.append("secret", secret)
    params.append("passphrase", passphrase)
    params.append("ttl", secret_api.ttl)

    const req = await fetch(url, {
        method: 'POST',
        body: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Basic " + base64.encode(client.config.api_user + ":" + client.config.api_key) }
    })
    return await req.json()
}

module.exports = { create_secret }
