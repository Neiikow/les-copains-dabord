import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/class/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-list',
  styleUrls: ['./article-list.component.css'],
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  private articles: Article[];
  private design: string;
  private type: string;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.design = this.route.snapshot.data['design'];
    this.type = this.route.snapshot.data['type'];
    this.getArticles();
  }
  private getArticles(): void {
    this.articleService.getArticlesByType(this.type)
      .subscribe(articles => this.articles = articles);
  }
}
