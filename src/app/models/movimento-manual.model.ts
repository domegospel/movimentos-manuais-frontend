export interface MovimentoManual {
  mes: number;
  ano: number;
  numeroLancamento: number;
  codProduto: string;
  desProduto: string;
  codCosif: string;
  codClassificacao: string;
  descricao: string;
  dataMovimento: string;
  codUsuario: string;
  valor: number;
}

export interface MovimentoManualRequest {
  mes: number | null;
  ano: number | null;
  codProduto: string;
  codCosif: string;
  valor: number | null;
  descricao: string;
}
