import mergeSort from "./mergeSort.mjs";

function TreeNode(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

function Tree(array) {
  function sortedArrayToBST(array, start, end) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);

    const node = TreeNode(array[mid]);
    node.left = sortedArrayToBST(array, start, mid - 1);
    node.right = sortedArrayToBST(array, mid + 1, end);
    return node;
  }

  function buildTree(array) {
    let sortedArray = [...new Set(mergeSort(array))];
    let sortedArrayLength = sortedArray.length;
    const root = sortedArrayToBST(sortedArray, 0, sortedArrayLength - 1);
    return root;
  }

  function insertRec(root, value) {
    if (root === null) {
      return TreeNode(value);
    }

    if (value < root.data) {
      root.left = insertRec(root.left, value);
    } else {
      root.right = insertRec(root.right, value);
    }

    return root;
  }

  return {
    root: buildTree(array),
    insert(value) {
      this.root = insertRec(this.root, value);
    },
    deleteItem(value, root = this.root) {
      if (root === null) {
        return root;
      }

      // Recursive calls for ancestors of
      // node to be deleted
      if (root.data > value) {
        root.left = this.deleteItem(value, root.left);
      } else if (root.data < value) {
        root.right = this.deleteItem(value, root.right);
      } else {
        // We reach here when root is the node
        // to be deleted.

        // If one of the children is empty
        if (root.left === null) {
          return root.right;
        } else if (root.right === null) {
          return root.left;
        }

        // If both children exist
        else {
          const minData = function minValue(root) {
            let minv = root.data;
            while (root.left != null) {
              minv = root.left.data;
              root = root.left;
            }
            return minv;
          };

          root.data = minData(root.right);
          root.right = this.deleteItem(root.data, root.right);
        }

      }
      return root;
    },
    find(value) {
      let root = this.root      

      while (root !== null) {
        if (value === root.data) {
          return root;
        } else if (value < root.data) {
          root = root.left;
        } else if (value > root.data) {
          root = root.right;
        } else {
          return null
        }
      }
    },
    levelOrder(callback) {
      if (this.root == null) return
      const queue = []
      const result = []

      queue.push(this.root)
      while (queue.length > 0) {
        const node = queue.shift()

        if (callback) {
          result.push(callback(node.data))
        } else {
          result.push(node.data)
        }

        if (node.left !== null) {
          queue.push(node.left)
        }
        if (node.right !== null) {
          queue.push(node.right)
        }
      }

      return result
    },
    preOrder(callback, root = this.root, resultArray = []) {
      if (root == null) return

      if(callback) {
        resultArray.push(callback(root))
      } else {
        resultArray.push(root.data)
      }

      this.preOrder(callback, root.left, resultArray)
      this.preOrder(callback, root.right, resultArray)

      return resultArray;
    },
    inOrder(callback, root = this.root, resultArray = []) {
      if (root == null) return;

      this.preOrder(callback, root.left, resultArray);

      if (callback) {
        resultArray.push(callback(root));
      } else {
        resultArray.push(root.data);
      }

      this.preOrder(callback, root.right, resultArray);

      return resultArray;
    },
    postOrder(callback, root = this.root, resultArray = []) {
      if (root == null) return;
      
      this.preOrder(callback, root.left, resultArray);
      this.preOrder(callback, root.right, resultArray);
      
      if (callback) {
        resultArray.push(callback(root));
      } else {
        resultArray.push(root.data);
      }

      return resultArray;
    },
    height(node) {
      if (node === null) {
        return 0;
      }
      return Math.max(this.height(node.left), this.height(node.right)) + 1;
    },
    depth(node, root = this.root, depth = 0) {
      if (node === null || root === null) {
        return 0;
      }

      if (node.data === root.data) {
        return `Depth: ${depth}`
      }else if (root.data > node.data) {
        return this.depth(node, root.left, depth += 1);
      } else if (root.data < node.data) {
        return this.depth(node, root.right, depth += 1);
      } 
    },
    isBalanced() {
      const leftHeight = this.height(this.root.left);
      const rightHeight = this.height(this.root.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      } else {
        return true;
      }
    },
    rebalance() {
      if (this.isBalanced()) return

      const values = this.levelOrder()
      this.root = buildTree(values)
    },
    prettyPrint(node, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(
          node.right,
          `${prefix}${isLeft ? "│   " : "    "}`,
          false
        );
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(
          node.left,
          `${prefix}${isLeft ? "    " : "│   "}`,
          true
        );
      }
    },
  };
}

let tree = Tree([10, 9, 5, 3, 1, 2, 4, 4, 6]);
tree.prettyPrint(tree.root);
tree.insert(7);
tree.insert(30);
tree.prettyPrint(tree.root);
tree.deleteItem(9);
tree.prettyPrint(tree.root);
// console.log(tree.levelOrder())
// console.log(tree.preOrder())
console.log(tree.inOrder())
console.log(tree.postOrder())
console.log(tree.height(tree.root))
console.log(tree.depth({ data: 30, left: null, right: null }));
tree.insert(40);
tree.insert(50);
tree.insert(60);
console.log(tree.isBalanced());
tree.prettyPrint(tree.root);
console.log(tree.rebalance());
console.log(tree.isBalanced());
tree.prettyPrint(tree.root);
// console.log(tree.find(2))
