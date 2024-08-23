import styled from 'styled-components/native';

export const StyledInput = styled.TextInput({
  paddingVertical: 10,
  width: '100%',
  paddingLeft: 25,
  paddingRight: 15,
  backgroundColor: '#F2F2F2',
  borderRadius: 30,
  color: '#382E1E',
  fontFamily: 'Fontspring-DEMO-ceraroundpro-bold',
  fontSize: 14,
});

export const CreateProductContainer = styled.ScrollView({
  flex: 1,
  padding: 25,
  backgroundColor: 'white',
});

interface SizePillProps {
  selected: boolean;
}

export const SizePill = styled.View<SizePillProps>(({selected}) => ({
  width: '100%',
  paddingHorizontal: 10,
  paddingVertical: 8,
  borderRadius: 20,
  alignItems: 'center',
  marginBottom: 10,
  borderColor: selected ? '' : 'gray',
  borderWidth: selected ? 0 : 1,
  backgroundColor: selected ? '#00512D' : 'white',
  color: selected ? 'white' : '#382E1E',
}));

export const PillInput = styled.TextInput({
  paddingVertical: 10,
  paddingLeft: 25,
  paddingRight: 15,
  backgroundColor: '#F2F2F2',
  marginLeft: 15,
  borderRadius: 30,
  color: '#382E1E',
  fontFamily: 'Fontspring-DEMO-ceraroundpro-bold',
  fontSize: 14,
});

export const StyledFlatList = styled.FlatList({});

export const UploadButton = styled.TouchableOpacity({
  flexDirection: 'row',
  borderRadius: 30,
  gap: 10,
  padding: 15,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-start',
  marginTop: 20,
  marginBottom: 10,
  borderColor: '#00512D',
  borderWidth: 3,
});

export const ImagePreview = styled.Image({
  width: 150,
  height: 150,
  borderRadius: 30,
  marginBottom: 20,
  alignSelf: 'center',
});
interface CreateProductButtonProps {
  isDisabled: boolean;
}
export const CreateProductButton =
  styled.TouchableOpacity<CreateProductButtonProps>(({isDisabled}) => ({
    backgroundColor: isDisabled ? 'gray' : '#00512D',
    borderRadius: 30,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 80,
  }));
