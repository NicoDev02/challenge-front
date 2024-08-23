import styled from 'styled-components/native';

export const SearchBarContainer = styled.View({
  flexDirection: 'row',
  paddingHorizontal: 15,
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#F2F2F2',
  marginHorizontal: 15,
  borderRadius: 30,
});

export const SearchBarInput = styled.TextInput({
  paddingVertical: 10,
  marginLeft: 15,
  color: 'black',
  fontFamily: 'Fontspring-DEMO-ceraroundpro-bold',
  fontSize: 14,
  flex: 1,
});
