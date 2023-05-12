import { useRouter } from "next/router";

export default function ProductPage() {
  const { query } = useRouter()

  return (
    <>
      <h2>Product Page: {JSON.stringify(query)}</h2>
    </>
  );
}