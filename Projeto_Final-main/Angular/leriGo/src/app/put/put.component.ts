import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../model/categoria';
import { Produto } from '../model/produto';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-put',
  templateUrl: './put.component.html',
  styleUrls: ['./put.component.css']
})
export class PutComponent implements OnInit {

  idProd!: number
  produto: Produto = new Produto()
  categoria: Categoria = new Categoria()
  listaCategoria!: Categoria[]
  idCate!: number
  listaProduto!: Produto []



  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.idProd = this.route.snapshot.params['idProduto']
    this.findByIdProduto(this.idProd)
  }

  findByIdProduto(id: number){
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=>{
    this.produto = resp
    })
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

  findByIdCategoria(id: number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp : Categoria)=> {
      this.categoria = resp
    })
  }
  salvar(){
    

    this.produtoService.putProduto(this.produto).subscribe((resp: Produto)=>{
    this.produto = resp
    this.router.navigate(['/minhaConta'])
    alert('Postagem alterada com sucesso')
    }, err =>{
      if(err.status == '500'){
        alert('Preencha todos os campos corretamente antes de enviar')
      }
    })
  }

}
