import React from 'react';

interface LogoProps {
  className?: string;
  dark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12", dark = false }) => {
  return (
    <img 
      src="https://i.imgur.com/hvPIQcl.png" 
      alt="RBTech do Brasil" 
      className={`${className} ${dark ? 'brightness-0 invert' : ''} object-contain transition-all duration-300`}
    />
  );
};