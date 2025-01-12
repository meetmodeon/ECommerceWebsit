import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';
import { UserStorageService } from '../services/storage/user-storage.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  //debugger;
  let authReq=req;
  const token=UserStorageService.getToken();
  if(token != null){
    authReq=authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`},
      });
  }

  return next(authReq);
};

export const authInterceptorProviders=[
  {
    provider: HTTP_INTERCEPTORS,
    useClass: customInterceptor,
    multi: true,
  },
];
