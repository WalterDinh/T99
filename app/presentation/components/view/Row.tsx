import styled from 'styled-components';

interface Props {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    justify?: string;
    align?: string;
}

const Row = styled.View.attrs((props: Props) => (
    {
        marginTop: props.marginTop !== undefined ? props.marginTop : 0,
        marginBottom: props.marginBottom !== undefined ? props.marginBottom : 0,
        marginLeft: props.marginLeft !== undefined ? props.marginLeft : 0,
        marginRight: props.marginRight !== undefined ? props.marginRight : 0,
        justify: props.justify ? props.justify : 'flex-start',
        align: props.align ? props.align : 'flex-start'
    }))`
        marginTop: ${(props: any) => props.marginTop};
        marginBottom: ${(props: any) => props.marginBottom};
        marginLeft: ${(props: any) => props.marginLeft};
        marginRight: ${(props: any) => props.marginRight};
        flexDirection: row;
        justifyContent: ${(props: any) => props.justify};
        alignItems: ${(props: any) => props.align};
    `;

export default Row;
