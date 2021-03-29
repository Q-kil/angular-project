import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CropperComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-project';
  options = null;
  securtyUrl = null;
  @ViewChild('angularCropper') public angularCropper: CropperComponent;

  constructor(
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    // this.angularCropper.cropper.zoom(0.1);

    this.options = {
      checkCrossOrigin: true,
      dragMode: "move",
      zoomable: true,
      scalable: true,
      movable: true,
      cropBoxResizable: false,
      minContainerWidth: 10,
      minContainerHeight: 10
    };

    // this.securtyUrl = this.sanitizer.bypassSecurityTrustUrl(this.data.url);
  }

  fileCoverData(e) {
    e.preventDefault();
    let f0 = e.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(f0);
    fr.onload = () => {
      let src = fr.result.toString();
      this.securtyUrl = this.sanitizer.bypassSecurityTrustUrl(src);
      // const dialogRef = this.dialog.open(CropperDialogComponent, {
        // data: { width: 158, height: 158, url: src }
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   if (result) {
      //     const newCoverImage = new Image();
      //     newCoverImage.src = result.dataUrl;
      //     const this_ = this;
      //     newCoverImage.onload = function() {
      //       this_.coverFile = Util.imgCompress(newCoverImage, 158, 158);
      //       this_.coverStatus = true;
      //     };
      //   }
      // });
      // if (e.target.value !== "") {
      //   e.target.value = "";
      // }
    };
  }
}
