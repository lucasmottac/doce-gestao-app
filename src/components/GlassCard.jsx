import React from 'react';

const GlassCard = ({ children, className = '', onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
        relative overflow-hidden
        bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl
        border-t border-l border-white/10
        border-b border-r border-black/20
        rounded-3xl p-6
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-primary/20
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default GlassCard;
