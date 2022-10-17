export default function LinkButton(props){
    const {children, style, className}=props;
    return(
        <button className={`LinkButton ${className}`} style={style} >{children}</button>
    )
}