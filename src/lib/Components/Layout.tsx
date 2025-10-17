import { PropsWithChildren } from "preact/compat";
import { Toaster } from "sonner";
import { useLocation } from "preact-iso";

export default function Layout(
  props: PropsWithChildren<{
    nav?: preact.ComponentChildren;
  }>
) {
  const location = useLocation();
  return (
    <>
      <header>
        <h1>Ryan's Web Toolbox</h1>
        <nav>{props.nav}</nav>
      </header>
      <main>
        {props.children}
        <Toaster />
      </main>
      <footer>
        <code>{JSON.stringify(location)}</code>
        <div>{import.meta.env.MODE}</div>
      </footer>
    </>
  );
}
