import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../class/article';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:8888',
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/articles/';

  constructor(private http: HttpClient) { }

  public getArticlesByType(type: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + type);
  }
  public getArticleByType(type: string): Observable<Article> {
    return this.http.get<Article>(this.url + type);
  }
  public getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(this.url + 'view/' + id);
  }
  public addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + 'new', article, httpOptions);
  }
  public editArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + 'edit/' + article.id, article, httpOptions);
  }
  public deleteArticle(id: number): Observable<Article> {
    return this.http.delete<Article>(this.url + 'delete/' + id, httpOptions);
  }
}
