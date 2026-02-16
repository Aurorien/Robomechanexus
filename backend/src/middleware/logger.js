export function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;

  console.log(`[${timestamp}] ${method} ${path}`);

  // Log response status code after request completes
  const originalSend = res.send;
  res.send = function (data) {
    console.log(`[${timestamp}] ${method} ${path} - Status: ${res.statusCode}`);
    originalSend.call(this, data);
  };

  next();
}
