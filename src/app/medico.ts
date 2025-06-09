import { User } from "./user";

export interface Medico extends User{
  licençaMedica: string,
  user: string,
}