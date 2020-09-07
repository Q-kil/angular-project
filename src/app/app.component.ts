import { Component, OnInit } from '@angular/core';
import { AvatarEditorCanvas, AvatarEditorEmitType } from "game-core";
import * as qiniu from "qiniu-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-project';

  ngOnInit() {
    const sizes = [{width: 71, height: 79}];
    const datas = [{id: '5cc2d879f2a320666818ad66', parts: ["head_eyes"]}];
    AvatarEditorCanvas.batchGenerateShopIcon(sizes, datas);

    // 每个数据截图完成后都会发送Emit
    AvatarEditorCanvas.on(AvatarEditorEmitType.Shop_Icon_Generated, (icons: {id: string, urls: string[]}[]) => {
      console.log('icons', icons);
      for (const icon of icons) {
        const id = icon.id;
        const img = icon.urls[0];
      }
    });
  }

  upload() {

  }

  public doUpload(file, path, service, b64?): Promise<any> {
    return new Promise((resolve, reject) => {
      service.getQiniuToken(path).subscribe(
        data => {
          resolve(data.token);
        }
      );
    }).then((token: string) => {
      return new Promise((resolve, reject) => {
        if (b64 === "b64") {
          

          let files = this.dataURLtoFile(file, "stand.png");
          qiniu
            .upload(
              files,
              path,
              token,
              {},
              {
                useCdnDomain: true,
                region: qiniu.region.z0
              }
            )
            .subscribe(
              (res: any) => {
                res.filePath = path;
                resolve(res);
              },
              error => {
                reject(error);
              }
            );
        } else {
          qiniu
            .upload(
              file,
              path,
              token,
              {},
              {
                useCdnDomain: true,
                region: qiniu.region.z0
              }
            )
            .subscribe(
              res => {
                res.filePath = path;
                resolve(res);
              },
              error => {
                reject(error);
              }
            );
        }
      });
    });
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
