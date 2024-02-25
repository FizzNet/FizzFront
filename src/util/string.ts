export {};

declare global {
  interface String {
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    isBlank(): boolean;
    isNotBlank(): boolean;
    isBlankOrEmpty(): boolean;
    isNotBlankAndEmpty(): boolean;
  }
}

String.prototype.isEmpty = function () {
  return this.length == 0;
}

String.prototype.isNotEmpty = function () {
  return !this.isEmpty();
}

String.prototype.isBlank = function () {
  return this.trim().isEmpty();
}

String.prototype.isNotBlank = function () {
  return !this.isBlank();
}

String.prototype.isBlankOrEmpty = function () {
  return this.isBlank() || this.isEmpty();
}

String.prototype.isNotBlankAndEmpty = function () {
  return this.isNotBlank() && this.isNotEmpty();
}