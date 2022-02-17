import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
    const {margin, children, size, width, color, space, bold, } = props;
    const styles = {margin, size, width, color, space, bold, }
    return (
        <>
            <P {...styles}>
                {children}
            </P>
        </>
    );
};

Text.defaultProps = {
    margin: '0',
    children: null,
    size: '14px',
    bold: '400',
    width: 'max-content',
    color: '#12171f',
    space: '-0.02em'
};

const P = styled.p`
    font-size: ${props => props.size}; 
    font-weight: ${props => props.bold};
    color: ${props => props.color};
    margin: ${props => props.margin};
    width: ${props => props.width};
    letter-spacing: ${props => props.space};
    white-space: pre-wrap;
`;

export default Text;