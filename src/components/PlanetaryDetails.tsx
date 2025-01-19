import React from 'react';

interface PlanetaryDetailsProps {
  planet: string;
  details: any;
}

const PlanetaryDetails: React.FC<PlanetaryDetailsProps> = ({ planet, details }) => {
  return (
    <div className="bg-white/5 rounded-lg p-4 space-y-3">
      <h4 className="text-lg font-semibold text-yellow-300 capitalize">{planet}</h4>
      <div className="space-y-2 text-sm">
        <p><strong className="text-purple-300">Sign:</strong> <span className="text-gray-200">{details.sign}</span></p>
        <p><strong className="text-purple-300">House:</strong> <span className="text-gray-200">{details.house}</span></p>
        <p><strong className="text-purple-300">Degree:</strong> <span className="text-gray-200">{details.degree}</span></p>
        <p><strong className="text-purple-300">Strength:</strong> <span className="text-gray-200">{details.strength}</span></p>
        
        <div className="mt-3">
          <h5 className="text-purple-300 font-medium mb-2">Significance</h5>
          <p className="text-gray-200">{details.significance}</p>
        </div>

        <div className="mt-3">
          <h5 className="text-indigo-300 font-medium mb-2">Impact</h5>
          <p className="text-gray-200">{details.impact}</p>
        </div>
      </div>
    </div>
  );
};

export default PlanetaryDetails;