const axios = require('axios');


describe('Post Endpoints', () => {
    var userId;
    var sessionId;
    it('should create a new user', async () => {

      const res = await axios.post('http://localhost:9000/users',
                    {email: "test@test.com", username: "Tester", password: "test"});

      expect(res.data.email).toEqual("test@test.com");
      userId = res.data.id;
    });

    it('should get the current user', async () => {

        const res = await axios.get('http://localhost:9000/users/' + userId);
  
        expect(res.data.id).toEqual(userId);
    });

    it('should verify the current user', async () => {
        try {
            const res = await axios.get('http://localhost:9000/verify', { params: {id: userId} });
        } catch (e) {
            const res = await axios.get('http://localhost:9000/users/' + userId);
            expect(res.data.verified).toEqual(true);
        }
    });

    it('should create a new session', async () => {
        const res = await axios.post('http://localhost:9000/sessions',
                    {email: "test@test.com", password: "test"});

        expect(res.data.userId).toEqual(userId);
        sessionId = res.data.id;
    });

    it('should get the current session', async () => {
        const res = await axios.get('http://localhost:9000/sessions/' + sessionId);
  
        expect(res.data.id).toEqual(sessionId);
    });

    it('should delete the current session', async done => {
        
        const res = await axios.delete('http://localhost:9000/sessions/' + sessionId);

        if (!res.data.message) {
            done();
        }
    });

    it('should delete the current user', async done => {
        
        const res = await axios.delete('http://localhost:9000/users/' + userId);

        if (!res.data.message) {
            done();
        }
    });
});