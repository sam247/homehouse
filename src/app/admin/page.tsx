import { redirect } from "next/navigation";

const tinaConfigured =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) && Boolean(process.env.TINA_TOKEN);

export default function AdminEntryPage() {
  if (tinaConfigured) {
    redirect("/admin/index.html");
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl border border-border p-10">
        <h1 className="font-serif text-4xl leading-tight">Admin login</h1>
        <p className="mt-4 text-foreground/75 font-light leading-relaxed">
          The admin panel isn’t configured for this deployment yet.
        </p>
        <div className="mt-8 space-y-3 text-sm text-foreground/75 font-light">
          <p>
            Set <span className="text-foreground">NEXT_PUBLIC_TINA_CLIENT_ID</span> and{" "}
            <span className="text-foreground">TINA_TOKEN</span> in your host (Vercel) environment,
            then redeploy.
          </p>
          <p>Use the repo’s .env.example as the reference.</p>
        </div>
      </div>
    </main>
  );
}
