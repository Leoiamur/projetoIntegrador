import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { refresh } from 'aos';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/categoria';
import { Produto } from '../model/produto';
import { AuthService } from '../service/auth.service'
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tipoCategoria!: string
  listaCategoria!: Categoria[]
  categoria: Categoria = new Categoria()
  listaProduto!: Produto[]
  produto: Produto = new Produto()
  nomeProduto!: string
  env = environment;
  
  constructor(
    private router: Router,
    public auth: AuthService,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
    ) { }

  ngOnInit(){
    this.nome()
  }

  nome(){
    let Login = localStorage.getItem('nome')
    if(Login == null || Login == undefined || Login == ""){
      return new String("Logar")
    }else{
      return new String (Login)
    }
  }

  verificarLogin(){

    let Login = localStorage.getItem('nome')

    if(Login == "Logar" || Login == "" || Login == " " || Login == null || Login == undefined){
      this.router.navigate(['/login'])
    }else{
      this.router.navigate(['/minhaConta'])
    }

  }

  findAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProduto = resp
    })
  }

  findByNomeProdutos() {
    if (this.nomeProduto === ''){
      this.findAllProdutos()
    } else{
      this.produtoService.getByNomeProduto(this.nomeProduto).subscribe((resp: Produto[]) => {
        this.listaProduto = resp
        this.router.navigate(['/get-nome'])
      })
    }
  }
  
  findAllCategorias(){
    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[])=> {
      this.listaCategoria = resp
    })
  }
  
  findByTipoCategoria() {
    if (this.tipoCategoria === ''){
      this.findAllCategorias()
    } else{
      this.categoriaService.getByTipoCategoria(this.tipoCategoria).subscribe((resp: Categoria[]) => {
        this.listaCategoria = resp
      })
    }
  }

  sair(){
    this.router.navigate(['/login'])
    localStorage.clear()
    environment.id = 0
    environment.nome = "Logar"
    environment.email = ""
    environment.senha = ""
  }

  pesquisar(){
    if(this.router.url == '/get-nome'){
      this.router.navigate(['/get-nome', this.nomeProduto])
    }else{
      this.router.navigate(['/get-nome', this.nomeProduto])
    }
  }
}