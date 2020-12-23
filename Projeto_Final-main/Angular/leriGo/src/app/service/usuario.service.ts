import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../model/usuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private usuarioLogin: UsuarioLogin
  ) { }

  
}
