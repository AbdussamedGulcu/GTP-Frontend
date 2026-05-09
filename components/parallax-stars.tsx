"use client"

import { useEffect, useRef } from "react"

export function ParallaxStars() {
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Different parallax speeds for depth effect
      // Distant stars move slowest (0.1x), closer stars move faster
      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${scrollY * 0.05}px)`
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${scrollY * 0.15}px)`
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translateY(${scrollY * 0.25}px)`
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Layer 1: Deepest/slowest stars */}
      <div 
        ref={layer1Ref}
        className="fixed inset-0 pointer-events-none z-0 will-change-transform"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(80, 15, 120, 0.35) 0%, transparent 45%),
            radial-gradient(ellipse at 70% 60%, rgba(52, 4, 77, 0.45) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 90%, rgba(45, 3, 70, 0.5) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 30%, rgba(90, 20, 140, 0.2) 0%, transparent 40%),
            radial-gradient(ellipse at 15% 70%, rgba(70, 10, 100, 0.25) 0%, transparent 45%)
          `
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.3), transparent),
              radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.22), transparent),
              radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.35), transparent),
              radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.25), transparent),
              radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.32), transparent),
              radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.2), transparent),
              radial-gradient(1px 1px at 200px 50px, rgba(255,255,255,0.35), transparent),
              radial-gradient(1px 1px at 220px 180px, rgba(255,255,255,0.28), transparent),
              radial-gradient(1px 1px at 260px 30px, rgba(255,255,255,0.24), transparent),
              radial-gradient(1px 1px at 300px 100px, rgba(255,255,255,0.38), transparent),
              radial-gradient(1px 1px at 340px 70px, rgba(255,255,255,0.22), transparent),
              radial-gradient(1px 1px at 380px 140px, rgba(255,255,255,0.32), transparent),
              radial-gradient(1px 1px at 420px 20px, rgba(255,255,255,0.28), transparent),
              radial-gradient(1px 1px at 460px 90px, rgba(255,255,255,0.35), transparent),
              radial-gradient(1px 1px at 500px 160px, rgba(255,255,255,0.25), transparent),
              radial-gradient(1px 1px at 540px 45px, rgba(255,255,255,0.3), transparent),
              radial-gradient(1px 1px at 580px 130px, rgba(255,255,255,0.24), transparent),
              radial-gradient(1px 1px at 620px 85px, rgba(255,255,255,0.34), transparent),
              radial-gradient(1px 1px at 660px 175px, rgba(255,255,255,0.28), transparent),
              radial-gradient(1px 1px at 700px 25px, rgba(255,255,255,0.32), transparent)
            `,
            backgroundSize: '750px 200px',
            animation: 'twinkle-slow 12s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Layer 2: Mid-distance stars */}
      <div 
        ref={layer2Ref}
        className="fixed inset-0 pointer-events-none z-0 will-change-transform"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 100px 200px, rgba(255,255,255,0.5), transparent),
              radial-gradient(1.5px 1.5px at 240px 150px, rgba(255,255,255,0.42), transparent),
              radial-gradient(1.5px 1.5px at 360px 220px, rgba(255,255,255,0.52), transparent),
              radial-gradient(1.5px 1.5px at 480px 100px, rgba(255,255,255,0.4), transparent),
              radial-gradient(1.5px 1.5px at 560px 180px, rgba(255,255,255,0.48), transparent),
              radial-gradient(1.5px 1.5px at 640px 50px, rgba(255,255,255,0.42), transparent),
              radial-gradient(1.5px 1.5px at 720px 130px, rgba(255,255,255,0.5), transparent),
              radial-gradient(1.5px 1.5px at 800px 200px, rgba(255,255,255,0.38), transparent),
              radial-gradient(1.5px 1.5px at 60px 170px, rgba(255,255,255,0.45), transparent),
              radial-gradient(1.5px 1.5px at 180px 210px, rgba(255,255,255,0.48), transparent),
              radial-gradient(1.5px 1.5px at 300px 30px, rgba(255,255,255,0.4), transparent),
              radial-gradient(1.5px 1.5px at 420px 160px, rgba(255,255,255,0.45), transparent),
              radial-gradient(1.5px 1.5px at 540px 90px, rgba(255,255,255,0.48), transparent)
            `,
            backgroundSize: '900px 250px',
            animation: 'twinkle-fast 8s ease-in-out infinite alternate-reverse'
          }}
        />
      </div>

      {/* Layer 3: Closest/fastest stars with color accents */}
      <div 
        ref={layer3Ref}
        className="fixed inset-0 pointer-events-none z-0 will-change-transform"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 180px 80px, rgba(200,220,255,0.7), transparent),
              radial-gradient(2px 2px at 400px 180px, rgba(255,240,220,0.65), transparent),
              radial-gradient(2px 2px at 620px 120px, rgba(220,200,255,0.68), transparent),
              radial-gradient(2px 2px at 840px 60px, rgba(200,255,240,0.6), transparent),
              radial-gradient(2px 2px at 260px 220px, rgba(255,230,200,0.62), transparent),
              radial-gradient(2px 2px at 520px 40px, rgba(200,230,255,0.68), transparent),
              radial-gradient(1.5px 1.5px at 35px 90px, rgba(255,255,255,0.55), transparent),
              radial-gradient(1.5px 1.5px at 75px 20px, rgba(255,255,255,0.48), transparent),
              radial-gradient(1.5px 1.5px at 115px 140px, rgba(255,255,255,0.52), transparent),
              radial-gradient(1.5px 1.5px at 155px 60px, rgba(255,255,255,0.58), transparent),
              radial-gradient(1.5px 1.5px at 195px 110px, rgba(255,255,255,0.45), transparent),
              radial-gradient(1.5px 1.5px at 235px 190px, rgba(255,255,255,0.52), transparent)
            `,
            backgroundSize: '900px 280px',
            animation: 'twinkle-fast 6s ease-in-out infinite alternate'
          }}
        />
      </div>
    </>
  )
}
