import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../components/notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }
  intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    const Clone = req.clone();
    return next.handle(Clone).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {

          console.log(" all looks good");
          // http response status code
          console.log(event);

          // shows success snackbar with green background
          this.snackBar.openFromComponent(NotifierComponent, {
            data:  {
              message: event.statusText,
              dismiss: 'Cerrar',
              type: 'Success',
            },
            panelClass: 'success'
          });
          //,event.statusText,'Close'
        }
      }, error => {
     // http response status code

          console.log("Error", error);
          // show error snackbar with red background
          this.snackBar.openFromComponent(NotifierComponent, {
            data:  {
              message: error.message,
              dismiss: 'Cerrar',
              type: 'Error',
            },
            panelClass: 'error'
          });
          //error.error.message,'Close'
      })
    )
  }
}

