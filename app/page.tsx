import RepoSearchForm from "@/components/repo-search-form";
import { Github } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-900 to-transparent opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-4 relative">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest border border-slate-200">
            <Github className="w-3 h-3" />
            Open Source Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            GitHub <span className="text-blue-600"> Repository Insights</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
            A premium interface to explore repository metadata, analyze contributors, and track issues with real-time feedback.
          </p>
        </div>

        <div className="flex justify-center flex-col items-center gap-4">
          <RepoSearchForm />
        </div>
      </div>
    </div>
  );
}

export default Home
