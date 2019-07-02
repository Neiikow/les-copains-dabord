import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    const payload = this.authService.getDecodedToken();
    const author = payload.username;
    const date = this.formValidator.getDate();

    this.dataForm = this.formBuilder.group({
      author: [this.edit ? data.author : author],
      content: [this.edit ? data.content : null, Validators.required],
      create_date: [this.edit ? data.createDate : date],
      id: this.edit ? data.id : null,
      title: [this.edit ? data.title : null, Validators.required],
      type: [this.edit ? data.type : this.type],
    });
    if (this.type === 'ground') {
      this.dataForm.addControl(
        'location_x', new FormControl(this.edit ? data.location_x : null, Validators.required));
      this.dataForm.addControl(
        'location_y', new FormControl(this.edit ? data.location_y : null, Validators.required));
      this.dataForm.addControl(
        'picture', new FormControl(this.edit ? data.picture : null, Validators.required));
      this.dataForm.addControl(
        'status', new FormControl(this.edit ? data.status : 'online'));
    }
    if (this.type === 'plugin') {
      this.dataForm.addControl(
        'link', new FormControl(this.edit ? data.link : null, Validators.required));
      this.dataForm.addControl(
        'picture', new FormControl(this.edit ? data.picture : null, Validators.required));
      this.dataForm.addControl(
        'status', new FormControl(this.edit ? data.status : 'online'));
      this.dataForm.addControl(
        'version', new FormControl(this.edit ? data.version : null, Validators.required));
    }
    this.article = this.dataForm.value;
  }
  public get f(): any { return this.dataForm.controls; }
}
