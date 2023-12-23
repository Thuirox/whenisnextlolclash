const aatroxChannel = {
  championKey: "266",
  skinIndex: 0,
  position: {
    x: -236.36014641549866,
    y: 0,
    z: 33.23810374073747
  },
  rotation: {
    x: 0,
    y: 1.6,
    z: 0
  },
  enableTexture: true,
  animName: "channel",
  cameraOffset: {
    y: 200,
    x: 0,
    z: 200,
  },
  targetOffset: {
    y: 0,
  }
}

const azirChannel = {
  championKey: "268",
  skinIndex: 0,
  position: {
    x: 251.0231229354522,
    y: -1.0445495937862574,
    z: -7.901080260691003
  },
  rotation: {
    x: 0,
    y: -1.6,
    z: 0
  },
  enableTexture: true,
  animName: "channel",
  cameraOffset: {
    y: 200,
    x: 100,
    z: 200,
  },
  targetOffset: {
    y: 100,
  }
}

const karmaChannel = {
  championKey: "43",
  skinIndex: 0,
  position: {
    x: 0,
    y: -1.0445495937862574,
    z: -180.93402374787968
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0
  },
  enableTexture: true,
  animName: "channel"
}

const sceneChannels = {
  champions: [
    aatroxChannel,
    karmaChannel,
    azirChannel
  ]
}

const aurelionSol: ChampionConfig = {
  championKey: "136",
  skinIndex: 1,
  position: {
    x: -28.47067226140524,
    y: -12.668511740023234,
    z: -108.65994107668962
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0
  },
  animName: "idle1",
  enableTexture: true,
  cameraOffset: {
    y: 300,
    x: 400,
    z: 200,
  },
  targetOffset: {
    y: 100,
  }
}

const aatroxIdle = {
  championKey: "266",
  skinIndex: 3,
  position: {
    x: -200,
    y: 0,
    z: -100
  },
  rotation: {
    x: 0,
    y: 1.2,
    z: 0
  },
  animName: "idle3_base",
  enableTexture: true
}

const ahriIdle = {
  championKey: "103",
  skinIndex: 2,
  position: {
    x: 149.79912507811804,
    y: -1.0445495937862574,
    z: -30
  },
  rotation: {
    x: 0,
    y: 4.853888265603514,
    z: 0
  },
  animName: "idle1",
  enableTexture: true
}

const sceneAatroxAhri = {
  champions: [
    aatroxIdle,
    ahriIdle
  ]
}

const amumuCrying = {
  championKey: '32',
  skinIndex: 0,
  position: {
    x: 0,
    y: 0,
    z: -50
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0
  },
  animName: 'taunt',
  enableTexture: true
}

const heimerRunning = {
  championKey: '74',
  skinIndex: 2,
  position: {
    x: 0,
    y: 0,
    z: 80
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0
  },
  animName: 'run_swag',
  animationSpeed: 100,
  enableTexture: true,
  cameraOffset: {
    y: 150,
    x: 0,
    z: 700,
  }
}

export interface SceneConfig {
  champions: ChampionConfig[]
  resetCamera?: boolean
}

interface vector {
  x: number
  y: number
  z: number
}
interface vectorOptionnal {
  x?: number
  y?: number
  z?: number
}

export interface ChampionConfig {
  championKey: string
  skinIndex: number
  position: vector
  rotation: vector
  setFrame?: number
  animName?: string
  animationSpeed?: number
  enableTexture?: boolean
  cameraOffset?: vectorOptionnal
  targetOffset?: vectorOptionnal
}

export function getSceneConfig(nbChampions: number): SceneConfig | null {
  if (nbChampions in scenesConfig) {
    return scenesConfig[nbChampions]
  }

  return null
}

export function getSceneOops(): SceneConfig {
  return scenesConfig.oops
}

export const scenesConfig: Record<string, SceneConfig> = {
  0: {
    champions: [ amumuCrying ]
  },
  1: {
    champions: [ aurelionSol ]
  },
  2: sceneAatroxAhri,
  3: sceneChannels,
  oops: {
    champions: [ heimerRunning ],
    resetCamera: true
  }
}
