export function WIP<T, Y = undefined>(node: T, alt: Y): T | Y {
  console.trace("WIP() used");
  if (import.meta.env.MODE === "development") {
    return node;
  } else {
    return alt;
  }
}
