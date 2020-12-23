import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(
    private router: Router,
    public auth: AuthService,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
    ) { }

  ngOnInit(){
    
  }
  

  nome(){

    let token = localStorage.getItem('token')
    let Login 

    if(token != null){
      
      Login = localStorage.getItem('nome')
    }else if(token == null){
      Login = "Logar"
    }
    return new String (Login)
  }

  verificarLogin(){

    let Login = localStorage.getItem('nome')

    if(Login == null || Login == "Logar"){
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
  }

}