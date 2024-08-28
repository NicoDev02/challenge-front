import {View} from 'react-native';
import React from 'react';
import {StyledText} from '../globalStyles';

const Cart = () => {
  return (
    //eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StyledText fontSize={35} color="black" fontWeight="bold">
        In Development...
      </StyledText>
    </View>
  );
};

export default Cart;
