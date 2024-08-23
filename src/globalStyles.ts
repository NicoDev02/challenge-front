import styled from 'styled-components/native';

interface StyledTextProps {
  color?: string;
  fontSize?: number;
  fontWeight?: 'black' | 'bold' | 'regular' | 'light' | 'medium';
  textAlign?: 'left' | 'center' | 'right';
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
}

export const StyledText = styled.Text<StyledTextProps>(
  ({
    color,
    fontSize,
    fontWeight,
    textAlign,
    margin,
    marginVertical,
    marginHorizontal,
    mt,
    mb,
    ml,
    mr,
    pt,
    pb,
    pl,
    pr,
  }) => ({
    color: color || 'black',
    textWrap: 'pretty',
    fontSize: fontSize || 16,
    textAlign: textAlign || 'left',
    backgroundColor: 'transparent',
    fontFamily:
      fontWeight === 'bold'
        ? 'Fontspring-DEMO-ceraroundpro-bold'
        : fontWeight === 'black'
        ? 'Fontspring-DEMO-ceraroundpro-black'
        : fontWeight === 'light'
        ? 'Fontspring-DEMO-ceraroundpro-light'
        : fontWeight === 'medium'
        ? 'Fontspring-DEMO-ceraroundpro-medium'
        : 'Fontspring-DEMO-ceraroundpro-regular',
    margin: margin || 0,
    marginVertical: marginVertical || 0,
    marginHorizontal: marginHorizontal || 0,
    marginTop: mt || 0,
    marginBottom: mb || 0,
    marginLeft: ml || 0,
    marginRight: mr || 0,
    paddingTop: pt || 0,
    paddingBottom: pb || 0,
    paddingLeft: pl || 0,
    paddingRight: pr || 0,
  }),
);
interface ViewProps {
  height?: number;
  position?: 'relative' | 'absolute';
  padding?: number;
  margin?: number;
  bgColor?: string;
  borderRadius?: number;
  alignItems?: string;
  justifyContent?: string;
  marginVertical?: number;
  marginHorizontal?: number;
  width?: number | string;
  flex?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
}

export const RowView = styled.View<ViewProps>(
  ({
    position,
    flex,
    padding,
    margin,
    width,
    bgColor,
    borderRadius,
    alignItems,
    justifyContent,
    marginVertical,
    marginHorizontal,
    mt,
    mb,
    ml,
    mr,
    pt,
    pb,
    pl,
    pr,
  }) => ({
    position: position,
    flex: flex,
    width: width,
    flexDirection: 'row',
    padding: padding,
    margin: margin,
    backgroundColor: bgColor || 'white',
    borderRadius: borderRadius || 0,
    alignItems: alignItems || 'center',
    justifyContent: justifyContent || 'flex-start',
    marginVertical: marginVertical,
    marginHorizontal: marginHorizontal,
    marginTop: mt,
    marginBottom: mb,
    marginLeft: ml,
    marginRight: mr,
    paddingTop: pt,
    paddingBottom: pb,
    paddingLeft: pl,
    paddingRight: pr,
  }),
);

export const ColumnView = styled.View<ViewProps>(
  ({
    position,
    height,
    padding,
    margin,
    flex,
    bgColor,
    borderRadius,
    alignItems,
    justifyContent,
    marginVertical,
    marginHorizontal,
    mt,
    mb,
    ml,
    mr,
    pt,
    pb,
    pl,
    pr,
  }) => ({
    height: height,
    position: position,
    flex: flex,
    padding: padding || 0,
    margin: margin,
    backgroundColor: bgColor || 'white',
    borderRadius: borderRadius || 0,
    alignItems: alignItems || 'center',
    justifyContent: justifyContent || 'flex-start',
    marginVertical: marginVertical,
    marginHorizontal: marginHorizontal,
    marginTop: mt,
    marginBottom: mb,
    marginLeft: ml,
    marginRight: mr,
    paddingTop: pt,
    paddingBottom: pb,
    paddingLeft: pl,
    paddingRight: pr,
  }),
);
