export const Footer = () => {
  return (
    <footer className="w-full py-8 flex justify-center text-[var(--text-muted)] text-[10px] font-bold tracking-[0.2em] uppercase px-6 opacity-30 hover:opacity-100 transition-opacity">
      <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-6">
        <p>© {new Date().getFullYear()} MOSTAFA EBRAHEM. ALL RIGHTS RESERVED.</p>
        <div className="hidden md:block w-1 h-1 bg-[var(--text-muted)] rounded-full"></div>
        <p>BUILT WITH NEXT.JS & GSAP.</p>
      </div>
    </footer>
  );
};
