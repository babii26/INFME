export interface user {
  _id: string; 
  firstName       : string;
  lastName        : string;
  dataNascimento  : Date;
  genero          : string;
  email           : String;
  nrTelemovel     : Number;
  tipoUtilizador  : String;
  estadoUtilizador: Boolean;
  password        : String;
  isAdmin         : Boolean;
}
