import Link from "next/link";

export default function VerifiedPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12 text-center">
      <h1 className="text-2xl font-semibold">Email verified!</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Thanks! Your subscription is confirmed. You’ll start receiving updates soon.
      </p>
      <div className="mt-6">
        <Link href="/" className="text-primary underline-offset-4 hover:underline">
          Back to home
        </Link>
      </div>
    </main>
  );
}
