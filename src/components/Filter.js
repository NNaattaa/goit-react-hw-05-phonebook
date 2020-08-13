import React, { Component } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import scaleTransition from './transitions/scale.module.css';

const Container = styled.div`
  margin-bottom: 3rem;
  max-width: 54rem;
  box-shadow: 0px 2px 8px -3px rgba(0, 0, 0, 0.75);
  padding: 1.4rem 1.6rem;
`;

const Label = styled.label`
  font-size: 2rem;
  cursor: pointer;
`;

const Input = styled.input`
  font-size: 2.2rem;
  width: 100%;
  margin-top: 0.4rem;
  padding: 1.4rem 1.2rem 1.2rem;
  border-radius: 0.6rem;
  &:focus {
    border-color: #1d2bcc;
  }
`;

class Filter extends Component {
  state = {
    appear: false,
  };

  componentDidMount() {
    const { contacts } = this.props;
    if (contacts.length <= 1) {
      return;
    }
    this.setState({
      appear: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.contacts.length !== this.props.contacts.length) {
      const { contacts } = this.props;
      if (contacts.length > 1) {
        return this.toAppear();
      }
      if (contacts.length <= 1) {
        return this.toUnAppear();
      }
    }
  }

  toAppear = () => {
    this.setState({
      appear: true,
    });
  };

  toUnAppear = () => {
    this.setState({
      appear: false,
    });
  };

  render() {
    const { appear } = this.state;
    const { value, onChangeFilter } = this.props;

    return (
      <CSSTransition
        timeout={250}
        classNames={scaleTransition}
        in={appear}
        unmountOnExit
      >
        <Container>
          <Label>
            Find contacts by name
            <Input
              type="text"
              value={value}
              onChange={({ target: { value } }) => onChangeFilter(value)}
            />
          </Label>
        </Container>
      </CSSTransition>
    );
  }
}

export default Filter;
