import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  error$: BehaviorSubject<HttpErrorResponse> =
    new BehaviorSubject<HttpErrorResponse>({} as HttpErrorResponse);

  constructor(private metaService: Meta, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setTags();
    this.createError();
  }

  private setTags(): void {
    this.metaService.updateTag({
      property: 'og:title',
      content: 'CEIoT - Error',
    });
    this.metaService.updateTag({
      name: 'description',
      content: 'CEIoT - Error',
    });
  }

  private createError(): void {
    let errorCode: number;
    let error: HttpErrorResponse;

    if (Number(this.route.snapshot.paramMap.get('code'))) {
      errorCode = Number(this.route.snapshot.paramMap.get('code'));
    } else {
      errorCode = 404;
    }

    switch (errorCode) {
      case 400:
        error = new HttpErrorResponse({
          error: 'Bad Request',
          status: errorCode,
        });
        break;
      case 401:
        error = new HttpErrorResponse({
          error: 'Unauthorized',
          status: errorCode,
        });
        break;
      case 403:
        error = new HttpErrorResponse({
          error: 'Forbidden',
          status: errorCode,
        });
        break;
      case 404:
        error = new HttpErrorResponse({
          error: 'Not Found',
          status: errorCode,
        });
        break;
      case 429:
        error = new HttpErrorResponse({
          error: 'Too Many Request',
          status: errorCode,
        });
        break;
      case 500:
        error = new HttpErrorResponse({
          error: 'Internal Server Error',
          status: errorCode,
        });
        break;
      case 502:
        error = new HttpErrorResponse({
          error: 'Bad Gateway',
          status: errorCode,
        });
        break;
      case 503:
        error = new HttpErrorResponse({
          error: 'Service unavailable',
          status: errorCode,
        });
        break;
      default:
        error = new HttpErrorResponse({
          error: 'Not Found',
          status: 404,
        });
        break;
    }

    this.error$.next(error);
  }
}
