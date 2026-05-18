function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 py-8 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} EduPredict. Built for learning and future growth.</p>
        <p className="text-slate-500">React + Vite + Express structure for student prediction apps.</p>
      </div>
    </footer>
  )
}

export default Footer
