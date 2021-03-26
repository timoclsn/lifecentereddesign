export default function List({ children, as = 'ul' }) {
    const Element = as;
    return (
        <Element className="leading-8 list-disc list-inside">
            {children.map((listItem, index) => (
                <li key={index}>{listItem}</li>
            ))}
        </Element>
    );
}
