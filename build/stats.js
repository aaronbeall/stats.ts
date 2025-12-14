(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Stats = factory());
})(this, (function () { 'use strict';

    /**
     * @author mrdoob / http://mrdoob.com/
     */
    class Stats {
        constructor() {
            this.REVISION = 18;
            this.mode = 0;
            this.frames = 0;
            this.dom = document.createElement('div');
            this.dom.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
            this.dom.addEventListener('click', (event) => {
                event.preventDefault();
                this.showPanel(++this.mode % this.dom.children.length);
            }, false);
            this.beginTime = (performance || Date).now();
            this.prevTime = this.beginTime;
            this.fpsPanel = this.addPanel(new Panel('FPS', '#0ff', '#002'));
            this.msPanel = this.addPanel(new Panel('MS', '#0f0', '#020'));
            if (self.performance && self.performance.memory) {
                this.memPanel = this.addPanel(new Panel('MB', '#f08', '#201'));
            }
            this.showPanel(0);
            // Backwards Compatibility
            this.domElement = this.dom;
        }
        addPanel(panel) {
            this.dom.appendChild(panel.dom);
            return panel;
        }
        showPanel(id) {
            for (let i = 0; i < this.dom.children.length; i++) {
                this.dom.children[i].style.display = i === id ? 'block' : 'none';
            }
            this.mode = id;
        }
        begin() {
            this.beginTime = (performance || Date).now();
        }
        end() {
            this.frames++;
            const time = (performance || Date).now();
            this.msPanel.update(time - this.beginTime, 200);
            if (time >= this.prevTime + 1000) {
                this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 100);
                this.prevTime = time;
                this.frames = 0;
                if (this.memPanel) {
                    const memory = performance.memory;
                    this.memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
                }
            }
            return time;
        }
        update() {
            this.beginTime = this.end();
        }
        // Backwards Compatibility
        setMode(id) {
            this.showPanel(id);
        }
    }
    class Panel {
        constructor(name, fg, bg) {
            this.min = Infinity;
            this.max = 0;
            this.round = Math.round;
            this.name = name;
            this.fg = fg;
            this.bg = bg;
            this.PR = this.round(window.devicePixelRatio || 1);
            this.WIDTH = 80 * this.PR;
            this.HEIGHT = 48 * this.PR;
            this.TEXT_X = 3 * this.PR;
            this.TEXT_Y = 2 * this.PR;
            this.GRAPH_X = 3 * this.PR;
            this.GRAPH_Y = 15 * this.PR;
            this.GRAPH_WIDTH = 74 * this.PR;
            this.GRAPH_HEIGHT = 30 * this.PR;
            this.dom = document.createElement('canvas');
            this.dom.width = this.WIDTH;
            this.dom.height = this.HEIGHT;
            this.dom.style.cssText = 'width:80px;height:48px';
            this.context = this.dom.getContext('2d');
            this.context.font = 'bold ' + (9 * this.PR) + 'px Helvetica,Arial,sans-serif';
            this.context.textBaseline = 'top';
            this.context.fillStyle = bg;
            this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
            this.context.fillStyle = fg;
            this.context.fillText(name, this.TEXT_X, this.TEXT_Y);
            this.context.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);
            this.context.fillStyle = bg;
            this.context.globalAlpha = 0.9;
            this.context.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);
        }
        update(value, maxValue) {
            this.min = Math.min(this.min, value);
            this.max = Math.max(this.max, value);
            this.context.fillStyle = this.bg;
            this.context.globalAlpha = 1;
            this.context.fillRect(0, 0, this.WIDTH, this.GRAPH_Y);
            this.context.fillStyle = this.fg;
            this.context.fillText(this.round(value) + ' ' + this.name + ' (' + this.round(this.min) + '-' + this.round(this.max) + ')', this.TEXT_X, this.TEXT_Y);
            this.context.drawImage(this.dom, this.GRAPH_X + this.PR, this.GRAPH_Y, this.GRAPH_WIDTH - this.PR, this.GRAPH_HEIGHT, this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH - this.PR, this.GRAPH_HEIGHT);
            this.context.fillRect(this.GRAPH_X + this.GRAPH_WIDTH - this.PR, this.GRAPH_Y, this.PR, this.GRAPH_HEIGHT);
            this.context.fillStyle = this.bg;
            this.context.globalAlpha = 0.9;
            this.context.fillRect(this.GRAPH_X + this.GRAPH_WIDTH - this.PR, this.GRAPH_Y, this.PR, this.round((1 - (value / maxValue)) * this.GRAPH_HEIGHT));
        }
    }

    return Stats;

}));
//# sourceMappingURL=stats.js.map
