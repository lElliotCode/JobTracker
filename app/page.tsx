import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 font-sans dark:bg-black">
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Welcome to Job Tracker
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">Track your job applications efficiently</p>
    </div>
  );
}
