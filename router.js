const router = (request, response) => {
  if (request.url == '/') {
    response.writeHead(200, {'content-type' : 'text/plain'});
    response.end('Hello');
  } else if (request.url =='/blog') {
    var newObj = { strings : ['1', '2', '3'] };
    // GET requests
    if (request.method === 'GET') {
      response.writeHead(200, {'content-type' : 'application/json'});
      response.end(JSON.stringify(newObj));
    // POST requests
    } else if (request.method === 'POST') {
      // if password and payload
      if (request.headers.password === 'potato' && request._shot.payload) {
        // use request stream handling instead of shot payload!
        response.writeHead(200, {'content-type' : 'application/json'});
        newObj.strings.push(request._shot.payload);
        response.end(JSON.stringify(newObj));
      // if password but no payload
      } else if (request.headers.password === 'potato') {
        response.writeHead(302, {'Location' : '/blog'});
        response.end();
      // if no password
      } else {
        response.writeHead(403, {'content-type' : 'text/plain'});
        response.end('Forbidden');
      }
    }
  } else {
    response.writeHead(404, {'content-type' : 'text/plain'});
    response.end('unknown uri');
  }
}

module.exports = router;
