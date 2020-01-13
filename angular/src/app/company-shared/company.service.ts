import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import axios from 'axios';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class CompanyService {
  private CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlpkhtcim/image/upload'
  private CLOUDINARY_UPLOAD_PRESET = "eqlz34la"
  private params = new HttpParams()
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  cloudHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
  resMessage
  companiesData = [] 
  userData

  constructor(private http: HttpClient) { }

  public uploadFiles(files) {
    let formData = new FormData();
    formData.append('file', files);
    formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
    console.log('formData', formData);
    return axios({
      url: this.CLOUDINARY_URL,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: formData
    }).then(function (res) {
      return res;
    }).catch(err => {
      console.log(err);
      return err;
    })
  }

  public saveData(data) {
    return this.http.get(environment.apiUrl + `/saveCompany`, { params: this.params.set('data', JSON.stringify(data)) });
  }

  public sendMessage(mess: string) {
    this.resMessage = mess;
    setTimeout(() => {
      this.resMessage = ''
    }, 2000);
  }

  public getAllCompanies() {
    return this.http.get(environment.apiUrl + '/getCompanies');
  }

  public getCompanyDetails(id){
    return this.http.get(environment.apiUrl + "/getCompanyDetails", { params: this.params.set('id', id)});
  }

  public getCompanyDetailsByUserId(id){
    return this.http.get(environment.apiUrl + "/getCompanyDetails", { params: this.params.set('userId', id)});
  }

  public getCompanyDetailsByCategory(param){
    return this.http.get(environment.apiUrl + "/getCompanyByCategory", { params: this.params.set('category', param)});
  }

  public donate(sum, id){
    return this.http.get(environment.apiUrl + '/donate',  { params: this.params.set('donate', sum).set('id', id)} )
  }

  public saveRating(idCompany, idUser, rate){
    console.log('idCompany ', idCompany, 'idUser ', idUser, 'rate ', rate);
    return this.http.get(environment.apiUrl + '/saveRating', 
    { params: this.params.set('idCompany', idCompany).set('idUser', idUser).set('rate', rate)})
  }

  public getRating(idCompany){
    return this.http.get(environment.apiUrl + '/getRating', { params: this.params.set('idCompany', idCompany) })
  }
}

