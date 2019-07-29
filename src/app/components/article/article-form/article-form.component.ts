import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/class/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-form',
  styleUrls: ['./article-form.component.css'],
  templateUrl: './article-form.component.html',
})
export class ArticleFormComponent implements OnInit {
  public article: Article;
  private edit = false;
  private type: string;
  private dataForm: FormGroup;
  private submitted = false;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    public router: Router) { }

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
            const payload = this.authService.getDecodedToken();
            if ((article.author !== payload.username) && !this.authService.haveRoles('ROLE_ADMIN')) {
              this.router.navigate(['/acces-refuse']);
              return;
            }
            article.locationX = article['location_x'];
            article.locationY = article['location_y'];
            this.type = article.type;
            this.initForm(article);
          });
        this.edit = this.route.snapshot.data['edit'];
      }
    });
  }
  private initForm(data?: Article): void {
    const payload = this.authService.getDecodedToken();

    this.dataForm = this.formBuilder.group({
      author: [this.edit ? data.author : payload.username],
      content: [this.edit ? data.content : null, [Validators.required, Validators.maxLength(10000)]],
      id: this.edit ? data.id : null,
      status: [this.edit ? data.status : 'online'],
      title: [this.edit ? data.title : null, [Validators.required, Validators.maxLength(255)]],
      type: [this.edit ? data.type : this.type],
    });
    if (this.type === 'ground') {
      this.dataForm.addControl(
        'location_x', new FormControl(this.edit ? data.locationX : null, Validators.required));
      this.dataForm.addControl(
        'location_y', new FormControl(this.edit ? data.locationY : null, Validators.required));
      this.dataForm.addControl(
        'picture', new FormControl(this.edit ? data.picture : null, [Validators.required, Validators.maxLength(1000)]));
    }
    if (this.type === 'plugin') {
      this.dataForm.addControl(
        'link', new FormControl(this.edit ? data.link : null, [Validators.required, Validators.maxLength(1000)]));
      this.dataForm.addControl(
        'version', new FormControl(this.edit ? data.version : null, [Validators.required, Validators.maxLength(50)]));
      this.dataForm.addControl(
        'picture', new FormControl(this.edit ? data.picture : null, [Validators.required, Validators.maxLength(1000)]));
    }
    this.article = this.dataForm.value;
  }
  public get f(): any { return this.dataForm.controls; }
}
