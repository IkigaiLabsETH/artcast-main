import Login from "@components/login/Login";
import Image from "next/image";

export function LandingPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center p-16"style={{ backgroundColor: 'black', color: 'antiquewhite' }}>
        <Image src="/landing-logo.webp" width={800} height={800} alt="Farcaster Arch" />
        <h1 className="pb-1 text-4xl font-extrabold mt-4">ArtCast</h1>
        <h2>Farcaster X ikigAI</h2>
        <div className="mt-4">
          <Login />
        </div>
      </main>
    </>
  );
}
