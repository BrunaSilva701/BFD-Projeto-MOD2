```text
               +--------------------------------+
               |            Produto             |
               +--------------------------------+
               | + nome: string                 |
               | + codigo: string               |
               | + preco: number                |
               | - quantidade: number           |
               |                                |
               +--------------------------------+
               | + getQtd(): number             |
               | + setQtd(valor: number): void  |
               | + adicionar(qtd: number): void |
               | + remover(qtd: number): void   |
               +--------------------------------+
                               ^
                               |
                    +----------------------+
                    |   Movimentacao       |
                    +----------------------+
                    | + produtos: Produto  |
                    | + data: Date         |
                    | + quantidade: number |
                    +----------------------+
                    | + registrar(): void  |
                    +----------------------+
                        ^               ^
                        |               |
       +--------------------+   +--------------------+
       |     Entrada        |   |        Saida       |
       +--------------------+   +--------------------+
       | + registrar():void |   | + registrar():void |
       +--------------------+   +--------------------+
          
          
+--------------------------------------+
|                  Estoque             |
+--------------------------------------+
| - produtos: Produto[] = []           |
| - movimentacoes: Movimentacao[] = [] |
+--------------------------------------+
| + cadastrarProduto(p: Produto): void |
| + registrarEntrada(e: Entrada): void |
| + registrarSaida(s: Saida): void     |
| + historioco():void                  |
| + relatorio(): void                  |
+--------------------------------------+
         |                  |
         ∨                  ∨
  +----------+      +--------------+
  | Produto  |      | Movimentacao |
  +----------+      +--------------+
