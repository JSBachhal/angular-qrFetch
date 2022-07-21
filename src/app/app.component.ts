import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private scannerEnabled: boolean = true;
  private transports: Transport[] = [];
  private information: string;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  data = {};

  indexdone = 0;

  public scanSuccessHandler($event: any) {
    const data = JSON.parse($event);
    if (data && data.i) {
      if (this.data[data.i]) {
        return;
      }
      this.data[data.i] = data.d;
      this.indexdone += 1;
    }
  }

  doneindexList() {}

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information =
      'No se ha detectado información de ningún código. Acerque un código QR para escanear.';
  }

  private saveFile(response) {
    const blob = new Blob([JSON.stringify(this.data)], { type: 'text/plain' });
    saveAs(blob, 'data.txt');
  }

  fileDatakeys = 0;
  public previewImage(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {

      alert(e) 
      const data = JSON.parse(reader.result.toString());
      this.fileDatakeys = Object.keys(data).length;
      alert(this.fileDatakeys);
      this.data = data;
    };
    reader.readAsText(event.target.files[0]);
  }
}
