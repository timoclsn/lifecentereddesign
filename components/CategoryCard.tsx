interface Props {
  headline: string;
  text: string;
  list?: Array<string>;
  bgColor:
    | 'bg-oak'
    | 'bg-grass'
    | 'bg-sky'
    | 'bg-evening'
    | 'bg-sand'
    | 'bg-morning'
    | 'bg-forest'
    | 'bg-stone';
}

export function CategoryCard({ headline, text, list, bgColor }: Props) {
  return (
    <div
      className={`inline-block w-full ${bgColor} rounded-3xl px-6 py-10 mb-6 sm:mb-14`}
    >
      <h3 className="mb-4 font-bold">{headline}</h3>
      <p className="text-dark">{text}</p>
      {list && (
        <ul className="mt-4 leading-8 list-disc list-inside text-dark">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
