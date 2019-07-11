import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../class/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private url = 'https://neiikow.fr/api/public/index.php/api/articles';

  constructor(private http: HttpClient) { }

  public getArticles(currentPage: number, pageSize: number): Observable<any> {
    const pageOptions = {
      currentPage,
      pageSize,
    };
    return this.http.post<any>(this.url, pageOptions);
  }
  public getArticlesByType(type: string, currentPage: number, pageSize: number): Observable<any> {
    const pageOptions = {
      currentPage,
      pageSize,
    };
    return this.http.post<any>(this.url + '/' + type, pageOptions);
  }
  public getArticleByType(type: string): Observable<Article> {
    return this.http.get<Article>(this.url + '/view/' + type);
  }
  public getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(this.url + '/view/' + id);
  }
  public addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + '/new', article);
  }
  public editArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + '/edit/' + article.id, article);
  }
  public deleteArticle(id: number): Observable<Article> {
    return this.http.delete<Article>(this.url + '/delete/' + id);
  }
}
