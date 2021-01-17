import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/categoria';
import { Produto } from '../model/produto';
import { Usuario } from '../model/usuario';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';
import { MidiaService } from '../service/midia.service';
import { ProdutoService } from '../service/produto.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css']
})
export class MinhaContaComponent implements OnInit {

  tipoProduto: number = 1
  testeTipo!: string 
  sexo!: string

  public paginaAtual = 1;
  idProd!: number
  idCate!: number
  produto: Produto = new Produto()
  listaProduto!: Produto[]
  categoria: Categoria = new Categoria()
  listaCategoria!: Categoria[]

  env = environment;

  carrinho: Produto = new Produto()
  listaCarrinho!: Produto[]

  foto!: File

  usuario: Usuario = new Usuario()

  senha!: string
  confirmarSenha!: string

  idUsuario: number = Number(localStorage.getItem('id'))
  
  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private midiaService: MidiaService,
    private alert: AlertasService
  ) { }



  ngOnInit(){
    window.scroll(0,0)

    this.findAllCategorias()
    this.findAllProdutos()
    this.getByIdUsuario()
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

  findByIdCategoria(id : number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp : Categoria)=> {
      this.categoria = resp
    })
  }

  publicarAnuncio() {

    if(this.testeTipo == '1'){
      this.tipoProduto = 1
    }else if(this.testeTipo == '3'){
      this.tipoProduto = 3
    }else{
      this.tipoProduto = 5
    }
    
    this.findByIdCategoria(this.tipoProduto)

    if (this.produto.nome == null || this.produto.quantidade < 1 || this.produto.preco == null || this.produto.foto == null || this.tipoProduto == null) {
      this.alert.showAlertDanger('Preencha todos os campos antes de publicar')
    } else {
      if (this.foto != null) {
        this.midiaService.uploadPhoto(this.foto).subscribe((resp: any) => {
          this.produto.foto = resp.secure_url

          this.produto.categoria = this.categoria
          this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
            this.produto = resp
            this.produto = new Produto()
            this.alert.showAlertSuccess('Produto anunciado com sucesso!')
            this.findAllProdutos()
          })
        })
      } else {
        this.produto.categoria = this.categoria
        this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=> {
          this.produto = resp
          
          this.produto = new Produto()
          this.alert.showAlertSuccess('Produto anunciado com sucesso!')
          this.findAllProdutos()
        })
      }
    }
  }

  btnDelete(){
    this.produtoService.deleteProduto(this.idProd).subscribe(()=>{
      this.router.navigate(['/minhaConta'])
      this.alert.showAlertDanger('Produto excluido com sucesso!')
      window.location.reload()
    })
  }

  identificarId(id: number){
    this.idProd = id
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto = resp
      })
  }

  salvar(){  
    if(this.testeTipo == '1'){
      this.tipoProduto = 1
    }else if(this.testeTipo == '3'){
      this.tipoProduto = 3
    }else{
      this.tipoProduto = 5
    }
    if(this.tipoProduto == null){
      this.alert.showAlertDanger('Preencha todos os campos corretamente antes de enviar')
    }else{
      this.findByIdCategoria(this.tipoProduto)
      this.produto.categoria = this.categoria
  
      this.produtoService.putProduto(this.produto).subscribe((resp: Produto)=>{
      this.produto = resp
      this.router.navigate(['/minhaConta'])
      this.alert.showAlertInfo('Postagem alterada com sucesso')
      window.location.reload()
      })

    }
    
  }
  
  
carregarImagemPreview(event: any) {
  this.foto = event.target.files[0]
  let url = URL.createObjectURL(this.foto);
  (<HTMLImageElement>document.querySelector('img#imagem-preview'))!.src = url
}

getByIdUsuario(){
  this.usuarioService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) =>{
    this.usuario = resp
  })
}

atualizarDados(){

  if(this.senha == this.confirmarSenha){

    this.usuario.senha = this.senha
    this.usuarioService.putUsuario(this.usuario).subscribe((resp: Usuario) =>{
      this.usuario = resp
      localStorage.setItem('nome', this.usuario.nome)
      this.env.email = this.usuario.email
      this.env.senha = this.usuario.senha
      this.alert.showAlertSuccess('Dados Alterados com sucesso')
      window.location.reload()
      window.scroll(0,0)
    })

  }


  
  
}

}
