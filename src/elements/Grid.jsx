import React from 'react';
import styled from 'styled-components'

const Grid = (props) => {
    const {children, width, maxWidth, height, padding, margin, flex, justify, bgc, ps, top, left, border, borderB, direction,} = props;

    const styles = {
        flex, width, maxWidth, height, padding, margin, justify, bgc, ps, top, left, border, borderB, direction
    }
    return (
        <>
            <GridBox {...styles}>
                {children}
            </GridBox>
        </>    
    );
};

Grid.defaultProps = {
    children: null,
    width: '100%',
    maxWidth: false,
    height: '100%',
    padding: false,
    margin: false,
    flex: false,
    justify: 'space-between',
    bgc: false,
    ps: false,
    top: false,
    left: false,
    border: false,
    borderB: false,
    direction: 'row'
}

const GridBox = styled.div`
    width: ${(props) => props.width};
    ${(props) => props.maxWidth ? `max-width: ${props.maxWidth};` : ''}
    height: ${(props) => props.height};
    box-sizing: border-box;
    ${(props) => props.margin ? `margin: ${props.margin};` : ''}
    ${(props) => props.padding ? `padding: ${props.padding};` : ''}
    ${(props) => props.flex ? `display: flex; align-items: center; justify-content: ${props.justify}; flex-direction: ${props.direction};` : ''}
    ${(props) => props.bgc ? `background-color: ${props.bgc};` : ''}
    ${(props) => props.ps ? `position: ${props.ps}; top: ${props.top}; left: ${props.left};` : ''}
    ${(props) => props.borderB ? `border-bottom: ${props.borderB};` : ''}
    ${(props) => props.border ? `border: ${props.border};` : ''}




`

export default Grid;