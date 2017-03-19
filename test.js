const test = require('tape');
const shot = require('shot');
const router = require('./router');

// Setup
test('Initialise', (t) => {
  let num = 2;
  t.equal(num, 2, 'Should return 2, result = ' + num);
  t.end();
});

// home route
test('Home route', (t) => {
  shot.inject(router, { method: 'GET', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, 'Should respond with status code of 200');
    t.equal(res.payload, 'Hello', 'Should return correct response - Hello');
    t.end();
  });
});

// blog route
test('Blog route', (t) => {
  shot.inject(router, { method: 'GET', url: '/blog' }, (res) => {
    t.equal(res.statusCode, 200, 'Should respond with status code of 200');
    t.deepEqual(JSON.parse(res.payload), { strings : ['1', '2', '3'] }, 'Should return JSON object containing 3 strings');
    t.end();
  });
});

// blog route - POST method
test('Blog route - POST method', (t) => {
  shot.inject(router, { method: 'POST', url: '/blog', headers: { password : 'potato' }, payload: '4' }, (res) => {
    t.equal(res.statusCode, 200, 'Should respond with a status code of 200');
    t.deepEqual(JSON.parse(res.payload), { strings: ['1', '2', '3', '4'] }, 'Should return JSON object containing 4 strings');
    t.end();
  });
});

// blog route - POST method, no password
test('Blog route - POST method, no password', (t) => {
  shot.inject(router, { method: 'POST', url: '/blog', payload: '4' }, (res) => {
    t.equal(res.statusCode, 403, 'Should respond with a status code of 403');
    t.equal(res.payload, 'Forbidden', 'Should return correct response - Forbidden');
    t.end();
  });
});

// blob route - POST method, no payload
test('Blog route - POST method, no payload', (t) => {
  shot.inject(router, { method: 'POST', url: '/blog', headers: { password : 'potato' } }, (res) => {
    t.equal(res.statusCode, 302, 'Should respond with a status code of 302');
    t.equal(res.headers.Location, '/blog', 'Response header should contain \'Location : /blog\'');
    t.end();
  });
});

// unknown route
test('Unknown route', (t) => {
  shot.inject(router, { method: 'GET', url: '/elephants' }, (res) => {
    t.equal(res.statusCode, 404, 'Should respond with status code of 404');
    t.equal(res.payload, 'unknown uri', 'Should return correct response - unknown uri');
    t.end();
  });
});
