import React from "react";
import { Grid, Text } from "../elements";



const Radio = (props) => {
  const {_onClick, _value} = props;
  return (
      <>
      <Grid flex margin='2vh auto' width='80%'>
          <Grid flex>
              <Grid flex width='25%' justify='center'>
                <Text width='max-content' margin='0 5px 0 0'>벨로그</Text>
                <input type="radio" name='blog' value='velog' onClick={_onClick} defaultChecked={_value === 'velog' ? true : false}/>
              </Grid>
              <Grid flex width='25%' justify='center'>
                <Text width='max-content' margin='0 5px 0 0'>티스토리</Text>
                <input type="radio" name='blog' value='tistory' onClick={_onClick} defaultChecked={_value === 'tistory' ? true : false}/>
              </Grid>
              <Grid flex width='25%' justify='center'>
                <Text width='max-content' margin='0 5px 0 0'>GitHub 블로그</Text>
                <input type="radio" name='blog' value='githubblog' onClick={_onClick} defaultChecked={_value === 'githubblog' ? true : false}/>
              </Grid>
              <Grid flex width='25%' justify='center'>
                <Text width='max-content' margin='0 5px 0 0'>네이버</Text>
                <input type="radio" name='blog' value='naver' onClick={_onClick} defaultChecked={_value === 'naver' ? true : false}/>
              </Grid>
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