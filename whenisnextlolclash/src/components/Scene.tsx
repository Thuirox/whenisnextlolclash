import { Suspense } from 'react'
import { PCFSoftShadowMap, Vector3 } from 'three'
import { Canvas } from '@react-three/fiber'

import './Scene.css'

import Ground from './Ground'
import CentralLight from './CentralLight'
import ChampionGroup from './ChampionGroup'
import { EffectComposer, Outline, Selection } from '@react-three/postprocessing'

function Scene() {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ fov: 45, aspect: window.innerWidth / window.innerHeight, near: 150, far: 2000, position: new Vector3(0, 200, 700) }}
        shadows={{ enabled: true, type: PCFSoftShadowMap }}
        dpr={window.devicePixelRatio}>
        <Selection>
          <Suspense fallback={null}>
            <ChampionGroup />
            <Ground />
            <CentralLight />
          </Suspense>

          {/* <Stats /> */}

          <EffectComposer autoClear={false}>
            <Outline
              edgeStrength={5}
              visibleEdgeColor={0x796239}
              hiddenEdgeColor={0x22090a}
              blur={true}
              xRay={true}
            />
          </EffectComposer>
        </Selection>
      </Canvas>
    </div>
  )
}

export default Scene
