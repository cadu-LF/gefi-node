// representa os erros que o programa tiver
export default class AppError{
  public message:string;
  public statusCode:number;

  constructor(message:string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}