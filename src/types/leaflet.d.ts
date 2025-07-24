import 'leaflet';

declare module 'leaflet' {
  interface Control {
    setPosition(position: string): this;
  }

  namespace GridLayer {
    interface GridLayer {
      _initTile(tile: HTMLElement): void;
    }
  }

  interface GridLayer {
    _initTile(tile: HTMLElement): void;
  }

  namespace control {
    function Scale(options?: ScaleOptions):Control.Scale;
  }

  function tileLayer(urlTemplate: string, options?: TileLayerOptions): TileLayer;

  interface ScaleOptions {
    position?: ControlPosition;
    maxWidth?: number;
    metric?: boolean;
    imperial?: boolean;
    updateWhenIdle?: boolean;
  }
}
