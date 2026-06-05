function MovieCard({ children, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={`w-70 flex-shrink-0 overflow-hidden text-white cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

MovieCard.Image = function ({ src, alt, children }) {
  return (
    <div className="relative w-full h-96 rounded overflow-hidden">
      <img className="w-full h-full object-cover" src={src} alt={alt} />
      {children}
    </div>
  );
};

MovieCard.Badge = function ({ children }) {
  return (
    <span className="absolute bottom-10 bg-black/50  text-white text-xs font-semibold px-3 py-1.5 flex items-center gap-1">
      {children}
    </span>
  );
};

export default MovieCard;
