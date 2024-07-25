"use client"
import { FormProps } from '../../app/types/propTypes'
import React from 'react'
import { FormContainer, FormTitle } from './FormElements'



const Form = ({ children }: FormProps) => {
    return (
        <FormContainer>
            <FormTitle>Login</FormTitle>
            {children}
        </FormContainer>
    )
}

export default Form