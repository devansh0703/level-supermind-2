import React, { useState } from 'react';
import { Scroll, Gem, Sparkles, Moon, Brain, Dumbbell, BedDouble, ChevronDown, ChevronUp } from 'lucide-react';
import KundaliChart from './KundaliChart';
import HouseDetails from './HouseDetails';
import PlanetaryDetails from './PlanetaryDetails';

interface GuidanceDisplayProps {
  data: any;
  userInput: any;
}

const GuidanceDisplay: React.FC<GuidanceDisplayProps> = ({ data, userInput }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    birthChart: true,
    houses: false,
    planets: false,
    recommendations: true,
    spiritual: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ title, section, icon: Icon }: { title: string; section: string; icon: any }) => (
    <div 
      className="flex items-center justify-between cursor-pointer py-2"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center space-x-2">
        <Icon className="h-6 w-6 text-yellow-300" />
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="h-5 w-5 text-yellow-300" />
      ) : (
        <ChevronDown className="h-5 w-5 text-yellow-300" />
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Birth Chart Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <SectionHeader title="Birth Chart Analysis" section="birthChart" icon={Scroll} />
        {expandedSections.birthChart && (
          <>
            <div className="mt-6">
              <KundaliChart 
                houses={data.birthChart.houses} 
                planetaryPositions={data.birthChart.planetary_positions} 
              />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Daily Horoscope</h3>
                <div className="space-y-4">
                  <p className="text-gray-200"><strong>General:</strong> {data.birthChart.dailyHoroscope.general}</p>
                  <p className="text-gray-200"><strong>Love:</strong> {data.birthChart.dailyHoroscope.love}</p>
                  <p className="text-gray-200"><strong>Career:</strong> {data.birthChart.dailyHoroscope.career}</p>
                  <p className="text-gray-200"><strong>Health:</strong> {data.birthChart.dailyHoroscope.health}</p>
                  <div className="mt-4">
                    <h4 className="font-medium text-yellow-300">Lucky Elements</h4>
                    <p className="text-gray-200">Color: {data.birthChart.dailyHoroscope.lucky.color}</p>
                    <p className="text-gray-200">Number: {data.birthChart.dailyHoroscope.lucky.number}</p>
                    <p className="text-gray-200">Direction: {data.birthChart.dailyHoroscope.lucky.direction}</p>
                    <p className="text-gray-200">Best Time: {data.birthChart.dailyHoroscope.lucky.time}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">Monthly Overview</h3>
                <p className="text-gray-200 mb-4">{data.birthChart.monthlyHoroscope.overview}</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-300">Major Transits</h4>
                    {data.birthChart.monthlyHoroscope.major_transits.map((transit: any, index: number) => (
                      <div key={index} className="mb-2">
                        <p className="text-gray-200">
                          <strong>{transit.planet}:</strong> {transit.effect} ({transit.dates})
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300">Focus Areas</h4>
                    <ul className="list-disc list-inside text-gray-200">
                      {data.birthChart.monthlyHoroscope.focus_areas.map((area: string, index: number) => (
                        <li key={index}>{area}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Houses Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <SectionHeader title="Houses Analysis" section="houses" icon={Moon} />
        {expandedSections.houses && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(data.birthChart.houses).map(([house, details]: [string, any]) => (
              <HouseDetails 
                key={house} 
                house={details} 
                houseNumber={parseInt(house.replace('house', ''))} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Planetary Positions Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <SectionHeader title="Planetary Positions" section="planets" icon={Sparkles} />
        {expandedSections.planets && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(data.birthChart.planetary_positions).map(([planet, details]: [string, any]) => (
              <PlanetaryDetails key={planet} planet={planet} details={details} />
            ))}
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <SectionHeader title="Recommendations" section="recommendations" icon={Gem} />
        {expandedSections.recommendations && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-3">Gemstones</h3>
              {data.recommendations.gemstones.map((gem: any, index: number) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium text-yellow-300">{gem.name}</h4>
                  <p className="text-sm text-gray-200"><strong>Benefits:</strong> {gem.benefits}</p>
                  <p className="text-sm text-gray-200"><strong>Instructions:</strong> {gem.wearing_instructions}</p>
                  <p className="text-sm text-gray-200"><strong>Timing:</strong> {gem.best_timing}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Rituals</h3>
              {data.recommendations.rituals.map((ritual: any, index: number) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium text-purple-300">{ritual.name}</h4>
                  <p className="text-sm text-gray-200"><strong>Benefits:</strong> {ritual.benefits}</p>
                  <p className="text-sm text-gray-200"><strong>Procedure:</strong> {ritual.procedure}</p>
                  {ritual.mantras && (
                    <div className="mt-2">
                      <strong className="text-sm text-gray-200">Mantras:</strong>
                      <ul className="list-disc list-inside text-sm text-gray-200">
                        {ritual.mantras.map((mantra: string, idx: number) => (
                          <li key={idx}>{mantra}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Do's and Don'ts</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-300">Do's</h4>
                  <ul className="list-disc list-inside text-sm text-gray-200">
                    {data.recommendations.dosAndDonts.do.map((item: any, index: number) => (
                      <li key={index}>
                        {item.practice}
                        <br />
                        <span className="text-xs text-gray-400">Why: {item.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-300">Don'ts</h4>
                  <ul className="list-disc list-inside text-sm text-gray-200">
                    {data.recommendations.dosAndDonts.dont.map((item: any, index: number) => (
                      <li key={index}>
                        {item.practice}
                        <br />
                        <span className="text-xs text-gray-400">Why: {item.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spiritual Practices Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <SectionHeader title="Spiritual Practices" section="spiritual" icon={Sparkles} />
        {expandedSections.spiritual && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="h-5 w-5 text-blue-300" />
                <h3 className="text-xl font-medium">Meditation</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-200">
                  <strong>Practice:</strong> {data.spiritualContent.meditation.recommended_practice}
                </p>
                <p className="text-gray-200">
                  <strong>Duration:</strong> {data.spiritualContent.meditation.duration}
                </p>
                <p className="text-gray-200">
                  <strong>Best Time:</strong> {data.spiritualContent.meditation.best_time}
                </p>
                <div className="mt-4">
                  <h4 className="font-medium text-blue-300">Techniques</h4>
                  {data.spiritualContent.meditation.techniques.map((technique: any, index: number) => (
                    <div key={index} className="mt-2">
                      <p className="text-sm text-gray-200">
                        <strong>{technique.name}</strong> ({technique.duration})
                        <br />
                        {technique.instructions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Dumbbell className="h-5 w-5 text-green-300" />
                <h3 className="text-xl font-medium">Yoga</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-200">
                  <strong>Duration:</strong> {data.spiritualContent.workout.duration}
                </p>
                <p className="text-gray-200">
                  <strong>Best Time:</strong> {data.spiritualContent.workout.best_time}
                </p>
                <div className="mt-4">
                  <h4 className="font-medium text-green-300">Asanas</h4>
                  {data.spiritualContent.workout.asanas.map((asana: any, index: number) => (
                    <div key={index} className="mt-2">
                      <p className="text-sm text-gray-200">
                        <strong>{asana.name}</strong> ({asana.duration})
                        <br />
                        Benefits: {asana.benefits}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <BedDouble className="h-5 w-5 text-indigo-300" />
                <h3 className="text-xl font-medium">Sleep</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-200">
                  <strong>Recommended Hours:</strong> {data.spiritualContent.sleep.recommended_hours}
                </p>
                <p className="text-gray-200">
                  <strong>Ideal Sleep Time:</strong> {data.spiritualContent.sleep.ideal_sleep_time}
                </p>
                <p className="text-gray-200">
                  <strong>Ideal Wake Time:</strong> {data.spiritualContent.sleep.ideal_wake_time}
                </p>
                <div className="mt-4">
                  <h4 className="font-medium text-indigo-300">Rituals</h4>
                  {data.spiritualContent.sleep.rituals.map((ritual: any, index: number) => (
                    <div key={index} className="mt-2">
                      <p className="text-sm text-gray-200">
                        <strong>{ritual.name}</strong> ({ritual.duration})
                        <br />
                        {ritual.technique || ritual.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidanceDisplay;