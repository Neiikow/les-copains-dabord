import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/class/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';

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
    private authService: AuthService,
    private route: ActivatedRoute,
    private formValidator: FormValidatorService,
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
    const payload = this.authService.getDecodedToken(this.authService.getToken());
    const author = payload.username;
    const date = this.formValidator.getDate();

    if (this.type === 'ground') {
      this.dataForm = this.formBuilder.group({
        author: [this.edit ? data.author : author],
        content: [this.edit ? data.content : null, Validators.required],
        id: this.edit ? data.id : null,
        location_x: [this.edit ? data.location_x : null, Validators.required],
        location_y: [this.edit ? data.location_y : null, Validators.required],
        picture: [this.edit ? data.picture : null, Validators.required],
        status: [this.edit ? data.status : 'online'],
        title: [this.edit ? data.title : null, Validators.required],
        type: [this.edit ? data.type : this.type],
        create_date: [this.edit ? data.createDate : date],
      });
    }
    if (this.type === 'plugin') {
      this.dataForm = this.formBuilder.group({
        author: [this.edit ? data.author : author],
        content: [this.edit ? data.content : null, Validators.required],
        id: this.edit ? data.id : null,
        link: [this.edit ? data.link : null, Validators.required],
        picture: [this.edit ? data.picture : null, Validators.required],
        status: [this.edit ? data.status : 'online'],
        title: [this.edit ? data.title : null, Validators.required],
        type: [this.edit ? data.type : this.type],
        version: [this.edit ? data.version : null, Validators.required],
        create_date: [this.edit ? data.createDate : date],
      });
    }
    if (this.type === 'presentation') {
      this.dataForm = this.formBuilder.group({
        author: [this.edit ? data.author : author],
        content: [this.edit ? data.content : null, Validators.required],
        id: this.edit ? data.id : null,
        title: [this.edit ? data.title : null, Validators.required],
        type: [this.edit ? data.type : this.type],
        create_date: [this.edit ? data.createDate : date],
      });
    }
    this.article = this.dataForm.value;
  }
  public get f(): any { return this.dataForm.controls; }
}
