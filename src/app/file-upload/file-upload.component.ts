import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Config } from '../setting/config';
import { Common } from '../util/common';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  file;
  fileName;
  msg:string;
  httpStatus: string;
  model;
  lan;

  constructor(private http: HttpClient,private config: Config,private common: Common) {
    this.common.reload()
    this.lan = this.common.languageSetting();
  }

  ngOnInit() { }
  
  /**
   * ファイルを選択する
   * @param event INPUT[FILE]:ChangeEvent
   */
  uploadFile(event) {
    this.msg = "";
    let files = event.target.files;
    if (files.length > 0) {
      this.file = event.target.files[0];
      this.fileName = this.file.name;

      //CSVファイルかを判定
      if(!this.fileName.endsWith(".csv")){
        this.msg = "CSVファイルを選択してください。";
        this.reset();
      }

      //INPUT[FILE]をクリアする
      event.srcElement.value = "";
    }else{
      //ファイル選択ポップアップ画面で「キャンセル」を押下
      this.reset();
    }
  }

  /**
   * アップロードボタンを押下
   */
  upload(){
    if(this.file == undefined){
      this.msg = "ファイルを選択してください。";
      this.reset();
      return;
    }

    var formData = new FormData();
    formData.append("file",this.file, this.file.name);
    //console.log(formData);
    this.http.post(this.config.SERVER_URL + "/F_Upload/", formData).subscribe( 
      (resp: Response) => {
        if(resp.toString() == "0"){
          this.msg = "アップロード完了";
        }else if(resp.toString() == "-2"){
          this.msg = "ファイルサイズは０です。";
        }else{
          this.msg = "サーバエラー";
        }
        this.reset();
      },
      error =>{
        this.msg = "サーバエラー:" + error.status;
        this.reset();
      }
    ); 
  }
  
  /**
   * INPUT[FILE]を戻す
   */
  private reset(){
    this.file = undefined;
    this.fileName = "";
  }
}
