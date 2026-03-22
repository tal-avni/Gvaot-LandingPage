export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      {/* Subtle overlay to keep text readable without dulling the blue */}
      <div className="absolute inset-0 bg-[#3730a3]/30" />

      {/* Sticky minimal navbar */}
      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-2 bg-[#3730a3]/80 backdrop-blur-sm border-b border-white/10">
        <img src="/logo-blue.png" alt="גבעות" className="h-10 w-auto object-contain" />
        <button
          onClick={scrollToForm}
          className="text-sm text-white/80 hover:text-[#c9a84c] transition-colors duration-200 font-medium"
        >
          השאירו פרטים
        </button>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="w-44 h-44 rounded-full bg-white shadow-2xl overflow-hidden flex items-center justify-center p-1">
            <img src="/logo.png" alt="גבעות לוגו" className="w-full h-full object-contain" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
          למחיר, פרטים מלאים ותמונות
          <br />
          <span className="text-[#c9a84c]">מלאו את הפרטים שלכם עכשיו!!!</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/80 font-semibold mb-4 max-w-2xl mx-auto leading-relaxed">
          מהרו! – נכסים איכותיים בירידת מחיר
          <br />
          לא נשארים זמן רב בשוק
        </p>

        <p className="text-lg md:text-xl text-white/70 font-light mb-10 max-w-xl mx-auto">
          לאן לשלוח את הפרטים של הנכסים?
        </p>

        {/* CTA button */}
        <button
          onClick={scrollToForm}
          className="group inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#e0c16e] text-[#1a1a2e] font-bold text-lg px-10 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[#c9a84c]/40"
        >
          השאירו פרטים עכשיו
          <span className="animate-bounce inline-block transition-transform group-hover:translate-y-1">↓</span>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#c9a84c]/60 animate-pulse" />
      </div>
    </section>
  );
}
