function isChina() {
  return (
    window.location.host === "cclin.top" || window.location.host === "localhost:4321"
  );
}
export { isChina };
