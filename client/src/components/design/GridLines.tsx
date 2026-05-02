export function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Horizontal Lines - Top and Bottom only */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.05]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.05]" />
      
      {/* Plus icon decorations in corners */}
      {/* Top Left */}
      <div className="absolute top-6 left-6">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 0V11M0 5.5H11" stroke="white" strokeOpacity="0.9" />
        </svg>
      </div>
      
      {/* Top Right */}
      <div className="absolute top-6 right-6">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 0V11M0 5.5H11" stroke="white" strokeOpacity="0.9" />
        </svg>
      </div>
      
      {/* Bottom Left */}
      <div className="absolute bottom-6 left-6">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 0V11M0 5.5H11" stroke="white" strokeOpacity="0.9" />
        </svg>
      </div>
      
      {/* Bottom Right */}
      <div className="absolute bottom-6 right-6">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 0V11M0 5.5H11" stroke="white" strokeOpacity="0.9" />
        </svg>
      </div>
    </div>
  );
}