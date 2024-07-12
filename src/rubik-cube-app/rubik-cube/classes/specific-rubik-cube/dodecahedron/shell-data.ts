import * as THREE from 'three';
import type {
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
  TDodecahedronShellFilename,
  TDodecahedronShellPieces,
  TDodecahedronShellDirections,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { AbstractRubikCubeShellData } from '../shell-data';

export class RubikDodecahedronShellData extends AbstractRubikCubeShellData<
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
  TDodecahedronShellFilename,
  TDodecahedronShellPieces,
  TDodecahedronShellDirections,
  'Clockwise',
  'CounterClockwise'
> {
  protected readonly ordinaryRotationName: 'Clockwise' = 'Clockwise';
  protected readonly invertedRotationName: 'CounterClockwise' = 'CounterClockwise';
  protected readonly directions: Record<TDodecahedronShellDirections, THREE.Vector3> = {
    DirectionA: new THREE.Vector3(0, -0.86, -0.53),
    DirectionB: new THREE.Vector3(0, 0.53, -0.86),
    DirectionC: new THREE.Vector3(0.31, 0, -0.95),
    DirectionD: new THREE.Vector3(0.31, 0, 0.95),
    DirectionE: new THREE.Vector3(0.31, -0.86, 0.425),
    DirectionF: new THREE.Vector3(-0.31, -0.86, 0.425),
    DirectionG: new THREE.Vector3(-0.31, 0.86, 0.425),
    DirectionH: new THREE.Vector3(0.53, -0.53, -0.69),
    DirectionI: new THREE.Vector3(0.53, 0.53, 0.69),
    DirectionJ: new THREE.Vector3(-0.53, -0.86, -0.17),
    DirectionK: new THREE.Vector3(0.53, -0.86, -0.17),
    DirectionL: new THREE.Vector3(-0.81, 0, -0.59),
    DirectionM: new THREE.Vector3(-0.81, 0, 0.59),
    DirectionN: new THREE.Vector3(0.81, -0.53, 0.26),
    DirectionO: new THREE.Vector3(0.81, 0.53, -0.26),
    DirectionP: new THREE.Vector3(1, 0, 0),
  };

  public readonly filename: TDodecahedronShellFilename = 'RubikDodecahedronShell.glb';
  public readonly piecesData: Record<
    TDodecahedronShellPieces,
    TShellPieceData<TDodecahedronRotationGroups, TDodecahedronRotationTypes>
  > = {
    Up0: this.createPieceRotationData([['DirectionP', 'Front']]),
    Up1: this.createPieceRotationData([
      ['DirectionP', 'Front'],
      ['DirectionC', 'Right'],
    ]),
    Up2: this.createPieceRotationData([['DirectionC', 'Right']]),
    Up3: this.createPieceRotationData([
      ['DirectionC', 'Right'],
      ['DirectionL', 'UpRight'],
    ]),
    Up4: this.createPieceRotationData([['DirectionL', 'UpRight']]),
    Up5: this.createPieceRotationData([
      ['DirectionL', 'UpRight'],
      ['DirectionM', 'UpLeft'],
    ]),
    Up6: this.createPieceRotationData([['DirectionM', 'UpLeft']]),
    Up7: this.createPieceRotationData([
      ['DirectionM', 'UpLeft'],
      ['DirectionD', 'Left'],
    ]),
    Up8: this.createPieceRotationData([['DirectionD', 'Left']]),
    Up9: this.createPieceRotationData([
      ['DirectionD', 'Left'],
      ['DirectionP', 'Front'],
    ]),
    Up10: [],
    Down0: this.createPieceRotationData([['DirectionP', 'Back']]),
    Down1: this.createPieceRotationData([
      ['DirectionP', 'Back'],
      ['DirectionD', 'BackRight'],
    ]),
    Down2: this.createPieceRotationData([['DirectionD', 'BackRight']]),
    Down3: this.createPieceRotationData([
      ['DirectionD', 'BackRight'],
      ['DirectionM', 'DownRight'],
    ]),
    Down4: this.createPieceRotationData([['DirectionM', 'DownRight']]),
    Down5: this.createPieceRotationData([
      ['DirectionM', 'DownRight'],
      ['DirectionL', 'DownLeft'],
    ]),
    Down6: this.createPieceRotationData([['DirectionL', 'DownLeft']]),
    Down7: this.createPieceRotationData([
      ['DirectionL', 'DownLeft'],
      ['DirectionC', 'BackLeft'],
    ]),
    Down8: this.createPieceRotationData([['DirectionC', 'BackLeft']]),
    Down9: this.createPieceRotationData([
      ['DirectionC', 'BackLeft'],
      ['DirectionP', 'Back'],
    ]),
    Down10: [],
    Right0: this.createPieceRotationData([['DirectionC', 'Up', true]]),
    Right1: this.createPieceRotationData([
      ['DirectionC', 'Up', true],
      ['DirectionE', 'Front'],
    ]),
    Right2: this.createPieceRotationData([['DirectionE', 'Front']]),
    Right3: this.createPieceRotationData([
      ['DirectionE', 'Front'],
      ['DirectionH', 'DownRight'],
    ]),
    Right4: this.createPieceRotationData([['DirectionH', 'DownRight']]),
    Right5: this.createPieceRotationData([
      ['DirectionH', 'DownRight'],
      ['DirectionB', 'BackRight'],
    ]),
    Right6: this.createPieceRotationData([['DirectionB', 'BackRight']]),
    Right7: this.createPieceRotationData([
      ['DirectionB', 'BackRight'],
      ['DirectionK', 'UpRight', true],
    ]),
    Right8: this.createPieceRotationData([['DirectionK', 'UpRight', true]]),
    Right9: this.createPieceRotationData([
      ['DirectionK', 'UpRight', true],
      ['DirectionC', 'Up', true],
    ]),
    Right10: [],
    BackLeft0: this.createPieceRotationData([['DirectionC', 'Down', true]]),
    BackLeft1: this.createPieceRotationData([
      ['DirectionC', 'Down', true],
      ['DirectionK', 'DownLeft', true],
    ]),
    BackLeft2: this.createPieceRotationData([['DirectionK', 'DownLeft', true]]),
    BackLeft3: this.createPieceRotationData([
      ['DirectionK', 'DownLeft', true],
      ['DirectionB', 'Left'],
    ]),
    BackLeft4: this.createPieceRotationData([['DirectionB', 'Left']]),
    BackLeft5: this.createPieceRotationData([
      ['DirectionB', 'Left'],
      ['DirectionH', 'UpLeft'],
    ]),
    BackLeft6: this.createPieceRotationData([['DirectionH', 'UpLeft']]),
    BackLeft7: this.createPieceRotationData([
      ['DirectionH', 'UpLeft'],
      ['DirectionE', 'Back'],
    ]),
    BackLeft8: this.createPieceRotationData([['DirectionE', 'Back']]),
    BackLeft9: this.createPieceRotationData([
      ['DirectionE', 'Back'],
      ['DirectionC', 'Down', true],
    ]),
    BackLeft10: [],
    Front0: this.createPieceRotationData([['DirectionP', 'Up', true]]),
    Front1: this.createPieceRotationData([
      ['DirectionP', 'Up', true],
      ['DirectionF', 'Left'],
    ]),
    Front2: this.createPieceRotationData([['DirectionF', 'Left']]),
    Front3: this.createPieceRotationData([
      ['DirectionF', 'Left'],
      ['DirectionN', 'DownLeft'],
    ]),
    Front4: this.createPieceRotationData([['DirectionN', 'DownLeft']]),
    Front5: this.createPieceRotationData([
      ['DirectionN', 'DownLeft'],
      ['DirectionO', 'DownRight'],
    ]),
    Front6: this.createPieceRotationData([['DirectionO', 'DownRight']]),
    Front7: this.createPieceRotationData([
      ['DirectionO', 'DownRight'],
      ['DirectionG', 'Right'],
    ]),
    Front8: this.createPieceRotationData([['DirectionG', 'Right']]),
    Front9: this.createPieceRotationData([
      ['DirectionG', 'Right'],
      ['DirectionP', 'Up', true],
    ]),
    Front10: [],
    Back0: this.createPieceRotationData([['DirectionP', 'Down', true]]),
    Back1: this.createPieceRotationData([
      ['DirectionP', 'Down', true],
      ['DirectionE', 'BackLeft', true],
    ]),
    Back2: this.createPieceRotationData([['DirectionE', 'BackLeft', true]]),
    Back3: this.createPieceRotationData([
      ['DirectionE', 'BackLeft', true],
      ['DirectionO', 'UpLeft'],
    ]),
    Back4: this.createPieceRotationData([['DirectionO', 'UpLeft']]),
    Back5: this.createPieceRotationData([
      ['DirectionO', 'UpLeft'],
      ['DirectionN', 'UpRight'],
    ]),
    Back6: this.createPieceRotationData([['DirectionN', 'UpRight']]),
    Back7: this.createPieceRotationData([
      ['DirectionN', 'UpRight'],
      ['DirectionF', 'BackRight'],
    ]),
    Back8: this.createPieceRotationData([['DirectionF', 'BackRight']]),
    Back9: this.createPieceRotationData([
      ['DirectionF', 'BackRight'],
      ['DirectionP', 'Down', true],
    ]),
    Back10: [],
    Left0: this.createPieceRotationData([['DirectionD', 'Up', true]]),
    Left1: this.createPieceRotationData([
      ['DirectionD', 'Up', true],
      ['DirectionJ', 'UpLeft'],
    ]),
    Left2: this.createPieceRotationData([['DirectionJ', 'UpLeft']]),
    Left3: this.createPieceRotationData([
      ['DirectionJ', 'UpLeft'],
      ['DirectionB', 'BackLeft', true],
    ]),
    Left4: this.createPieceRotationData([['DirectionB', 'BackLeft', true]]),
    Left5: this.createPieceRotationData([
      ['DirectionB', 'BackLeft', true],
      ['DirectionI', 'DownLeft'],
    ]),
    Left6: this.createPieceRotationData([['DirectionI', 'DownLeft']]),
    Left7: this.createPieceRotationData([
      ['DirectionI', 'DownLeft'],
      ['DirectionF', 'Front', true],
    ]),
    Left8: this.createPieceRotationData([['DirectionF', 'Front', true]]),
    Left9: this.createPieceRotationData([
      ['DirectionF', 'Front', true],
      ['DirectionD', 'Up', true],
    ]),
    Left10: [],
    BackRight0: this.createPieceRotationData([['DirectionD', 'Down', true]]),
    BackRight1: this.createPieceRotationData([
      ['DirectionD', 'Down', true],
      ['DirectionF', 'Back', true],
    ]),
    BackRight2: this.createPieceRotationData([['DirectionF', 'Back', true]]),
    BackRight3: this.createPieceRotationData([
      ['DirectionF', 'Back', true],
      ['DirectionI', 'UpRight'],
    ]),
    BackRight4: this.createPieceRotationData([['DirectionI', 'UpRight']]),
    BackRight5: this.createPieceRotationData([
      ['DirectionI', 'UpRight'],
      ['DirectionB', 'Right', true],
    ]),
    BackRight6: this.createPieceRotationData([['DirectionB', 'Right', true]]),
    BackRight7: this.createPieceRotationData([
      ['DirectionB', 'Right', true],
      ['DirectionJ', 'DownRight'],
    ]),
    BackRight8: this.createPieceRotationData([['DirectionJ', 'DownRight']]),
    BackRight9: this.createPieceRotationData([
      ['DirectionJ', 'DownRight'],
      ['DirectionD', 'Down', true],
    ]),
    BackRight10: [],
    UpLeft0: this.createPieceRotationData([['DirectionM', 'Up', true]]),
    UpLeft1: this.createPieceRotationData([
      ['DirectionM', 'Up', true],
      ['DirectionA', 'UpRight'],
    ]),
    UpLeft2: this.createPieceRotationData([['DirectionA', 'UpRight']]),
    UpLeft3: this.createPieceRotationData([
      ['DirectionA', 'UpRight'],
      ['DirectionO', 'Back', true],
    ]),
    UpLeft4: this.createPieceRotationData([['DirectionO', 'Back', true]]),
    UpLeft5: this.createPieceRotationData([
      ['DirectionO', 'Back', true],
      ['DirectionH', 'BackLeft', true],
    ]),
    UpLeft6: this.createPieceRotationData([['DirectionH', 'BackLeft', true]]),
    UpLeft7: this.createPieceRotationData([
      ['DirectionH', 'BackLeft', true],
      ['DirectionJ', 'Left', true],
    ]),
    UpLeft8: this.createPieceRotationData([['DirectionJ', 'Left', true]]),
    UpLeft9: this.createPieceRotationData([
      ['DirectionJ', 'Left', true],
      ['DirectionM', 'Up', true],
    ]),
    UpLeft10: [],
    DownRight0: this.createPieceRotationData([['DirectionM', 'Down', true]]),
    DownRight1: this.createPieceRotationData([
      ['DirectionM', 'Down', true],
      ['DirectionJ', 'BackRight', true],
    ]),
    DownRight2: this.createPieceRotationData([['DirectionJ', 'BackRight', true]]),
    DownRight3: this.createPieceRotationData([
      ['DirectionJ', 'BackRight', true],
      ['DirectionH', 'Right', true],
    ]),
    DownRight4: this.createPieceRotationData([['DirectionH', 'Right', true]]),
    DownRight5: this.createPieceRotationData([
      ['DirectionH', 'Right', true],
      ['DirectionO', 'Front', true],
    ]),
    DownRight6: this.createPieceRotationData([['DirectionO', 'Front', true]]),
    DownRight7: this.createPieceRotationData([
      ['DirectionO', 'Front', true],
      ['DirectionA', 'DownLeft'],
    ]),
    DownRight8: this.createPieceRotationData([['DirectionA', 'DownLeft']]),
    DownRight9: this.createPieceRotationData([
      ['DirectionA', 'DownLeft'],
      ['DirectionM', 'Down', true],
    ]),
    DownRight10: [],
    UpRight0: this.createPieceRotationData([['DirectionL', 'Up', true]]),
    UpRight1: this.createPieceRotationData([
      ['DirectionL', 'Up', true],
      ['DirectionK', 'Right'],
    ]),
    UpRight2: this.createPieceRotationData([['DirectionK', 'Right']]),
    UpRight3: this.createPieceRotationData([
      ['DirectionK', 'Right'],
      ['DirectionI', 'BackRight', true],
    ]),
    UpRight4: this.createPieceRotationData([['DirectionI', 'BackRight', true]]),
    UpRight5: this.createPieceRotationData([
      ['DirectionI', 'BackRight', true],
      ['DirectionN', 'Back', true],
    ]),
    UpRight6: this.createPieceRotationData([['DirectionN', 'Back', true]]),
    UpRight7: this.createPieceRotationData([
      ['DirectionN', 'Back', true],
      ['DirectionA', 'UpLeft', true],
    ]),
    UpRight8: this.createPieceRotationData([['DirectionA', 'UpLeft', true]]),
    UpRight9: this.createPieceRotationData([
      ['DirectionA', 'UpLeft', true],
      ['DirectionL', 'Up', true],
    ]),
    UpRight10: [],
    DownLeft0: this.createPieceRotationData([['DirectionL', 'Down', true]]),
    DownLeft1: this.createPieceRotationData([
      ['DirectionL', 'Down', true],
      ['DirectionA', 'DownRight', true],
    ]),
    DownLeft2: this.createPieceRotationData([['DirectionA', 'DownRight', true]]),
    DownLeft3: this.createPieceRotationData([
      ['DirectionA', 'DownRight', true],
      ['DirectionN', 'Front', true],
    ]),
    DownLeft4: this.createPieceRotationData([['DirectionN', 'Front', true]]),
    DownLeft5: this.createPieceRotationData([
      ['DirectionN', 'Front', true],
      ['DirectionI', 'Left', true],
    ]),
    DownLeft6: this.createPieceRotationData([['DirectionI', 'Left', true]]),
    DownLeft7: this.createPieceRotationData([
      ['DirectionI', 'Left', true],
      ['DirectionK', 'BackLeft'],
    ]),
    DownLeft8: this.createPieceRotationData([['DirectionK', 'BackLeft']]),
    DownLeft9: this.createPieceRotationData([
      ['DirectionK', 'BackLeft'],
      ['DirectionL', 'Down', true],
    ]),
    DownLeft10: [],
  };
}
