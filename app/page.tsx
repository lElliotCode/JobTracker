'use client';

import { useState } from "react";
import AddApplicationForm from "./components/AddApplicationForm";
import ApplicationList from "./components/ApplicationList";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)


  const handleApplicationAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex min-[900px]:flex-row min-h-screen py-8 flex-col items-center justify-center gap-4 bg-zinc-50 font-sans dark:bg-[#222]">
      <div className="mx-auto">
        <div className="mb-6 max-w-md">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to Job Tracker
          </h1>
          <p className="text-lg text-dark dark:text-zinc-400">Track your job applications efficiently</p>
        </div>
        <AddApplicationForm onApplicationAdded={handleApplicationAdded} />
      </div>
      <ApplicationList refreshTrigger={refreshTrigger} />
    </div>
  );
}
