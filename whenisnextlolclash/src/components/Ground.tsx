
import { useLoader } from '@react-three/fiber'
import { MeshPhongMaterial, TextureLoader } from 'three'

function Ground() {
  const texture = useLoader(TextureLoader, '/assets/bg.png')

  const material = new MeshPhongMaterial({
    depthWrite: true,
    map: texture
  })

  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow material={material}>
      <circleGeometry args={[300, 100]} />
    </mesh>
  )
}

export default Ground
