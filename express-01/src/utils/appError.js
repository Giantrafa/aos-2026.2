class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

// 400 - dados enviados inválidos (campo faltando, formato errado)
class BadRequestError extends AppError {
  constructor(message = "Requisição inválida") {
    super(message, 400);
  }
}

// 401 - não está logado / sem sessão
class UnauthorizedError extends AppError {
  constructor(message = "Não autenticado") {
    super(message, 401);
  }
}

// 403 - está logado, mas não tem permissão (ex.: mexer nos dados de outro usuário)
class ForbiddenError extends AppError {
  constructor(message = "Sem permissão para acessar este recurso") {
    super(message, 403);
  }
}

// 404 - recurso não existe
class NotFoundError extends AppError {
  constructor(message = "Recurso não encontrado") {
    super(message, 404);
  }
}

// 409 - conflito (ex.: email ou username já cadastrado)
class ConflictError extends AppError {
  constructor(message = "Recurso já existe") {
    super(message, 409);
  }
}

export {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
