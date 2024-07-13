import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen lg:items-center lg:justify-center">
      <LoginForm />
    </main>
  );
}
