import React from 'react';

interface HouseDetailsProps {
  house: any;
  houseNumber: number;
}

const HouseDetails: React.FC<HouseDetailsProps> = ({ house, houseNumber }) => {
  if (!house) return null;

  return (
    <div className="bg-white/5 rounded-lg p-4 space-y-3">
      <h4 className="text-lg font-semibold text-yellow-300">{house.name}</h4>
      <div className="space-y-2 text-sm">
        <p><strong className="text-purple-300">Sign:</strong> <span className="text-gray-200">{house.sign}</span></p>
        <p><strong className="text-purple-300">Ruling Planet:</strong> <span className="text-gray-200">{house.ruling_planet}</span></p>
        <p><strong className="text-purple-300">Degree:</strong> <span className="text-gray-200">{house.degree}</span></p>
        <p><strong className="text-purple-300">Significance:</strong> <span className="text-gray-200">{house.significance}</span></p>
        
        <div className="mt-3">
          <h5 className="text-purple-300 font-medium mb-2">Detailed Analysis</h5>
          <p className="text-gray-200">{house.detailed_analysis}</p>
        </div>

        {house.strengths && (
          <div className="mt-3">
            <h5 className="text-green-300 font-medium mb-2">Strengths</h5>
            <ul className="list-disc list-inside text-gray-200">
              {house.strengths.map((strength: string, index: number) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
        )}

        {house.challenges && (
          <div className="mt-3">
            <h5 className="text-red-300 font-medium mb-2">Challenges</h5>
            <ul className="list-disc list-inside text-gray-200">
              {house.challenges.map((challenge: string, index: number) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
        )}

        {house.aspects && (
          <div className="mt-3">
            <h5 className="text-blue-300 font-medium mb-2">Planetary Aspects</h5>
            <ul className="list-disc list-inside text-gray-200">
              {house.aspects.map((aspect: string, index: number) => (
                <li key={index}>{aspect}</li>
              ))}
            </ul>
          </div>
        )}

        {house.prediction && (
          <div className="mt-3">
            <h5 className="text-indigo-300 font-medium mb-2">Prediction</h5>
            <p className="text-gray-200">{house.prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseDetails;