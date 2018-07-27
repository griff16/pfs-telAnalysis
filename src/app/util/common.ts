import { Injectable } from '@angular/core';
import { Config } from '../setting/config';

@Injectable({ providedIn: 'root' })
export class Common {

    constructor(private config: Config){ }
    reload(){
        let isReload = sessionStorage.getItem("reload");
        if(isReload == "true"){
          sessionStorage.setItem("reload","false")
          location.reload();
        }
    }

    languageSetting() {
        let lansetting = localStorage.getItem("language");
        if(lansetting == "en"){
            return this.config.LANGUAGE.EN;
        }else if(lansetting == "zh"){
            return this.config.LANGUAGE.ZH;
        }else{
            return this.config.LANGUAGE.JA;
        }
    }
}