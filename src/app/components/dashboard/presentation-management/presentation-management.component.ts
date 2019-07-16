import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/class/article';
import { Types } from 'src/app/enum/types.enum';
import { ArticleService } from 'src/app/services/article.service';
import { DataFormatService } from 'src/app/services/data-format.service';

@Component({
  selector: 'app-presentation-management',
  styleUrls: ['./presentation-management.component.css'],
  templateUrl: './presentation-management.component.html',
})
export class PresentationManagementComponent implements OnInit {
  public articles: Article[];
  public pagin: any;
  private types = Types;

  constructor(
    private articleService: ArticleService,
    private formatService: DataFormatService) { }

  public ngOnInit(): void {
    this.getArticles(1, 3);
  }
  public getOptions(options: any): void {
    this.getArticles(options.currentPage, options.pageSize);
  }
  private getArticles(currentPage: number, pageSize: number): void {
    this.articleService.getArticlesByType('presentation', currentPage, pageSize)
      .subscribe(data => {
        const articles = data.articles;
        this.pagin = data.options;
        articles.forEach(article => {
          article.createDate = this.formatService.frenchDate(article['create_date']);
        });
        this.articles = articles;
      });
  }
}
