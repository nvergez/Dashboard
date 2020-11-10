const axios = require('axios');

describe('Endpoints', () => {
    it('show about.json', async done => {
        const res = await axios.get('http://localhost:8080/about.json');

        if (res.data.client && res.data.server)
            done()
    });
})