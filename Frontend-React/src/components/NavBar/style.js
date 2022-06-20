import styled from "styled-components";

export const NavbarContainer = styled.div`
width: 100%;

.container {
  display: flex;
  height: 6rem;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
  padding: 1.5rem;
  padding-right: 4rem;
  padding-left: 4rem;
}

.itens {
  display: flex;
  align-items: center;
  
}

.close {
  margin-left: 3rem;
}

.btn{
  /* 'cd-orange': '#F58A1F',
  'cd-blue': '#273338',
  'cd-blue-2': '#282c34',
  'cd-tela':'#cccc' */
  width: 100%;
  background-color: #273338;
  color: #FFF;
  position: relative;
  font-weight: 700;  
  align-items: center;
  width: 10rem;
  height: 3rem;  
  border-radius: 0.375rem;
}

.close {
  width: 100%;
}

.btn:hover{
  background-color: #F58A1F;
  color: #000;
  cursor: pointer;
}
`;