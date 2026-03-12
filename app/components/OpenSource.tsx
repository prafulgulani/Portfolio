"use client";
import { useState, useEffect } from "react";
import profileData from "../data/profile.json";

export default function OpenSource() {
  const contributions = profileData.openSource;
  const orgs = Array.from(new Set(contributions.map((c) => c.org)));

  const [activeOrg, setActiveOrg] = useState(orgs[0]);
  const [selectedPrId, setSelectedPrId] = useState<number | null>(null);

  const orgContributions = contributions.filter((c) => c.org === activeOrg);
  
  useEffect(() => {
    if (orgContributions.length > 0) {
      setSelectedPrId(orgContributions[0].id);
    }
  }, [activeOrg]);

  const activePr = contributions.find((c) => c.id === selectedPrId);

  return (
    <section id="opensource" className="py-24 scroll-mt-20">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-text-main whitespace-nowrap">
          Open Source Contributions
        </h2>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide font-serif">
        {orgs.map((org) => (
          <button
            key={org}
            onClick={() => setActiveOrg(org)}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-300 rounded-md whitespace-nowrap ${
              activeOrg === org
                ? "bg-accent text-bg border-accent"
                : "bg-surface text-text-dim border-on-accent/10 hover:border-accent/50"
            }`}
          >
            {org}
          </button>
        ))}
      </div>

      {/* Main Dashboard Container */}
      <div className="font-serif flex flex-col md:flex-row bg-surface border border-on-accent/10 rounded-xl overflow-hidden h-auto md:h-150">
        
        {/* Selection List (Mobile: Horizontal / Desktop: Vertical) */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-on-accent/10 bg-on-accent/5">
          <div className="flex md:block overflow-x-auto md:overflow-y-auto h-full scrollbar-hide">
            {orgContributions.map((pr) => (
              <button
                key={pr.id}
                onClick={() => setSelectedPrId(pr.id)}
                className={`shrink-0 w-70 md:w-full text-left p-6 border-r md:border-r-0 md:border-b border-on-accent/5 transition-all duration-200 ${
                  selectedPrId === pr.id
                    ? "bg-bg md:border-l-4 md:border-l-accent"
                    : "hover:bg-on-accent/5 md:border-l-4 md:border-l-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-text-dim">{pr.date}</span>
                  <span className={`text-sm uppercase px-1.5 py-0.5 rounded border ${
                    pr.status === 'merged' ? 'text-green-500 border-green-500/20' : 'text-accent border-accent/20'
                  }`}>
                    {pr.status}
                  </span>
                </div>
                <h4 className={`font-bold leading-tight line-clamp-2 ${
                  selectedPrId === pr.id ? "text-accent" : "text-text-main"
                }`}>
                  {pr.title}
                </h4>
              </button>
            ))}
          </div>
        </div>

        {/* Detail View Pane */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-bg/30 min-h-100">
          {activePr ? (
            <div key={activePr.id} className="animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-right-4 duration-300">
              <div className="mb-10">
                <h3 className="text-xl md:text-3xl font-black text-text-main mb-4 leading-tight">
                  {activePr.title}
                </h3>
                <a 
                  href={activePr.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-2 tracking-widest uppercase font-bold"
                >
                  View Pull Request <span className="text-lg">↗</span>
                </a>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="font-bold text-text-main mb-6 uppercase tracking-widest text-sm">
                    Contribution Impact:
                  </p>
                  <ul className="space-y-4">
                    {activePr.description.map((point, index) => (
                      <li key={index} className="flex items-start gap-4 text-sm text-text-dim leading-relaxed">
                        <span className="text-accent mt-1 text-xs">▹</span>
                        <span className="font-mono">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-text-dim/40 font-mono text-xs uppercase tracking-widest text-center">
              Select an issue to view details
            </div>
          )}
        </div>
      </div>
    </section>
  );
}