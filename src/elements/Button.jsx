import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
    const {children, text, width, bgc, color, radius, height, margin, float_btn, _onClick, _disabled, minWidth} = props;

    const styles = {
        width, bgc, color, radius, height, margin, float_btn, _onClick, minWidth
    };

    if(float_btn){
        return(
            <FloatButton onClick={_onClick} />
        ) 
    }

    return (
        <>
            <B {...styles} onClick={_onClick} disabled={_disabled}>
                {text ? text : children}
            </B>
        </>
    );
};

Button.defaultProps={
    text: false,
    children: false,
    width: '100%',
    height: '50px',
    bgc: '#000',
    color: '#fff',
    radius: '25px',
    margin: false,
    float_btn: false,
    _onClick: ()=>{},
    _disabled: false,
    minWidth: false,
}

const B = styled.button`
    display: block;
    background-color: ${props => props.bgc ? props.bgc : 'transparent'};
    color: ${props => props.color};
    border: 0;
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: ${props => props.radius};
    ${props => props.margin? `margin: ${props.margin};` : ''}
    ${props => props.minWidth? `min-width: ${props.minWidth};` : ''}
    cursor: pointer;
    transition: 0.3s;

    &:disabled {
        opacity: 0.7;
    }
`;

const FloatButton = styled.button`
    width: 50px; 
    height: 50px;
    border-radius: 50%;
    background-color: #212121;
    border: none;
    position: fixed;
    right: 16px;
    bottom: 50px;
    cursor: pointer;

    &:before{
        content: '';
        display: block;
        width: 25px;
        height: 6px;
        border-radius: 6px;
        background-color: #fff;
        position: absolute;
        left: calc(50% - 12.5px);
        top: calc(50% - 3px);
    }

    &:after{
        content: '';
        display: block;
        width: 6px;
        height: 25px;
        border-radius: 6px;
        background-color: #fff;
        position: absolute;
        left: calc(50% - 3px);
        top: calc(50% - 12.5px);
    }
`

export default Button;