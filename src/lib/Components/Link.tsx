import { useLocation } from "preact-iso";

export default function Link({
  href,
  children,
}: {
  href: string;
  children?: preact.ComponentChildren;
}) {
  const location = useLocation();
  return (
    <a href={href} className={location.path == href ? "current" : ""}>
      {children}
    </a>
  );
}
