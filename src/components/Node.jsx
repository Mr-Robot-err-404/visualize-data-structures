export const Node = ({ value, index, isHighlighted, bgColor, fastNode }) => {
    const width = 40;
    const height = 40;
    const x = index * (width + 20); // 20 is the space between nodes
    const y = 0;
    const style = {
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        color: fastNode || isHighlighted || bgColor !== 'lightblue' ? 'white' : 'black',
        borderRadius: '50%',
        backgroundColor: fastNode ? 'red' : isHighlighted ? 'purple' : bgColor,
        zIndex: 1, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
    return (
        <div style={style}>
        {value}
        </div>
    );
};