export default function Card({ children, as = 'div', bgColor }) {
    const Element = as;
    return (
        <Element className={`${bgColor} rounded-3xl px-6 py-10`}>
            {children}
        </Element>
    );
}
