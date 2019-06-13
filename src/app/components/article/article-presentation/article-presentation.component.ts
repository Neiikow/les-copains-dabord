import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/class/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-presentation',
  styleUrls: ['./article-presentation.component.css'],
  templateUrl: './article-presentation.component.html',
})
export class ArticlePresentationComponent implements OnInit {
  private article: Article;

  constructor(
    private articleService: ArticleService) { }

  public ngOnInit(): void {
    this.getArticle();
  }

  private getArticle(): void {
    const type = 'presentation';
    this.articleService.getArticleByType(type)
      .subscribe((article: Article) => this.article = article);
  }
}
