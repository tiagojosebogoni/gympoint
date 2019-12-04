import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  background: #333;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`
export const Content = styled.div`
  width: 100%;
  max-width: 315;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #FFF;
      margin: 0 0 10px;
    }
  }
`
