if (!Array.prototype.at) {
  Array.prototype.at = function at(index: number) {
    if (index < 0) {
      return this[this.length + index];
    }
    return this[index];
  };
}
