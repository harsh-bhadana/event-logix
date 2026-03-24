export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background text-foreground font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight">Fresh Start</h1>
        <p className="text-muted-foreground text-lg max-w-md">
          The project has been reset. You're now starting with a clean slate.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https:nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the docs
          </a>
        </div>
      </main>
    </div>
  );
}
