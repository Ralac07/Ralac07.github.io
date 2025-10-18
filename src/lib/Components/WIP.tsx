export function WIP<T>(node: T): T {
  console.trace("WIP() used");
  return node;
}
