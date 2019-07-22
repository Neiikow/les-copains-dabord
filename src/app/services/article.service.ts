import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Article } from '../class/article';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/api/articles';

  constructor(private http: HttpClient) { }

  public getArticles(currentPage: number, pageSize: number): Observable<any> {
    const pageOptions = {
      currentPage,
      pageSize,
    };
    return this.http.post<Article[]>(this.url, pageOptions);
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
  public getArticleById(id: number): Observable<any> {
    return this.http.get<Article>(this.url + '/view/' + id)
    .pipe(
      catchError(this.handleError),
    );
  }
  public addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + '/new', article);
  }
  public editArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + '/edit/' + article.id, article);
  }
  public deleteArticle(id: number): Observable<any> {
    return this.http.delete<Article>(this.url + '/delete/' + id)
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.message;
    return throwError(errorMsg);
  }
}
