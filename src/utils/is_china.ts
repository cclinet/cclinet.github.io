function isChina() {
  return (
    window.location.host === "cclin.top" || window.location.host === "localhost"
  );
}
export { isChina };
