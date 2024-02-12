import { BufferGeometry } from "three"

declare class LOLLoader {
  async load (champion: string, skin: number, options: { enableTexture?: boolean, setFrame?: number, animName?: string }): Promise<Model>
}

declare class Model {
  constructor(
    champion: string,
    skin: number,
    setFrame?: number,
    enableTexture?: boolean)
  setAnimationOnce: (name: string) => void
  setAnimation: (name: string) => void
  setDefaultAnimation: () => void
  toggleAnimation: () => void
  getAnimations: () => null | string[]
  update: (time: number) => void
  setFrame: number
  animName: string
  meshUrl: string
  geometry: BufferGeometry
  material: MeshPhongMaterial
  enableTexture: boolean
  rotation: {
    x: number
    y: number
    z: number
  }
  position: {
    x: number
    y: number
    z: number
  }
}

declare class MeshLoL extends THREE.Mesh {
  userData: {
    type: string,
    model: Model,
    animations: string[],
  }
}

export { LOLLoader, MeshLoL, Model }
