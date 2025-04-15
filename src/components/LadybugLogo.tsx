
import React from 'react';

interface LadybugLogoProps {
  size?: number;
  className?: string;
}

const LadybugLogo: React.FC<LadybugLogoProps> = ({ size = 40, className = "" }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Main body - red circle */}
      <div className="absolute inset-0 rounded-full bg-red-light"></div>
      
      {/* Head - black semi-circle */}
      <div className="absolute top-0 w-full h-1/3 rounded-t-full bg-charcoal"></div>
      
      {/* Middle line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-charcoal transform -translate-y-1/2"></div>
      
      {/* Spots */}
      <div className="absolute top-[40%] left-[20%] w-[15%] h-[15%] rounded-full bg-charcoal"></div>
      <div className="absolute top-[40%] right-[20%] w-[15%] h-[15%] rounded-full bg-charcoal"></div>
      <div className="absolute top-[65%] left-[30%] w-[15%] h-[15%] rounded-full bg-charcoal"></div>
      <div className="absolute top-[65%] right-[30%] w-[15%] h-[15%] rounded-full bg-charcoal"></div>
    </div>
  );
};

export default LadybugLogo;
