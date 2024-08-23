import styled from 'styled-components/native';

interface CategoryPillProps {
  selected: boolean;
}
interface ImageProps {
  selected: boolean;
}
export const CategoryPill = styled.TouchableOpacity<CategoryPillProps>(
  ({selected}) => ({
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: selected ? '#00512D' : 'white',
    color: selected ? 'white' : '#382E1E',
    marginRight: 10,
  }),
);

export const StyledImage = styled.Image<ImageProps>(({selected}) => ({
  width: 20,
  height: 20,
  tintColor: selected ? 'white' : '#382E1E',
}));
