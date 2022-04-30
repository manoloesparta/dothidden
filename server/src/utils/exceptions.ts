export class HttpException extends Error {
  statusCode: number;
  constructor(message) {
    super(message);
    this.name = 'HTTP error message';
    this.statusCode = 444;
  }
}

export class NotFoundException extends HttpException {
  constructor(message) {
    super(message);
    this.name = 'Not Found';
    this.statusCode = 404;
  }
}

export class ForbiddenException extends HttpException {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = 403;
  }
}

export class BadRequestException extends HttpException {
  constructor(message) {
    super(message);
    this.name = 'Bad Request';
    this.statusCode = 400;
  }
}

export class ConflictException extends HttpException {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
    this.statusCode = 409;
  }
}

export class TeapotException extends HttpException {
  constructor(message) {
    super(message);
    this.name = 'I\'m a Teapot';
    this.statusCode = 418;
  }
}
export class InternalServerErrorException extends HttpException {
  constructor(message) {
    super(message);
    this.name = 'Internal Server Error';
    this.statusCode = 500;
  }
}
