import { subscribeToNewsLetter } from "@/app/actions/newsletter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";

export default function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  async function subscribe(formData: FormData) {
    "use server";
    await subscribeToNewsLetter(formData);
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <div className="mb-8 overflow-hidden rounded-lg border bg-muted relative h-32 sm:h-40 md:h-48">
        <Image
          src="https://loslc.tech/cover.png"
          alt="LOSL-C cover image"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 640px"
          className="object-cover"
        />
      </div>
      {searchParams?.subscribed === "1" && (
        <div className="mb-6">
          <Alert>
            <AlertTitle>Check your inbox</AlertTitle>
            <AlertDescription>
              We sent you a verification link to confirm your subscription. If
              you don’t see it, check your spam folder.
            </AlertDescription>
          </Alert>
        </div>
      )}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">
          Join the LOSL-C community newsletter
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Get updates on tech events, learning resources, and community projects
          shaping Africa’s next generation of creators and builders.
        </p>
      </div>

      <form action={subscribe} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1 block text-sm font-medium"
            >
              First name
            </label>
            <Input
              id="firstName"
              name="firstName"
              required
              placeholder="Jean"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-1 block text-sm font-medium"
            >
              Last name
            </label>
            <Input id="lastName" name="lastName" placeholder="Kokou" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@loslc.tech"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="industry"
              className="mb-1 block text-sm font-medium"
            >
              Field or interest
            </label>
            <Input
              id="industry"
              name="industry"
              required
              placeholder="e.g. Software, Cybersecurity"
            />
          </div>
          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium">
              Role
            </label>
            <Input
              id="role"
              name="role"
              required
              placeholder="e.g. Developer, Student, Entrepreneur"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="preferredContent"
            className="mb-1 block text-sm font-medium"
          >
            What do you want to get from LOSL-C? (optional)
          </label>
          <Textarea
            id="preferredContent"
            name="preferredContent"
            placeholder="e.g. Updates on events, learning materials, challenges, job offers..."
          />
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Join the movement
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        No spam, ever. Just good news, real opportunities, and community energy.
      </p>
    </main>
  );
}
