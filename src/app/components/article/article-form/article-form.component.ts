import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  private dataForm: FormGroup;
  private article: Article;
  private submitted = false;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location) { }

  public ngOnInit(): void {
    this.initParam();
  }
  private onSubmit(formData: Article): void {
    this.submitted = true;
    if (this.dataForm.invalid) {
      return;
    }

    alert('L\'article ' + this.dataForm.value.title + ' a été posté !');
    // if (this.edit) {
    //   this.articleService.editArticle(formData).subscribe(e => this.location.back());
    // } else {
    //   this.articleService.addArticle(formData).subscribe(e => this.location.back());
    // }
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
    if (this.type === 'ground') {
      this.dataForm = this.formBuilder.group({
        title: [this.edit ? data.title : null, Validators.required],
        content: [this.edit ? data.content : null, Validators.required],
        author: [this.edit ? data.author : null],
        picture: [this.edit ? data.picture : null, Validators.required],
        type: [this.edit ? data.type : this.type],
        status: [this.edit ? data.status : 'online'],
        location_x: [this.edit ? data.location_x : null, Validators.required],
        location_y: [this.edit ? data.location_y : null, Validators.required],
      });
    }
    if (this.type === 'plugin') {
      this.dataForm = this.formBuilder.group({
        title: [this.edit ? data.title : null, Validators.required],
        content: [this.edit ? data.content : null, Validators.required],
        author: [this.edit ? data.author : null],
        picture: [this.edit ? data.picture : null, Validators.required],
        type: [this.edit ? data.type : this.type],
        status: [this.edit ? data.status : 'online'],
        version: [this.edit ? data.version : null, Validators.required],
        link: [this.edit ? data.link : null, Validators.required],
      });
    }
    this.article = this.dataForm.value;
  }
  public get f(): any { return this.dataForm.controls; }
}
