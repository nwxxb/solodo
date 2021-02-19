function trimSpaces(string) {
  return string
    .replace(/&nbsp;/g, " ")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

export { trimSpaces }