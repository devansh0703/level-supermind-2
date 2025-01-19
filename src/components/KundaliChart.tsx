import React from 'react';

interface KundaliChartProps {
  houses: any;
  planetaryPositions: any;
}

const KundaliChart: React.FC<KundaliChartProps> = ({ houses, planetaryPositions }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square">
      {/* Main square */}
      <div className="absolute inset-0 border-2 border-yellow-300/50">
        {/* Diagonal lines */}
        <div className="absolute inset-0 transform rotate-45 border-2 border-yellow-300/50"></div>
        <div className="absolute inset-0 transform -rotate-45 border-2 border-yellow-300/50"></div>
        
        {/* Inner square */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-yellow-300/50"></div>

        {/* House numbers and planetary positions */}
        {/* House 1 - Ascendant */}
        <div className="absolute top-0 right-1/4 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 1</div>
            <div>{houses.house1.sign}</div>
            <div className="text-xs">{houses.house1.degree}</div>
          </div>
        </div>

        {/* House 2 */}
        <div className="absolute top-0 right-0 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 2</div>
            <div>{houses.house2.sign}</div>
            <div className="text-xs">{houses.house2.degree}</div>
          </div>
        </div>

        {/* House 3 */}
        <div className="absolute top-1/4 right-0 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 3</div>
            <div>{houses.house3?.sign || "N/A"}</div>
            <div className="text-xs">{houses.house3?.degree || ""}</div>
          </div>
        </div>

        {/* House 4 */}
        <div className="absolute top-1/2 right-0 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 4</div>
            <div>{houses.house4?.sign || "N/A"}</div>
            <div className="text-xs">{houses.house4?.degree || ""}</div>
          </div>
        </div>

        {/* House 5 */}
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 5</div>
            <div>{houses.house5?.sign || "N/A"}</div>
            <div className="text-xs">{houses.house5?.degree || ""}</div>
          </div>
        </div>

        {/* House 6 */}
        <div className="absolute bottom-0 right-1/4 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 6</div>
            <div>{houses.house6?.sign || "N/A"}</div>
            <div className="text-xs">{houses.house6?.degree || ""}</div>
          </div>
        </div>

        {/* House 7 */}
        <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 7</div>
            <div>{houses.house7?.sign || "N/A"}</div>
            <div className="text-xs">{houses.house7?.degree || ""}</div>
          </div>
        </div>

        {/* House 8 */}
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 8</div>
            <div>{houses.house8?.sign || "N/A"}</div>
            <div className="text-xs">{houses.house8?.degree || ""}</div>
          </div>
        </div>

        {/* House 9 */}
        <div className="absolute bottom-1/2 left-0 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 9</div>
            <div>{houses.house9?.sign || "N/A"}</div>
            <div className="text-xs">{houses.house9?.degree || ""}</div>
          </div>
        </div>

        {/* House 10 */}
        <div className="absolute top-1/4 left-0 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 10</div>
            <div>{houses.house10?.sign || "N/A"}</div>
            <div className="text-xs">{houses.house10?.degree || ""}</div>
          </div>
        </div>

        {/* House 11 */}
        <div className="absolute top-0 left-0 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 11</div>
            <div>{houses.house11?.sign || "N/A"}</div>
            <div className="text-xs">{houses.house11?.degree || ""}</div>
          </div>
        </div>

        {/* House 12 */}
        <div className="absolute top-0 left-1/4 w-1/4 h-1/4 flex items-center justify-center">
          <div className="text-yellow-300 text-sm">
            <div className="font-bold">House 12</div>
            <div>{houses.house12?.sign || "N/A"}</div>
            <div className="text-xs">{houses.house12?.degree || ""}</div>
          </div>
        </div>

        {/* Center area for planetary positions */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex items-center justify-center">
          <div className="text-center text-yellow-300 text-xs space-y-1">
            {Object.entries(planetaryPositions).map(([planet, data]: [string, any]) => (
              <div key={planet}>
                {planet.charAt(0).toUpperCase() + planet.slice(1)}: {data.sign} {data.degree}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KundaliChart;