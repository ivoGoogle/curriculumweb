import { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const PaperExplosion = ({ position, color, color2, color3 }) => {
  const [explosions, setExplosions] = useState([]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Agregar una nueva explosión cada vez que cambia la posición
  useState(() => {
    setExplosions((prev) => [...prev, { id: Date.now(), position }]);
  }, [position]);

  return (
    <>
      {explosions.map((explosion) => (
        <Particles
          key={explosion.id}
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: { color: "#007e7d" },
            particles: {
              number: { value: 150 },
              color: { value: [color, color2, color3] },
              shape: { type: "polygon", polygon: { sides: 4 } },
              opacity: { value: 1, anim: { enable: true, speed: 10, opacity_min: 0 } },
              size: { value: 4, random: true },
              move: {
                enable: true,
                speed: 15,
                direction: "none",
                random: true,
                straight: false,
                outModes: { top: "destroy", bottom: "destroy", left: "destroy", right: "destroy" },
                angle: { value: [120, 360] },
              },
              life: { duration: { sync: false, value: 1.5 } },
            },
            emitters: {
              position: { x: explosion.position, y: explosion.position },
              rate: { delay: 0, quantity: 95 },
              size: { width: 0, height: 0 },
            },
          }}
        />
      ))}
    </>
  );
};

export default PaperExplosion;
