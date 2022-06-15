//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;

library Math {
    /**
     * @dev Devolve a adição de dois números inteiros não assinados, revertendo em
     * overflow.
     *
     * Contrapartida para o operador `+` da Solidity.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "Math: addition overflow");

        return c;
    }

    /**
     * @dev Devolve a subtração de dois inteiros não assinados, revertendo com mensagem personalizada em overflow (quando o resultado é negativo).
     *
     * Contrapartida para o operador da Solidity `-'.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "Math: subtraction overflow");
    }

    /**
     * @dev Devolve a subtração de dois inteiros não assinados, revertendo com mensagem personalizada em overflow (quando o resultado é negativo).
     *
     * Contrapartida para o operador da Solidity `-'.
     *
     * Requisitos:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Devolve a multiplicação de dois números inteiros não assinados, revertendo em
     * overflow.
     *
     * Contrapartida para o operador da Solidity `*'.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: isto é mais barato do que requerer 'a' não ser zero, mas o
        // o benefício é perdido se 'b' também for testado.
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "Math: multiplication overflow");

        return c;
    }

    /**
     * @dev Devolve a divisão inteira de dois números inteiros não assinados. Reverte em
     * divisão por zero. O resultado é arredondado para zero.
     *
     * Contrapartida para o operador da Solidity `/'. Nota: esta função utiliza um
     * "reverter" opcode (que deixa o gás restante intocado) enquanto Solidity
     * utiliza um opcode inválido para reverter (consumindo todo o gás restante).
     *
     * Requisitos:
     * - O divisor não pode ser zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "Math: division by zero");
    }

    /**
     * @dev Devolve a divisão inteira de dois números inteiros não assinados. Reverte com mensagem personalizada em divisão por zero. O resultado é arredondado para zero.
     *
     * Contrapartida para o operador da Solidity `/'. Nota: esta função utiliza um
     * "reverter" opcode (que deixa o gás restante intocado) enquanto Solidity
     * utiliza um opcode inválido para reverter (consumindo todo o gás restante).
     *
     * Requisitos:
     * - O divisor não pode ser zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Devolve o resto da divisão de dois números inteiros não assinados. (módulo de inteiros não assinados),
     * Reverte quando se divide por zero.
     * Contrapartida para o operador `%` da Solidity. Esta função utiliza um `revertido`.
     * opcode (que deixa o gás remanescente intocado) enquanto a Solidity utiliza um
     * opcode inválido para reverter (consumindo todo o gás restante).
     *
     * Requisitos:
     * - O divisor não pode ser zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "Math: modulo by zero");
    }

    /**
     * @dev Retorna o resto da divisão de dois números inteiros não assinados. (módulo de inteiros não assinados),
     * Reverte com mensagem personalizada quando se divide por zero.
     
     * Contrapartida para o operador `%` da Solidity. Esta função utiliza um `revertido`.
     * opcode (que deixa o gás remanescente intocado) enquanto a Solidity utiliza um
     * opcode inválido para reverter (consumindo todo o gás restante).
     *
     * Requisitos:
     * - O divisor não pode ser zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }

    function minorOrEqual(uint256 a, uint256 b, string memory errorMessage) internal pure returns (bool) {
        require(a <= b, errorMessage);
        return true;
    }

    function greaterOrEqual(uint256 a, uint256 b, string memory errorMessage) internal pure returns (bool) {
        require(a >= b, errorMessage);
        return true;
    }

    function minorThan(uint256 a, uint256 b, string memory errorMessage) internal pure returns (bool) {
        require(a < b, errorMessage);
        return true;
    }

    function greaterThan(uint256 a, uint256 b, string memory errorMessage) internal pure returns (bool) {
        require(a > b, errorMessage);
        return true;
    }
}