import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as PIXI from 'pixi.js/dist/pixi.js';
import { dragonBones } from 'lib/dragonBones';
import PixiArmatureDisplay = dragonBones.PixiArmatureDisplay;

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent extends PIXI.Container implements AfterViewInit {
  private _width = 164;
  private _height = 204;
  private _ratio = 1;

  @ViewChild('avatarEle') avatarEle: ElementRef;
  protected _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  protected _resources: string[] = [];
  protected _pixiResources: dragonBones.Map<PIXI.loaders.Resource>;
  protected _factory: dragonBones.PixiFactory = dragonBones.PixiFactory.factory;
  private _armatureDisplay: dragonBones.PixiArmatureDisplay;

  private paintStage() {
    const rendererOptions = {
      transparent: false,
      resolution: window.devicePixelRatio
    };
    this._renderer = PIXI.autoDetectRenderer(this._width, this._height, rendererOptions);

    // this.scale.x = this.scale.y = this._ratio;
    this._renderer.resize(Math.ceil(this._width * this._ratio), Math.ceil(this._height * this._ratio));

    const domElement = this.avatarEle.nativeElement;
    while (domElement.hasChildNodes()) {
      domElement.removeChild(domElement.firstChild);
    }
    domElement.appendChild(this._renderer.view);
  }

  constructor() {
    super();
  }

  ngAfterViewInit() {
    console.log('view init');
    this.changeLoad();
  }

  changeLoad() {
    this.paintStage();

    this._resources = [
      'assets/bones_human01_ske.dbbin',
      'assets/bones_human01_tex.json',
      'assets/bones_human01_tex.png',
    ];

    this._loadResources();
  }

  protected _loadResources() {
    console.log('_loadResources');
    const binaryOptions = {
      loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR,
      xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER
    };
    PIXI.loader.reset();
    for (const resource of this._resources) {
      if (resource.indexOf('dbbin') > 0) {
        PIXI.loader.add(resource, resource, binaryOptions as any);
      } else {
        PIXI.loader.add(resource, resource);
      }
    }

    PIXI.loader.once('comlete', (loader: PIXI.loader.Loader, resources: dragonBones.Map<PIXI.loaders.Resource>) => {
      this._pixiResources = resources;
      this._onStart();
    });
  }

  protected _onStart(): void {
    PIXI.removeChildren();

    const bg: PIXI.Sprite = PIXI.Sprite.fromImage('assets/avatar_preview_bg.png');
    this._renderer(bg);

    // this._factory.parseDragonBonesData(this._pixiResources['assets/bones_human01_ske.dbbin'].data);
    // this._factory.parseTextureAtlasData(this._pixiResources['assets/bones_human01_tex.json'].data,
    //   this._pixiResources['assets/bones_human01_tex.png'].texture);
    // this._armatureDisplay = this._factory.buildArmatureDisplay('Armature', 'bones_human01');
    // this._armatureDisplay.armature.cacheFrameRate = 0;
    // this._armatureDisplay.x = Math.ceil(this._width * .5);
    // this._armatureDisplay.y = Math.ceil(this._height * .85);

    this._armatureDisplay.animation.timeScale = .6; // Slow down

    // avatar status
    // this._armatureDisplay.animation.play(this.animationName);

    // this._armatureDisplay.scale.set(2, 2);

    // this.addChild(this._armatureDisplay);
    // domElement.appendChild(this._renderer.view);
  }

  // protected get animationName(): string {
    // return `${this._animation}_${this._dir}`;
  // }

  protected replaceSlotDisplay(slotName: string, display: PixiArmatureDisplay): void {
    if (!slotName) {
      return;
    }
    if (this._armatureDisplay) {
      const slot = this._armatureDisplay.armature.getSlot(slotName);

      if (slot) {
        slot.display = display;
      }
    }

  }

}
