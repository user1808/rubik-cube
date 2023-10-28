import { Controller, GUI } from 'lil-gui';

export class CustomDebugGUI extends GUI {
  add<T extends object>(
    object: T,
    property: keyof T extends string ? keyof T : never,
    $1?: number | object | any[] | undefined,
    max?: number | undefined,
    step?: number | undefined,
  ): Controller {
    return super.add(object, property, $1, max, step);
  }
}
