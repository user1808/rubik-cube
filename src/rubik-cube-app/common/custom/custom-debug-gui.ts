import { Controller, GUI } from 'lil-gui';

export class CustomDebugGUI extends GUI {
  public override add<T>(
    object: T,
    property: T extends object ? keyof T : never,
    $1?: number | object | any[] | undefined,
    max?: number | undefined,
    step?: number | undefined,
  ): Controller {
    return super.add(object, property, $1, max, step);
  }

  public override addFolder(title: string): CustomDebugGUI {
    return super.addFolder(title);
  }
}
