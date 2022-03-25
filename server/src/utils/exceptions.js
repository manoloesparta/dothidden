class HttpExceptions extends Error {
  constructor(message) {
    super(message);
    this.name = 'HTTP error message';
    this.statusCode = 444;
  }
}

class NotFoundException extends HttpExceptions {
  constructor(message) {
    super(message);
    this.name = 'Not Found';
    this.statusCode = 404;
  }
}

class ForbiddenException extends HttpExceptions {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = 403;
  }
}

class BadRequestException extends HttpExceptions {
  constructor(message) {
    super(message);
    this.name = 'Bad Request';
    this.statusCode = 400;
  }
}

class ConflictException extends HttpExceptions {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
    this.statusCode = 409;
  }
}

class TeapotException extends HttpExceptions {
  constructor(message) {
    super(message);
    this.name = "I'm a Teapot";
    this.statusCode = 418;
  }
}
class InternalServerErrorException extends HttpExceptions {
  constructor(message) {
    super(message);
    this.name = 'Internal Server Error';
    this.statusCode = 500;
  }
}

module.exports = {
  NotFoundException,
  ForbiddenException,
  TeapotException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
  HttpExceptions,
};
