import styles from '../styles/Index.module.scss';
import MainLayout from "@/layouts/MainLayout";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import {GLTF} from "three-stdlib";

// Add type for the Props of Computers component
interface ComputersProps {
    isMobile: boolean;
}

const Computers: React.FC<ComputersProps> = ({ isMobile }) => {
    const computer = useGLTF('3dmodel/scene.gltf') as GLTF;

    return (
        <mesh>
            {/* Lights */}
            <hemisphereLight intensity={0.8} groundColor="black" />
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={10}
                castShadow
                shadow-mapSize={1024}
            />
            <pointLight intensity={10} position={[0, 10, 0]} />

            {/* Model */}
            <primitive
                object={computer.scene}
                scale={isMobile ? 0.5 : 1}  // Adjust the scale
                position={isMobile ? [0, -3, -0.2] : [0, -3.25, 0]}
                rotation={[-0.01, 0.5, -0.1]}
            />
        </mesh>
    );
};


// Add type for the Props of Avatar component
interface AvatarProps {}

export const Avatar: React.FC<AvatarProps> = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 100px)');

        setIsMobile(mediaQuery.matches);

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            frameloop="demand"
            shadows
            dpr={[1, 2]}
            camera={{ position: [600, 0, 10], fov: 60 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense>
                <OrbitControls
                    enableZoom={false}
                    enableRotate
                    maxPolarAngle={Math.PI} // Allow rotation above and below the horizon
                    minPolarAngle={0}
                />
                <Computers isMobile={isMobile} />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

const Index = () => {
    return (
        <>
            <MainLayout>
                <div className={styles.center}>
                    <h1>Welcome!</h1>
                    <h3>Here are the best tracks!</h3>
                    <div style={{ width: '100vw', height: '100vh'}}>
                        <Avatar/>
                    </div>
                </div>
            </MainLayout>

        </>

    );
};

export default Index;