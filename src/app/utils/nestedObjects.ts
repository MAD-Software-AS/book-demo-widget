// Function to merge nested objects
// This function merges two objects, obj1 and obj2, recursively
// It  takes the keys from obj2 and overwrites the values in obj1
export const mergeNestedObjects = <T extends Record<string, any>>(
  obj1: T,
  obj2: Partial<T>
): T => {
  // Create a result object that starts as a shallow copy of obj1
  const result: T = { ...obj1 }

  // Iterate over keys in the second object
  for (const key in obj2) {
    // If the value is an object and not an array or null, merge recursively
    if (
      obj2[key] &&
      typeof obj2[key] === 'object' &&
      !Array.isArray(obj2[key]) &&
      obj2[key] !== null
    ) {
      result[key] = mergeNestedObjects(
        result[key] || ({} as T[Extract<keyof T, string>]),
        obj2[key] as T[Extract<keyof T, string>]
      )
    } else {
      // Overwrite or add the value from obj2
      result[key] = obj2[key] as T[Extract<keyof T, string>]
    }
  }

  // Return the merged result
  return result
}
