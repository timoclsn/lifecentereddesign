export default function MasonryGrid({ children }) {
    return (
        <div className="gap-16 columns-1 sm:columns-2 lg:columns-3">
            {children.map((element, index) => (
                <div className="inline-block mb-16" key={index}>
                    {element}
                </div>
            ))}
        </div>
    );
}
