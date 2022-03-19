class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = 'Not Found';
    this.statusCode = 404;
  }
}

class ForbiddenException extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = 403;
  }
}

class BadRequestException extends Error {
  constructor(message) {
    super(message);
    this.name = "I'm a Teapot";
    this.statusCode = 400;
  }
}

class TeapotException extends Error {
  constructor(message) {
    super(message);
    this.name = "I'm a Teapot";
    this.statusCode = 418;
  }
}

module.exports = {
  NotFoundException, ForbiddenException, TeapotException, BadRequestException
};
