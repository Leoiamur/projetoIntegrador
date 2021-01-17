import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-perfil-lateral',
  templateUrl: './perfil-lateral.component.html',
  styleUrls: ['./perfil-lateral.component.css']
})
export class PerfilLateralComponent implements OnInit {

  usuario : Usuario = new Usuario()

  idUsuario : number = Number(localStorage.getItem('id'))
  
  constructor(
    private usuarioService : UsuarioService
  ) { }

  ngOnInit(){
    this.getByIdUsuario()
  }

  getByIdUsuario(){
    this.usuarioService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) =>{
      this.usuario = resp
    })
  }

}
