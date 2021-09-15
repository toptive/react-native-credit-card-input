import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";

import Icons from "./Icons";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";

const INFINITE_WIDTH = 1000;

const s = StyleSheet.create({
  mainWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 0.8,
    justifyContent: "space-around",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    width: 48,
    height: 40,
    resizeMode: "contain",
  },
  expanded: {
    flex: 1,
  },
  hidden: {
    width: 0,
  },
  leftPart: {
    overflow: "hidden",
  },
  rightPart: {
    overflow: "hidden",
    flexDirection: "row",
  },
  last4: {
    flex: 1,
    justifyContent: "center",
  },
  numberInput: {
    width: INFINITE_WIDTH,
  },
  expiryInput: {
    width: Dimensions.get('window').width - 60,
  },
  cvcInput: {
    width: 80,
  },
  last4Input: {
    width: 60,
    marginLeft: 20,
  },
  input: {
    height: 40,
    color: "black",
    borderRightWidth: 1,
  },
  iconContainer: {
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#edf4fa",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#edf4fa",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  }
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CreditCardNumberWithExpiry extends Component {
  static propTypes = {
    ...InjectedProps,

    placeholders: PropTypes.object,

    inputStyle: Text.propTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    additionalInputsProps: PropTypes.objectOf(PropTypes.shape(TextInput.propTypes)),
  };

  static defaultProps = {
    placeholders: {
      number: "1234 5678 1234 5678",
      expiry: 'Expiration date (MM/YY)',
      cvc: "CVC",
    },
    validColor: "",
    invalidColor: "red",
    placeholderColor: "gray",
    additionalInputsProps: {},
  };

  componentDidMount = () => this._focus(this.props.focused);

  UNSAFE_componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focusNumber = () => this._focus("number");
  _focusExpiry = () => this._focus("expiry");

  _focus = field => {
    if (!field) return;
    this.refs[field].focus();
    LayoutAnimation.easeInEaseOut();
  }

  _inputProps = field => {
    const {
      inputStyle, validColor, invalidColor, placeholderColor,
      placeholders, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
      additionalInputsProps,
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,

      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
      additionalInputProps: additionalInputsProps[field],
    };
  };

  _iconToShow = () => {
    const { focused, values: { type } } = this.props;
    if (focused === "cvc" && type === "american-express") return "cvc_amex";
    if (focused === "cvc") return "cvc";
    if (type) return type;
    return "placeholder";
  }

  render() {
    const { focused, values: { number }, inputStyle, status: { number: numberStatus } } = this.props;
    const showRightPart = focused && focused !== "number";

    return (
      <View style={s.mainWrapper}>
      <View style={s.container}>
        <View style={[
          s.leftPart,
          s.expanded,
        ]}>
          <CCInput {...this._inputProps("number")}
            keyboardType="numeric"
            containerStyle={s.numberInput} />
        </View>
        <TouchableOpacity onPress={showRightPart ? this._focusNumber : this._focusExpiry } style={s.iconContainer}>
          <Image style={s.icon} source={Icons[this._iconToShow()]} />
        </TouchableOpacity>
      </View>
      <CCInput {...this._inputProps("expiry")}
        keyboardType="numeric"
        containerStyle={s.expiryInput} 
      />
      </View>
    );
  }
}