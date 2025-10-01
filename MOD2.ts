//Projeto de conclusão de modulo II - Monitoramento de estoque

const entrada = require ('prompt-sync')({sigint:false});

//Classe Produto
class Produto{
    nome: string;
    codigo: string;
    preco: number;
    private quantidade: number;

    constructor(nome: string, codigo: string, preco:number, quantidade: number){
        this.nome = nome;
        this.codigo= codigo;
        this.preco= preco;
        this.quantidade = quantidade;
    }

    //Acessar o valor privado (getter)
    getQtd(): number{
        return this.quantidade;
    }

    //Modificar o valor privado (setter)
    setQtd(valor: number): void{
        this.quantidade = valor;
    }
    
    //Método: Adicionar produtos
    adicionar(qtd: number): void{
        this.quantidade += qtd;
    }
    
    //Método: Remover produtos
    remover(qtd: number):void{
        //Verificar se a quantidade que se quer retirar é maior que o estoque
        if(qtd > this.quantidade){
            throw new Error('Estoque insuficiente');
        }
        this.quantidade -= qtd;
    }
}

//Classe Movimentação
abstract class Movimentacao{
    produtos: Produto;
    quantidade: number;
    //data: Date;

    constructor(produtos: Produto, quantidade: number){
        this.produtos = produtos;
        this.quantidade = quantidade;
        //this.data = new Date();
    }

    //Método para que as classes Entrada e Saída possam redefinir esse método.
    abstract registrar(): void; 
}

//Classe Entrada (herda de Movimentacao)
class Entrada extends Movimentacao{
    //Método: registra a entada de produtos
    registrar(): void{
        this.produtos.adicionar(this.quantidade);
        console.log(`Entrada registrada: +${this.quantidade} ${this.produtos.nome}`);
    }
}

//Classe Saida (herda de Movimentacao)
class Saida extends Movimentacao{
    //Método: registra a saida de produtos
    registrar():void{
        this.produtos.remover(this.quantidade)
        console.log(`Saida registrada: -${this.quantidade} ${this.produtos.nome}`)
    }
}

//Classe Estoque
class Estoque{
    produtos: Produto[] = [];
    movimentacoes: Movimentacao[] = [];

    //Método para cadastrar produto
    cadastrarProduto(p: Produto): void{
        //Verificação de quantidade negativa
        if (p.getQtd() <= 0) {
            throw new Error("Quantidade inválida!");
        }
        this.produtos.push(p);//Adiciona produto ao array (lista produtos)
    }
    //Método para adicionar produto
    registrarEntrada(e: Entrada): void{
        e.registrar(); //Executa a entrada
        this.movimentacoes.push(e);//Movimenta o array e guarda o novo valor (Lista movimentacoes)
    }
    
    //Método para retirar produto
    registrarSaida(s: Saida): void{
        s.registrar(); //Executa a saída
        this.movimentacoes.push(s); //Movimenta o array e guarda o novo valor (Lista movimentacoes)
    }

    //Relatório do estoque
    relatorio(): void{
        console.log('\n--- ESTOQUE ---');
        //Percorre o array de produtos
        for (let p of this.produtos){
            console.log(`Código: ${p.codigo} |Produto: ${p.nome} | Quantidade: ${p.getQtd()} | Preço: ${p.preco}`);
            //Verificação de estoque baixo
            if(p.getQtd() <= 2){
                console.log('⚠️ ATENÇÃO: Estoque baixo!');
            }
        }
    }
}

//----Menu interativo----
const estoque = new Estoque(); //Cria o objeto Estoque
let opcao: number;

do{
    console.log('\n--- MENU ---');
    console.log('1-Cadastrar Produto')
    console.log('2-Registrar entrada')
    console.log('3-Registar Saida')
    console.log('4-Gerar relatório de estoque')
    console.log('0-Sair do sistema')

    opcao = Number(entrada('Escolha uma opção:'));

    try{
        switch (opcao){
            //Solicita as informações do produto que deseja cadastrar
            case 1:{
                const nome = entrada('Nome do produto:');
                const codigo = entrada('Código do produto:');
                const preco = Number(entrada('Preço do produto:'));
                const quantidade = Number(entrada('Quantidade do produto:'));
                const produto = new Produto(nome, codigo, preco, quantidade); //Cria o objeto de Produto
                estoque.cadastrarProduto(produto) //Registra produto
                console.log('Produto cadastrado');
                break
            }

            //Solicita as informações do produto que deseja adicionar ao estoque
            case 2:{
                const codigo = entrada('Código do produto:');
                const qtdEntrada = Number(entrada('Quantidade: '));
                const produtoEntrada = estoque.produtos.find(p => p.codigo === codigo); //Percorre o array e verifica se o código existe
                if (!produtoEntrada) throw new Error("Produto não encontrado!"); //Mensagem de erro
                const e = new Entrada(produtoEntrada, qtdEntrada); //Cria o objeto de entrada
                estoque.registrarEntrada(e) //Registra entrada
                console.log('Entrada registrada');
                break
            }

            //Solicita as informações do produto que deseja retirar do estoque
            case 3:{
                const codigo = entrada('Código do produto:');
                const qtdSaida = Number(entrada('Quantidade: '));
                const produtoSaida = estoque.produtos.find(p => p.codigo === codigo); //Percorre o array e verifica se o código existe
                if (!produtoSaida) throw new Error("Produto não encontrado!"); //Mensagem de erro
                const s = new Saida(produtoSaida, qtdSaida); //Cria o objeto de saída
                estoque.registrarSaida(s); //Registra saída
                console.log('Saida registrada');
                break
            }

            //Gera o relatório do estoque
            case 4:{
                estoque.relatorio();
                break
            }

            //Encerra o sistema
            case 0:{
                console.log('Saindo...');
                break
            }

            //Saida para opição inválida
            default:{
                console.log('Opição não é aceita. Por favor, tente novamente!');
            }
        }
    }catch (erro){
        console.log('Error:', (erro as Error).message);
    }
    
}while(opcao !== 0)
