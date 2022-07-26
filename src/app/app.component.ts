import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { saveAs } from 'file-saver';
import { mimmeList } from './mime';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  scannerEnabled: boolean = true;
  transports: [] = [];
  information: string;
  mimmeList=mimmeList;
  mimeSelected= 'application/x-7z-compressed'
  constructor(private cd: ChangeDetectorRef) {}
  
  ngOnInit() {}

  data = {};

  indexdone = 0;

  public scanSuccessHandler($event: any) {
    const data = JSON.parse($event);
    if (data && data.i > -1) {
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
    this.information = '';
  }

  saveFile() {
    const blob = new Blob([JSON.stringify(this.data)], { type: 'text/plain' });
    saveAs(blob, 'data.txt');
  }

  saveZipFile(buffer) {
    const blob = new Blob([buffer], { type: this.mimeSelected});
    saveAs(blob, 'data.7z');
  }

  fileDatakeys = 0;
  previewFile(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = JSON.parse(reader.result.toString());
      
      this.fileDatakeys = Object.keys(data).length;
      this.data = data;
      this.indexdone = Object.keys(data).length;
      
      this.createBuffer(data, this.getmaxKey(data));
    };
    reader.readAsBinaryString(event.target.files[0]);
  }

  loadFileToSaveAsZip(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = JSON.parse(reader.result.toString());
      console.log(data);
      let str = '';
      for (let v in Object.keys(data)) {
        str += data[v];
      }

      const buffer = new Uint8Array(str.split(',') as any);
      console.log(buffer.length);
      this.saveZipFile(buffer);
    };
    reader.readAsText(event.target.files[0]);
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

  showMissingKeys() {
    let missingkeys = '';
    let maxKey = this.getmaxKey(this.data);
    for (let i = 0; i <= maxKey; i++) {
      if (!this.data[i]) {
        missingkeys += i + ' , ';
      }
    }
    alert(missingkeys);
  }

  createBuffer(data, maxkey) {
    const buffer = new ArrayBuffer(332352);
    let arr = [];
    for (let i = 0; i <= maxkey; i++) {
      if (data[i]) {
        
        data[i.toString()].split(',').forEach((v) => {
          arr.push(parseFloat(v));
        });
      }
    }
    const buf = new Int32Array(arr);
    console.log(buf);
  }

  
}
