export default function TechStack() {
  return (
    <>
      {/* Technical Arsenal - Added py-24 for breathing room */}
      <section className="py-24">
        <h2 className="text-xs uppercase tracking-[0.4em] font-black text-text-dim mb-12 border-b border-on-accent/10 pb-4">
          Technical Arsenal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Programming & Web */}
          <div>
            <h3 className="text-text-main font-bold mb-6 text-sm uppercase tracking-wider border-l-2 border-accent pl-4">
              Programming & Web
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Python", "C++", "SQL", "Django", "Next.js"].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-surface text-text-main border border-on-accent/20 rounded-md text-sm font-bold hover:border-accent transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI & Data Science */}
          <div>
            <h3 className="text-text-main font-bold mb-6 text-sm uppercase tracking-wider border-l-2 border-accent pl-4">
              AI & Data Science
            </h3>
            <div className="flex flex-wrap gap-3">
              {["TensorFlow", "PyTorch", "Scikit-learn", "Pandas"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-surface text-text-main border border-on-accent/20 rounded-md text-sm font-bold hover:border-accent transition-colors"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
