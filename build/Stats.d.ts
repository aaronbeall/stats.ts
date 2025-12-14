interface PerformanceMemory {
    usedJSHeapSize: number;
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
}
interface PerformanceWithMemory extends Performance {
    memory?: PerformanceMemory;
}
declare global {
    interface Window {
        performance: PerformanceWithMemory;
    }
}
/**
 * @author mrdoob / http://mrdoob.com/
 * @author Aaron Beall / https://abeall.com
 */
declare class Stats {
    REVISION: number;
    dom: HTMLDivElement;
    domElement: HTMLDivElement;
    private mode;
    private beginTime;
    private prevTime;
    private frames;
    private fpsPanel;
    private msPanel;
    private memPanel?;
    constructor();
    addPanel(panel: Panel): Panel;
    showPanel(id: number): void;
    begin(): void;
    end(): number;
    update(): void;
    setMode(id: number): void;
}
declare class Panel {
    dom: HTMLCanvasElement;
    private min;
    private max;
    private round;
    private PR;
    private WIDTH;
    private HEIGHT;
    private TEXT_X;
    private TEXT_Y;
    private GRAPH_X;
    private GRAPH_Y;
    private GRAPH_WIDTH;
    private GRAPH_HEIGHT;
    private context;
    private name;
    private fg;
    private bg;
    constructor(name: string, fg: string, bg: string);
    update(value: number, maxValue: number): void;
}
export { Stats as default, Stats, Panel };
//# sourceMappingURL=Stats.d.ts.map