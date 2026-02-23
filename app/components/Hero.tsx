export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-dvh flex flex-col justify-center items-center md:items-start relative">
        <span className="text-lg md:text-xl font-bold text-accent mb-8 tracking-widest">
          Hi, My name is
        </span>

        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-text-main leading-[0.8] mb-8 -ml-1.5 tracking-tighter">
          Praful Gulani
        </h1>

        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-text-dim mb-8 opacity-90 leading-tight -ml-0.5">
          I enjoy turning ideas into working code.
        </h2>

        <p className="text-lg md:text-xl leading-relaxed max-w-2xl text-text-dim mb-10 text-center md:text-left">
          I am a{" "}
          <span className="text-accent font-semibold">Software Developer</span>{" "}
          focused on Machine Learning and Artificial Intelligence. I graduated
          from{" "}
          <span className="text-accent font-semibold">
            Goldsmiths, University of London
          </span>{" "}
          with a BSc in Computer Science.
        </p>

        <a
          href="mailto:prafulgulani555@gmail.com"
          className="px-8 py-4 border-2 border-accent text-accent font-bold rounded-lg 
                hover:bg-accent hover:text-bg transition-all duration-300 
                transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-accent/10"
        >
          Get In Touch
        </a>
      </section>
    </>
  );
}
