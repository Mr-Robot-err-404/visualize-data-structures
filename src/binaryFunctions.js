export function BinaryTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinaryTree.prototype.insert = function(value) {
  if (value < this.value) {
    if (!this.left) {
      this.left = new BinaryTree(value);
    } else {
      this.left.insert(value);
    }
  } else {
    if (!this.right) {
      this.right = new BinaryTree(value);
    } else {
      this.right.insert(value);
    }
  }
}