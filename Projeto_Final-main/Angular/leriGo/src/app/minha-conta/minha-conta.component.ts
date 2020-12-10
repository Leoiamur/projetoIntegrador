import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Produto } from '../model/produto';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css']
})
export class MinhaContaComponent implements OnInit {

  idCate!: number
  produto: Produto = new Produto()
  listaProduto!: Produto[]
  categoria: Categoria = new Categoria
  listaCategoria!: Categoria[]
  
  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(){

    this.findAllCategorias()
    this.findAllProdutos()
  }

  findAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProduto = resp
    })
  }

  findAllCategorias(){
    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[])=> {
      this.listaCategoria = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCate).subscribe((resp : Categoria)=> {
      this.categoria = resp
    })
  }

  publicarAnuncio(){
    this.categoria.idCategoria= this.idCate

    if(this.produto.nome == null || this.produto.quantidade < 1 || this.produto.preco == null || this.produto.foto == null){
      alert('Preencha todos os campos antes de publicar')
    } else{

      this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=> {
        this.produto = resp
        this.produto = new Produto()
        alert('Produto anunciado com sucesso!')
        this.findAllProdutos()
      })
    }
  }
}
