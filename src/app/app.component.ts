import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  scannerEnabled: boolean = true;
  transports: [] = [];
  information: string;

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

  saveFile() {
    const blob = new Blob([JSON.stringify(this.data)], { type: 'text/plain' });
    saveAs(blob, 'data.txt');
  }

  fileDatakeys = 0;
  previewFile(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = JSON.parse(reader.result.toString());
      // const data = reader.result.toString();
      this.fileDatakeys = Object.keys(data).length;
      // alert(this.fileDatakeys);
      console.log(data);
      this.data = data;
      this.createBuffer(data, this.getmaxKey(data));
    };
    reader.readAsBinaryString(event.target.files[0]);
  }

  getmaxKey(data) {
    let max = 0;
    for (let i in Object.keys(data)) {
      if (parseInt(i) > max) {
        max = parseInt(i);
      }
    }
    console.log(max);
    return max;
  }

  createBuffer(data, maxkey) {
    const buffer = new ArrayBuffer(83088);
    const view = new Int32Array(buffer);

    let arr = [];
    for (let i = 0; i <= maxkey; i++) {
      if (data[i]) {
        arr = [...arr, ...data[i.toString()].d.split(',')];
      }
    }

    console.log(buffer);
  }
}
