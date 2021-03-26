import clsx from 'clsx';

export default function Heading({ children, as = 'h1', size = 'medium' }) {
    const Element = as;
    const className = clsx('font-bold', 'text-black', {
        'text-base': size === 'small',
        'text-3xl': size === 'medium',
        'text-5xl': size === 'large'
    });

    return <Element className={className}>{children}</Element>;
}
