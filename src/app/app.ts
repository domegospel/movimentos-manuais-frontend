import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Produto } from './models/produto.model';
import { ProdutoCosif } from './models/produto-cosif.model';
import {
  MovimentoManual,
  MovimentoManualRequest
} from './models/movimento-manual.model';

import { ProdutoService } from './services/produto.service';
import { ProdutoCosifService } from './services/produto-cosif.service';
import { MovimentoManualService } from './services/movimento-manual.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('movimentos-manuais-frontend');

  produtos: Produto[] = [];
  cosifs: ProdutoCosif[] = [];
  movimentos: MovimentoManual[] = [];

  formularioHabilitado = false;
  carregando = false;
  mensagemErro = '';
  mensagemSucesso = '';

  movimentoRequest: MovimentoManualRequest = this.criarFormularioVazio();

  constructor(
    private readonly produtoService: ProdutoService,
    private readonly produtoCosifService: ProdutoCosifService,
    private readonly movimentoManualService: MovimentoManualService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarMovimentos();
  }

  novo(): void {
    this.formularioHabilitado = true;
    this.carregando = false;
    this.mensagemErro = '';
    this.mensagemSucesso = '';
    this.movimentoRequest = this.criarFormularioVazio();
    this.cosifs = [];

    this.changeDetectorRef.detectChanges();
  }

  limpar(): void {
    this.movimentoRequest = this.criarFormularioVazio();
    this.cosifs = [];
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    this.changeDetectorRef.detectChanges();
  }

  incluir(): void {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.validarFormulario()) {
      this.changeDetectorRef.detectChanges();
      return;
    }

    this.carregando = true;
    this.changeDetectorRef.detectChanges();

    this.movimentoManualService.incluirMovimento(this.movimentoRequest)
      .subscribe({
        next: (movimentoIncluido) => {
          this.movimentos = [...this.movimentos, movimentoIncluido];

          this.mensagemSucesso = 'Movimento manual incluído com sucesso.';
          this.formularioHabilitado = false;
          this.movimentoRequest = this.criarFormularioVazio();
          this.cosifs = [];
          this.carregando = false;

          this.carregarMovimentos();
          this.changeDetectorRef.detectChanges();
        },
        error: (erro) => {
          this.mensagemErro = this.obterMensagemErro(erro);
          this.carregando = false;

          this.changeDetectorRef.detectChanges();
        }
      });
  }

  carregarCosifsPorProduto(): void {
    this.movimentoRequest.codCosif = '';
    this.cosifs = [];

    if (!this.movimentoRequest.codProduto) {
      return;
    }

    this.produtoCosifService
      .listarCosifsPorProduto(this.movimentoRequest.codProduto)
      .subscribe({
        next: (cosifs) => {
          this.cosifs = cosifs;
          this.changeDetectorRef.detectChanges();
        },
        error: () => {
          this.mensagemErro = 'Erro ao carregar os COSIFs do produto.';
          this.changeDetectorRef.detectChanges();
        }
      });
    }

    private carregarProdutos(): void {
    this.produtoService.listarProdutos()
      .subscribe({
        next: (produtos) => {
          this.produtos = produtos;
          this.changeDetectorRef.detectChanges();
        },
        error: () => {
          this.mensagemErro = 'Erro ao carregar produtos.';
          this.changeDetectorRef.detectChanges();
        }
      });
    }

    private carregarMovimentos(): void {
    this.movimentoManualService.listarMovimentos()
      .subscribe({
        next: (movimentos) => {
          this.movimentos = movimentos;
          this.changeDetectorRef.detectChanges();
        },
        error: () => {
          this.mensagemErro = 'Erro ao carregar movimentos manuais.';
          this.changeDetectorRef.detectChanges();
        }
      });
    }

    private validarFormulario(): boolean {
      if (!this.movimentoRequest.mes) {
        this.mensagemErro = 'Informe o mês.';
        return false;
      }

      if (this.movimentoRequest.mes < 1 || this.movimentoRequest.mes > 12) {
        this.mensagemErro = 'O mês deve estar entre 1 e 12.';
        return false;
      }

      if (!this.movimentoRequest.ano) {
        this.mensagemErro = 'Informe o ano.';
        return false;
      }

      if (!this.movimentoRequest.codProduto) {
        this.mensagemErro = 'Selecione o produto.';
        return false;
      }

      if (!this.movimentoRequest.codCosif) {
        this.mensagemErro = 'Selecione o COSIF.';
        return false;
      }

      if (!this.movimentoRequest.valor || this.movimentoRequest.valor <= 0) {
        this.mensagemErro = 'Informe um valor maior que zero.';
        return false;
      }

      if (!this.movimentoRequest.descricao?.trim()) {
        this.mensagemErro = 'Informe a descrição.';
        return false;
      }

      return true;
    }

    private criarFormularioVazio(): MovimentoManualRequest {
      return {
        mes: null,
        ano: null,
        codProduto: '',
        codCosif: '',
        valor: null,
        descricao: ''
      };
    }

    private obterMensagemErro(erro: any): string {
      if (erro?.error?.mensagens?.length) {
        return erro.error.mensagens.join(' ');
      }

      if (erro?.error?.message) {
        return erro.error.message;
      }

      return 'Erro ao processar a solicitação.';
    }

    podeIncluir(): boolean {
      return this.formularioHabilitado &&
        !this.carregando &&
        !!this.movimentoRequest.mes &&
        this.movimentoRequest.mes >= 1 &&
        this.movimentoRequest.mes <= 12 &&
        !!this.movimentoRequest.ano &&
        !!this.movimentoRequest.codProduto &&
        !!this.movimentoRequest.codCosif &&
        !!this.movimentoRequest.valor &&
        this.movimentoRequest.valor > 0 &&
        !!this.movimentoRequest.descricao?.trim();
    }
}
