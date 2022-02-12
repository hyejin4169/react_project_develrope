import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
    const{shape, size, src, margin} = props;
    const styles = {size, src, margin}

    if(shape === 'circle'){
        return(
            <ImageBoxCircle {...styles}/>
        )
    }

    if(shape === 'rectangle'){
        return(
            <ImageBoxRectangleWrap {...styles}>
                <ImageBoxRectangle {...styles}/>
            </ImageBoxRectangleWrap>
        )
    }

    return (
        <>
        </>
    );
};

Image.defaultProps = {
    shape: 'rectangle',
    size: '40px',
    src: 'https://t1.daumcdn.net/cfile/blog/1676324D4DE12D7415', 
    margin: false,
}

const ImageBoxCircle = styled.div`
    --size: ${(props) => props.size}; 
    width: var(--size);
    height: var(--size);
    border-radius: 50%;

    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    ${props => props.margin ? `margin: ${props.margin};` : ''}
`;

const ImageBoxRectangleWrap = styled.div`
    width: 100%;
    min-width: 250px;
`
const ImageBoxRectangle = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-color: #f8f8f8;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`

export default Image;