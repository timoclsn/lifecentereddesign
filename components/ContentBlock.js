import clsx from 'clsx';

export default function ContentBlock({
    children,
    as = 'div',
    id,
    size = 'xlarge',
    paddingX,
    paddingY,
    centered = true
}) {
    const Element = as;
    const className = clsx(
        {
            'max-w-sm': size === 'xsmall',
            'max-w-md': size === 'small',
            'max-w-xl': size === 'medium',
            'max-w-3xl': size === 'large',
            'max-w-7xl': size === 'xlarge',
            'w-full': size === 'full'
        },
        {
            'px-2': paddingX === 'xsmall',
            'px-4': paddingX === 'small',
            'px-8': paddingX === 'medium',
            'px-16': paddingX === 'large',
            'px-32': paddingX === 'xlarge'
        },
        {
            'py-2': paddingY === 'xsmall',
            'py-4': paddingY === 'small',
            'py-8': paddingY === 'medium',
            'py-16': paddingY === 'large',
            'py-32': paddingY === 'xlarge'
        },
        {
            'mx-auto': centered
        }
    );

    return (
        <Element id={id} className={className}>
            {children}
        </Element>
    );
}
