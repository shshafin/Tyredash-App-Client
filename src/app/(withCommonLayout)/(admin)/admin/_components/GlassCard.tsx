"use client";

import React from "react";

const GlassCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <div
      className={`rounded-2xl p-5 bg-gradient-to-br ${color} bg-opacity-30 backdrop-blur-md shadow-md border border-white/20 flex justify-between items-center transition-transform hover:scale-[1.02]`}
    >
      <div>
        <p className="text-sm text-white/80">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className="bg-white/30 p-3 rounded-full shadow-inner">{icon}</div>
    </div>
  );
};

export default GlassCard;
