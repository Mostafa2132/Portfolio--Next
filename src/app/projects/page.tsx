import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from "react-icons/fa";
import Link from "next/link";
import { reposData } from "@/data/reposData";

export default function AllProjectsPage() {
  const repos = reposData
    .filter((r: any) => !r.fork)
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <main className="min-h-screen relative overflow-x-hidden pt-16 pb-12 px-6">
      <div className="noise-bg fixed inset-0 pointer-events-none z-[-1]"></div>
      
      <div className="max-w-7xl mx-auto z-10 relative">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-12 group">
          <div className="w-10 h-10 rounded-full border border-[var(--glass-border)] flex items-center justify-center group-hover:bg-[var(--glass-border)] transition-colors">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
          </div> 
          <span className="font-bold tracking-widest text-sm uppercase">Back to Portfolio</span>
        </Link>
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
            GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]">Repositories</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)]">
            A complete archive of all my open source work, containing {repos.length} repositories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo: any) => (
            <div key={repo.id} className="glass-panel p-6 rounded-3xl flex flex-col h-full group hover:-translate-y-2 transition-transform duration-500 hover:border-[var(--accent)]/50 border-t border-[var(--glass-border)] bg-[var(--bg-secondary)] shadow-lg hover:shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-[var(--accent-2)] transition-colors line-clamp-1 flex-1 pr-4">
                    {repo.name}
                  </a>
                  <div className="flex items-center gap-3 text-[var(--text-muted)] shrink-0">
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors p-2 bg-[var(--glass-border)] rounded-full">
                        <FaExternalLinkAlt size={14} />
                      </a>
                    )}
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 bg-[var(--glass-border)] rounded-full">
                      <FaGithub size={16} />
                    </a>
                  </div>
                </div>
                
                <p className="text-[var(--text-muted)] mb-6 flex-1 text-sm leading-relaxed line-clamp-3">
                  {repo.description || "No description provided."}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-[var(--glass-border)] mt-auto">
                  <div className="flex items-center gap-4 text-xs font-bold text-[var(--text-muted)]">
                    {repo.language && (
                       <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></span>{repo.language}</span>
                    )}
                    {repo.stargazers_count > 0 && (
                       <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors"><FaStar /> {repo.stargazers_count}</span>
                    )}
                    {repo.forks_count > 0 && (
                       <span className="flex items-center gap-1"><FaCodeBranch /> {repo.forks_count}</span>
                    )}
                  </div>
                  <span className="text-[10px] opacity-30 uppercase tracking-widest font-mono">{new Date(repo.updated_at).getFullYear()}</span>
                </div>
              </div>
            ))}
          </div>
      </div>
    </main>
  );
}
