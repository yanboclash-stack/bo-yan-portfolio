import Link from "next/link";

export default function NotFound() {
  return <section className="not-found page-width"><span>404 / OPEN CIRCUIT</span><h1>Signal lost.</h1><p>This page is not connected to the system.</p><Link className="button primary" href="/">Return home</Link></section>;
}
