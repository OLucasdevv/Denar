import { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÕES — edite aqui
// ─────────────────────────────────────────────────────────────────────────────

// Coloque dashboard.png em: public/images/dashboard.png
const DASHBOARD_IMAGE = "dashboard.png";

// Nome do material da tela (identificado via gltf.report)
const SCREEN_MATERIAL_NAME = "Material.002";

// Tamanho do modelo — aumente para ficar maior
const MODEL_SCALE = 8.5;

// Posição vertical — negativo desce, positivo sobe
const MODEL_Y = -0.5;
const MODEL_X = 0.8;

// ─────────────────────────────────────────────────────────────────────────────
// MODELO 3D
// ─────────────────────────────────────────────────────────────────────────────
function MacbookModel() {
  const { scene, animations } = useGLTF("/models/macbook_pro_13_inch_2020-v1.glb");
  const { mixer }             = useAnimations(animations, scene);

  // Carrega o PNG do dashboard diretamente
  const dashTexture = useTexture(DASHBOARD_IMAGE);

  useEffect(() => {
    if (!scene) return;
    scene.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);
    scene.position.set(0, MODEL_Y, MODEL_X);
    scene.rotation.y = -0.10;
   

  }, [scene]);

  useEffect(() => {
    if (!scene || !dashTexture) return;

    // Configurações da textura PNG
    dashTexture.flipY= true; // GLB usa UV invertido — não mude isso
    dashTexture.colorSpace  = THREE.SRGBColorSpace;
    dashTexture.needsUpdate = true;
    dashTexture.anisotropy = 16;
dashTexture.minFilter = THREE.LinearMipmapLinearFilter;
dashTexture.magFilter = THREE.LinearFilter;

    // Aplica o PNG na tela do MacBook
    let found = false;
    scene.traverse((obj) => {
      if (!obj.isMesh) return;

      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((mat, idx) => {
        if (mat?.name === SCREEN_MATERIAL_NAME) {
          const screenMat = new THREE.MeshBasicMaterial({ map: dashTexture });
          if (Array.isArray(obj.material)) {
            obj.material[idx] = screenMat;
          } else {
            obj.material = screenMat;
          }
          found = true;
        }
      });
    });

    if (!found) {
      console.warn(
        `[DenarMacbook] Material "${SCREEN_MATERIAL_NAME}" não encontrado.\n` +
        "Abra o .glb em gltf.report → aba Materials e veja o nome exato."
      );
    }

    // ── Pula animação pro MacBook já aberto ──
    if (animations.length > 0) {
      const clip   = animations[0];
      const action = mixer.clipAction(clip);

      // Opção A — aparece já aberto, sem animação (padrão)
      action.play();
      mixer.setTime(170);
      action.paused = true;

      // Opção B — abre uma vez ao carregar e trava aberto (mais bonito)
      // Comente a Opção A acima e descomente as 3 linhas abaixo:
      //
      // action.setLoop(THREE.LoopOnce);
      // action.clampWhenFinished = true;
      // action.play();
    }
  }, [scene, animations, mixer, dashTexture]);

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  return <primitive object={scene} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// CENA — parallax de mouse e float
// ─────────────────────────────────────────────────────────────────────────────
function Scene() {
  const groupRef  = useRef();
  const mouseRef  = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const s     = smoothRef.current;
    const m     = mouseRef.current;
    const lerpF = 1 - Math.pow(0.04, delta);
    s.x += (m.x - s.x) * lerpF;
    s.y += (m.y - s.y) * lerpF;

    groupRef.current.rotation.y = s.x * 0.12;
    groupRef.current.rotation.x = -s.y * 0.04;
    groupRef.current.position.y = Math.sin(Date.now() * 0.0008) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <MacbookModel />
      </Suspense>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE EXPORTADO
// Uso: <DenarMacbook /> onde estava o card "Ritmo de Gastos"
// ─────────────────────────────────────────────────────────────────────────────
export default function DenarMacbook() {
  return (
    <div style={{ width: "100%", height: "600px", background: "transparent" }}>
      <Canvas
        camera={{ position: [0, 0.8, 4.5], fov: 38, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 10, 8]}  intensity={2.8} color="#fff5e8" />
        <directionalLight position={[-6, -3, 3]} intensity={1.0} color="#d4e8ff" />
        <directionalLight position={[0, -6, -4]} intensity={0.6} color="#ffe0c0" />
        <pointLight position={[1.5, 6, 4]} intensity={1.2} color="#fff0e0" distance={14} />
        <Environment preset="city" />
        <Scene />
      </Canvas>
    </div>
  );
}