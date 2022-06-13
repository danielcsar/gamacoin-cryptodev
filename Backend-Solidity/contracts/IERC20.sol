//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {
    /**
     * @dev Devolve a quantidade de tokens existentes.
     */
    function getTotalSupply() external view returns (uint256);

    /**
     * @dev Devolve a quantidade de tokens que pertencem à "account".
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev movimenta tokens de "amount" da conta do chamador para "recipient".
     *
     * Devolve um valor booleano indicando se a operação foi bem sucedida.
     *
     * Emite um evento de {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Devolve o número restante de tokens que "spender" será
     * autorizado a gastar em nome do 'owner' através de {transferFrom}. Isto é
     * zero por defeito.
     *
     * Este valor muda quando {approve} ou {transferFrom} são chamados.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Define o "amount" como o subsídio de "spender" sobre os tokens do chamador.
     *
     * Devolve um valor booleano indicando se a operação foi bem sucedida.
     *
     * Emite um evento de {Approve}.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev move fichas de "amount" do "sender" para o "recipient" utilizando o
     * mecanismo de allowance. O "amount" é então deduzido do allowance.
     *
     * Devolve um valor booleano indicando se a operação foi bem sucedida.
     *
     * Emite um evento de {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitido quando os tokens de "value" são movidas de uma conta (`from') para
     * outro (`to`).
     *
     * Note-se que o "value" pode ser zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitido quando o allowance de um "spender" para um "owner" é fixado por
     * uma chamada para {approve}. {value} é o novo subsídio.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}