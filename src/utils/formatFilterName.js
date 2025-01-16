const formatFilterName = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Первая буква заглавная
    .join(" ");

export default formatFilterName;
