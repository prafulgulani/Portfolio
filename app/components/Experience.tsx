"use client";
import { useState } from "react";
import profileData from "../data/profile.json";

export default function Experience() {
  const experiences = profileData.experience;
  const [activeTab, setActiveTab] = useState(0);

  const active = experiences[activeTab];

  return (
    <section id="experience" className="py-24 scroll-mt-20">
      {/* Large Heading - Matched with About & Open Source */}
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-text-main whitespace-nowrap">
          Experience
        </h2>
      </div>

      <div className="flex flex-col md:flex-row bg-surface border border-on-accent/10 rounded-xl overflow-hidden min-h-112.5">
        {/* Company Selector (Mobile: Horizontal / Desktop: Vertical) */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-on-accent/10 bg-on-accent/5">
          <div className="flex md:block overflow-x-auto md:overflow-y-auto h-full scrollbar-hide">
            {experiences.map((exp, index) => (
              <button
                key={exp.company}
                onClick={() => setActiveTab(index)}
                // p-6 and border-b match the PR list items exactly
                className={`shrink-0 w-60 md:w-full text-left p-6 border-r md:border-r-0 md:border-b border-on-accent/5 transition-all duration-200 ${
                  activeTab === index
                    ? "bg-bg md:border-l-4 md:border-l-accent"
                    : "hover:bg-on-accent/5 md:border-l-4 md:border-l-transparent"
                }`}
              >
                <h4
                  className={`text-sm font-bold uppercase tracking-wider ${
                    activeTab === index ? "text-accent" : "text-text-main"
                  }`}
                >
                  {exp.company}
                </h4>
              </button>
            ))}
          </div>
        </div>

        {/* Details Pane */}
        <div className="flex-1 p-8 md:p-12 bg-bg/30 overflow-y-auto">
          {active && (
            <div
              key={active.company}
              className="animate-in fade-in slide-in-from-right-4 duration-500"
            >
              <div className="mb-10">
                <h3 className="text-2xl md:text-3xl font-black text-text-main leading-tight mb-2">
                  {active.role}
                </h3>
                <p className="text-xs font-mono text-accent uppercase tracking-widest font-bold">
                  {active.period}
                </p>
              </div>

              <div>
                <p className="font-bold text-text-main mb-6 uppercase tracking-widest text-sm">
                  Key Responsibilities & Impact:
                </p>
                <ul className="space-y-4">
                  {active.achievements.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-sm text-text-dim leading-relaxed"
                    >
                      <span className="text-accent mt-1 text-xs">▹</span>
                      <span className="font-mono">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
