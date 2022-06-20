# 🏦 Gama Token 📚 Web 3.0

Projeto Final aplicado a Turma Blockchain CryptoDev parceria entre a Gama Academy e a Blockchain Academy.

## Backend - Solidity !

Projeto de backend composto de dois smart-contracts: `GamaCoin` - Contrato de Token ERC-20 e `GamaSale` - Contrato de Venda de Tokens.

Endereço dos contratos na Rede de testes Ropsten:

"0x0269ca8225dC83318a1836927263fabD24654C3d" - [GamaCoin](https://ropsten.etherscan.io/address/0x0269ca8225dC83318a1836927263fabD24654C3d).
"0xe099d38C8323976A853cfBf457be669a8B95C916" - [GamaSale](https://ropsten.etherscan.io/address/0xe099d38C8323976A853cfBf457be669a8B95C916).

### Como Rodar

#### Pré-requisitos

- [Nodejs](https://nodejs.org/en/) (v16 ou superior)
- [RemixIDE](https://remix.ethereum.org/)

#### Rodando o projeto

Copie os contratos disponíveis [aqui](https://github.com/danielcsar/gamacoin-cryptodev/tree/main/Backend-Solidity/contracts) para o [RemixIDE](https://remix.ethereum.org/), faça a compilação e depois o deploy do `GamaCoin.sol` e depois do `GamaSale.sol`.
Necessário especificar o `inicialSupply` (Total de tokens) no deploy do `GamaCoin` e especificar o `address` (Endereço do GamaCoin) no deploy do `GamaSale`.

Para os testes, baixe ou faça um clone do projeto [Backend-Solidity](https://github.com/danielcsar/gamacoin-cryptodev/tree/main/Backend-Solidity).

Na raiz do projeto execute os seguintes comandos:

```bash
# Instalando dependências
$ npm install
# Compilando os contratos
$ npx hardhat compile
# Rodando os testes
$ npm test
```

## Funcionalidades GamaCoin
* Funções Getters:
    * getName() - Retorna o nome do Token.
    * getSymbol() - Retorna o símbolo do token.
    * getDecimals() - Retorna o número de casas decimais após a vírgula.
    * getTotalSupply() - Retorna o total de tokens já criados pelo contrato.
    * getOwner() - Retorna o dono do contrato (address que criou o contrato).
    * getStatus() - Retorna o estado do contrato: 0 - Ativo, 1 - Pausado, 2 - Cancelado.
* Funções Públicas:
    * balanceOf(address _account) - Retorna o total de tokens do endereço `_account` fornecido.
    * allowance(address _owner, address _spender) - Retorna o total de tokens do `_owner` que o `_spender` pode movimentar.
    * transfer(address _to, uint256 _value) - Transfere o `_value` do remetente para o endereço `_to`.
    * approve(address _spender, uint256 _value) - Autoriza o endereço `_spender` a utilizar o `_value` do endereço do remetente.
    * transferFrom(address _from, address _to, uint256 _value) - Tranfere do valor `_value` do endereço `_from` para o endereço `_to`.
    * changeStatus(uint256 _status) - Troca o estado do contrato de acordo com o número fornecido: 0 - Ativo, 1 - Pausado, 2 - Cancelado, requer que seja chamada pelo proprietário.
    * kill() - Tranfere os ethers do contrato para o owner e destroi o contrato, requer que seja chamada pelo proprietário.


## Funcionalidades GamaSale
* Funções Getters & Setters:
    * getBalance() - Retorna o total de tokens no contrato.
    * getTokensSold() - Retorna o total de tokens vendidos pelo contrato.
    * getTokensPurchased() - Retorna o total de tokens comprados pelo contrato.
    * getBalanceEthers() - Retorna o total de ethers no contrato.
    * getTokenBuyPrice() - Retorna o preço de compra dos tokens.
    * getTokenSellPrice() - Retorna o preço de venda dos tokens.
    * setTokenBuyPrice(uint256 _newPrice) - Altera o preço de compra dos tokens com o `_newPrice`, requer que seja chamada pelo proprietário.
    * setTokenSellPrice(uint256 _newPrice) - Altera o preço de venda dos tokens com o `_newPrice`, requer que seja chamada pelo proprietário.
* Funções Públicas:
    * buyTokens() - Compra tokens usando ethers enviados pelo remetente (Contrato recebe ethers/Remetente recebe tokens).
    * sellTokens(uint256 _tokensToSell) - Vende os tokens `_tokensToSell` enviados pelo remetente (Contrato recebe tokens/Remetente recebe ethers)..
    * addEthers() - Adiciona ethers para o endereço do contrato, requer que seja chamada pelo proprietário.
    * addTokens(uint256 _tokens) - Adiciona tokens `_tokens` para o endereço do contrato, requer que seja chamada pelo proprietário.
    * withdrawBalance() - Transfere todos os ethers e tokens do contrato para a carteira do proprietário, requer que seja chamada pelo proprietário.



## Frontend - React !
`Em breve`.

## Desenvolvedores

Daniel         |
-------------- |
<a href="https://www.linkedin.com/in/danielcsar/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>