export {};

declare global {
  interface String {
    // Blank / Empty related
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    isBlank(): boolean;
    isNotBlank(): boolean;
    isBlankOrEmpty(): boolean;
    isNotBlankAndEmpty(): boolean;

    count(string: string): number;
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

String.prototype.count = function (substring: string) {
  // Escape special characters in the substring to avoid regex interpretation
  const escapedSubstring = substring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create a regular expression to match the substring globally
  const regex = new RegExp(escapedSubstring, 'g');

  // Use match() to get an array of all matches, and return its length
  return (this.match(regex) || []).length;
}