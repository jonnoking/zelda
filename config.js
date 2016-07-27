module.exports = {
    db: {
        production: 'mongodb://zelda-mongo/penwith',
        development: 'mongodb://zelda-mongo/penwith',
    },
    auth0: {
        tenant_url: 'https://jonno.eu.auth0.com',
        secret: 'wB4GaeceofpPRKvxNWD-MXrJKB0gjNpSn9nW6rkOfmm9_-Td5hdSRYitjEamK9Pf',
        audience: 'aL8KG9sLSs6dFvCPOoMjpPSew9kwEwEO',
    },
    auth0Api: {
        algorithms: "RS256",
        issuer: "https://jonno.eu.auth0.com/",
        audience: "https://jonnoking.com/zelda.api",
    },
    zeldaBot: {
        algorithms: "RS256",
        issuer: "https://jonno.eu.auth0.com/",
        audience: "https://jonnoking.com/zelda.api",
        clientId: "4EeXNuuqp0wtF9vo9cG8IrkaSMnNf19o",
        clientSecret: "1QkKo6dhjSobAt2gBv6YQ4bdfFfx_oX8yi3J6tCvU7ss24A8mJ-fwXHTbL_p99RZ"
    }
}