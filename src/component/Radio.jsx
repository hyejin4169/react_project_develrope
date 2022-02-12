import React from "react";
import { Grid, Text } from "../elements";



const Radio = (props) => {
  const {_onClick, _value} = props;
  return (
      <>
      <Grid flex margin='2vh 0'>
          <Grid flex justify='center' >
              <Text width='max-content' margin='0 3% 0 0'>벨로그</Text>
              <input type="radio" name='blog' value='velog' onClick={_onClick} defaultChecked={_value === 'velog' ? true : false}/>
              <Text width='max-content' margin='0 3% 0 0'>티스토리</Text>
              <input type="radio" name='blog' value='tistory' onClick={_onClick} defaultChecked={_value === 'tistory' ? true : false}/>
              <Text width='max-content' margin='0 3% 0 0'>GitHub 블로그</Text>
              <input type="radio" name='blog' value='githubblog' onClick={_onClick} defaultChecked={_value === 'githubblog' ? true : false}/>
              <Text width='max-content' margin='0 3% 0 0'>네이버</Text>
              <input type="radio" name='blog' value='naver' onClick={_onClick} defaultChecked={_value === 'naver' ? true : false}/>
          </Grid>
      </Grid>
      </>
  );
};

Radio.defaultProps={
  _onClick:() => {},
  _value: false,
}

export default Radio;