import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../class/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/api/articles/';

  constructor(private http: HttpClient) { }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }
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
    return this.http.post<Article>(this.url + 'new', article);
  }
  public editArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + 'edit/' + article.id, article);
  }
  public deleteArticle(id: number): Observable<Article> {
    return this.http.delete<Article>(this.url + 'delete/' + id);
  }
}
