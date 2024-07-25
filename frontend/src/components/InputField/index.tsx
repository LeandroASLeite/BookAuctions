"use client"
import { InputFIeldProps } from '../../app/types/propTypes'
import React from 'react'
import { Container, Input, Label } from './InputFieldElements'

type Props = {}

const InputField = ({ label, type }: InputFIeldProps) => {
    return (
        <Container>
            <Input type={type} placeholder='' />
            <Label>
                {label}
            </Label>
        </Container>
    )
}

export default InputField