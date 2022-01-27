function errorHandler(err, req, res, next) {
  res.status(err.code).json({
    ok: false,
    error: err,
  });
}

function error404(req, res, next) {
  const code = 404;
  res.status(code).json({
    ok: false,
    error: {
      code: code,
      message: "Ruta no válida",
    },
  });
}

module.exports = {
  errorHandler,
  error404,
};
