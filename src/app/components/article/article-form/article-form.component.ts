import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/class/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-form',
  styleUrls: ['./article-form.component.css'],
  templateUrl: './article-form.component.html',
})
export class ArticleFormComponent implements OnInit {
  private edit = false;
  private type: string;
  private dataForm: any;
  private article: Article;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location) { }

  public ngOnInit(): void {
    this.initParam();
  }
  private onSubmit(formData: Article): void {
    if (this.edit) {
      this.articleService.editArticle(formData).subscribe(e => this.location.back());
    } else {
      this.articleService.addArticle(formData).subscribe(e => this.location.back());
    }
  }
  private initParam(): void {
    this.route.params.subscribe((param: {type: string, id: number}) => {
      if (param.type) {
        this.type = param.type;
        this.initForm();
      }
      if (param.id) {
        this.articleService.getArticleById(param.id)
          .subscribe((article: Article) => {
            this.type = article.type;
            this.initForm(article);
          });
        this.edit = this.route.snapshot.data['edit'];
      }
    });
  }
  private initForm(data?: Article): void {
    this.dataForm = this.formBuilder.group({
      id: [this.edit ? data.id : null],
      title: [this.edit ? data.title : null],
      content: [this.edit ? data.content : null],
      author: [this.edit ? data.author : null],
      picture: [this.edit ? data.picture : null],
      type: [this.edit ? data.type : this.type],
      status: [this.edit ? data.status : 'online'],
      location_x: [this.edit ? data.location_x : null],
      location_y: [this.edit ? data.location_y : null],
      version: [this.edit ? data.version : null],
      link: [this.edit ? data.link : null],
    });
    this.article = this.dataForm.value;
  }
}
