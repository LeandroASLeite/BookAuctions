import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    transition: all 0.5s;
    width:30%;
    height: 70%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    padding: 0 2 rem;

        @media(max-width: 1024px){
            width: 50%;
        }
        @media(max-width: 768px){
            box-shadow:none;
            width:100;
        }

`

export const FormTitle = styled.h2`
    text-align:center;
    color: rgba (0, 0, 0, 0.5);
    font-size: 1rem;
    padding: 1rem;
`