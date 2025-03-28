"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Define the team member type
interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

export default function TeamCarousel() {
  // Sample team data - replace with your actual team data
  const teamMembers: TeamMember[] = [
    { name: "Navya Gupta", role: "President", imageUrl: "/team/Navya.jpg" },
    { name: "Mukul Gupta", role: "Vice President", imageUrl: "/team/Mukul.jpg" },
    { name: "Ganeev", role: "Technical Lead", imageUrl: "/team/Ganeev.jpg" },
    { name: "Shreyansh Raj", role: "Event Manager", imageUrl: "/team/Shreyansh.jpg" },
    { name: "Tanishka Guru", role: "Design Lead", imageUrl: "/team/Tanishka.jpg" },
    { name: "Toshika Goswami", role: "Social Media Lead", imageUrl: "/team/Toshika.jpg" },
    { name: "Nitin Sounkaria", role: "Content Lead", imageUrl: "/team/Nitin.jpg" },
    { name: "Zaynah", role: "Outreach Lead", imageUrl: "/team/Zaynah.jpg" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  // Auto rotate effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % teamMembers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [teamMembers.length]);

  return (
    <div className="relative w-full overflow-hidden bg-black py-16 min-h-[calc(100vh-64px)] mt-16 flex flex-col items-center justify-center z-10">
      {/* Base Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-green-800 via-blue-900 to-black" />
      
      {/* Additional Gradient Layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.emerald.500),transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,theme(colors.blue.500),transparent_50%)] opacity-20" />
      </div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-l from-emerald-800 via-blue-400 to-emerald-800 bg-clip-text text-transparent relative z-10">Meet the Team</h2>
      
      {/* Increased vertical space for the carousel */}
      <div className="relative w-full h-96 mt-24 mb-32">
        {teamMembers.map((member, index) => {
          // Calculate position in a more spread out circle
          const totalCards = teamMembers.length;
          // Adjust the current position based on active index
          const adjustedIndex = (index - activeIndex + totalCards) % totalCards;
          
          // Position cards in a full circle around the center
          const startAngle = Math.PI / 2; // Start at bottom (90 degrees)
          const angle = startAngle + (adjustedIndex / totalCards) * 2 * Math.PI;
          
          // Radius is how far from center the cards will be
          const radius = 36; // slightly reduced to keep cards more compact
          
          // Calculate x and y positions based on angle
          const x = 50 + radius * Math.cos(angle); // center + radius * cos(angle)
          const y = 50 + radius * Math.sin(angle); // center + radius * sin(angle)
          
          // Scale based on position - make active card larger
          const isActive = adjustedIndex === 0;
          const distanceFromActive = Math.min(adjustedIndex, totalCards - adjustedIndex);
          // Increase scale for active element to make it more prominent
          const scale = isActive ? 1.3 : 0.7 - (distanceFromActive * 0.05);
          
          // z-index to control which cards appear on top - keep lower than header
          const zIndex = 40 - distanceFromActive;
          
          return (
            <motion.div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              initial={false}
              animate={{
                left: `${x}%`,
                top: `${y}%`,
                scale: scale,
                zIndex: zIndex,
                opacity: isActive ? 1 : 0.7,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onClick={() => setActiveIndex(index)}
            >
              <div className={`${isActive ? 'w-60' : 'w-50'} rounded-xl shadow-lg overflow-hidden cursor-pointer bg-black/80 backdrop-blur-sm border border-emerald-800/50`}>
                <div className={`${isActive ? 'h-60' : 'h-50'}`}>
                  <div className="bg-gradient-to-b from-blue-900 to-emerald-900 w-full h-full flex items-center justify-center">
                    {/* Placeholder for image - replace with actual image */}
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${member.imageUrl})` }}>
                      {/* Fallback if image doesn't load */}
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">
                        {!member.imageUrl && member.name.substring(0, 1)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-black/70 backdrop-blur-sm">
                  <h3 className={`font-bold bg-gradient-to-l from-emerald-600 via-blue-400 to-emerald-600 bg-clip-text text-transparent ${isActive ? 'text-xl' : 'text-lg'}`}>{member.name}</h3>
                  <p className="text-emerald-300">{member.role}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Enhanced navigation dots with fancy animations */}
      <div className="flex justify-center mt-20 gap-4 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full shadow-md border border-emerald-800/30">
        {teamMembers.map((_, index) => {
          const isActive = activeIndex === index;
          const isHovered = hoveredDot === index;
          
          return (
            <motion.button
              key={index}
              className="relative focus:outline-none"
              onMouseEnter={() => setHoveredDot(index)}
              onMouseLeave={() => setHoveredDot(null)}
              onClick={() => setActiveIndex(index)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-gray-700"
                initial={false}
                animate={{
                  backgroundColor: isActive ? "#10b981" : isHovered ? "#0ea5e9" : "#374151",
                  scale: isActive ? 1 : isHovered ? 1.2 : 1,
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut" 
                }}
              />
              
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-500 -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeOut", 
                    repeat: Infinity,
                    repeatDelay: 0.5 
                  }}
                />
              )}
              
              {isActive && (
                <motion.div 
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '20px' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  )
}