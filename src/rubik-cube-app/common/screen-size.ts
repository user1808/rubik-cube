export class ScreenSize {
  private _height: number = window.innerHeight;
  private _width: number = window.innerWidth;

  public get height(): typeof this._height {
    return this._height;
  }

  public set height(newHeight: typeof this._height) {
    this._height = newHeight;
  }

  public get width(): typeof this._width {
    return this._width;
  }

  public set width(newWidth: typeof this._width) {
    this._width = newWidth;
  }
}
