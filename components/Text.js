import clsx from 'clsx';

export default function Text({
    children,
    as = 'span',
    weight = 'regular',
    align = 'start'
}) {
    const Element = as;

    const className = clsx(
        'text-base',
        'text-dark',
        {
            'text-left': align === 'start',
            'text-center': align === 'center',
            'text-right': align === 'end'
        },
        {
            'font-normal': weight === 'regular',
            'font-bold': weight === 'strong'
        }
    );

    return <Element className={className}>{children}</Element>;
}
