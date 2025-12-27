
import React from 'react';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all hover:-translate-y-1">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-200">{skill.name}</span>
        <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{skill.category}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-gradient-to-right from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
};

export default SkillCard;
