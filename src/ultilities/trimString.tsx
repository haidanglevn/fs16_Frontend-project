export function trimString(string: string) {
  if (string.length <= 22) {
    return string;
  }

  // Subtracts 3 to account for the length of the ellipsis '...'
  const trimmedStr = string.slice(0, 22 - 3);
  return trimmedStr + "...";
}
