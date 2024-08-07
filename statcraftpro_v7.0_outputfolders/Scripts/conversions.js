// Function to flatten each object in the array
export function createFlatMap(data) {
  let flatMap = {};

  data.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (!flatMap[key]) {
        flatMap[key] = [];
      }
      flatMap[key].push(obj[key]);
    });
  });

  return flatMap;
}
