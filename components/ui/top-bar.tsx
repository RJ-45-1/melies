import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "./button";
import SignOutButton from "./signout-button";

export default async function TopBar() {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getSession();

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <Link href="/" className="flex items-center gap-2  p-2 rounded">
        <span className="font-bold text-xl">Melies</span>
      </Link>

      <div className="flex gap-4">
        {session.session?.user ? (
          <SignOutButton />
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
