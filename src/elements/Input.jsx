import React from "react";
import styled from "styled-components";

import { Text, Grid } from ".";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
    padding,
    _defaultValue,
  } = props;

  const styles = {padding};

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          value={value} //value 미리 넘겨줌(수정 버튼 클릭 후 기존 데이터 뜨게)
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        {is_submit ? (_defaultValue ? (
            <ElInput
            {...styles}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            defaultValue={_defaultValue} 
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          />
        ):(
          <ElInput
            {...styles}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value} 
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          />
        )) : (
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        )}
      </Grid>
    </React.Fragment>
  );
};

//onchange(콜백함수)
Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: '', //15번 라인과 연결
  is_submit: false,
  onSubmit: () => {},
  _onChange: () => {},
  padding: false,
  _defaultValue: null,
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 0;
  outline: 0;
  border-bottom: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
`;

export default Input;
