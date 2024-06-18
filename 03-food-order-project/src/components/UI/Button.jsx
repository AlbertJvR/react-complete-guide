const Button = ({children, textOnly, className, ...props}) => {
    let cssClasses = className;
    cssClasses += textOnly ? ' text-button' : ' button';

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}

export default Button;