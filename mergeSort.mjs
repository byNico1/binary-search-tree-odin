function merge(left, right) {
  let result = [];

  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  for (; i < left.length; i++) {
    result.push(left[i]);
  }
  for (; j < right.length; j++) {
    result.push(right[j]);
  }

  // console.log(result + " result");
  return result;
}

function mergeSort(array) {
  if (array.length <= 1) return array;

  let mid = Math.floor(array.length / 2);
  let left = mergeSort(array.slice(0, mid));
  // console.log(left + " left");
  let right = mergeSort(array.slice(mid));
  // console.log(right + " right");

  return merge(left, right);
}

export default mergeSort;

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));

console.log(mergeSort([105, 79, 100, 110]));
