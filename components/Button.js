import clsx from 'clsx';

export default function Button({
    children,
    fullWith = false,
    size = 'small',
    secondary = false,
    bgColor = 'bg-oak',
    type = 'button',
    onClick,
    disabled,
    href,
    target
}) {
    const Element = href ? 'a' : 'button';
    const className = clsx(
        'inline-flex',
        'items-center',
        'justify-center',
        'space-x-2',
        'rounded-full',
        'font-bold',
        'disabled:opacity-50',
        { 'w-full': fullWith },
        {
            'px-6 py-2': size === 'small',
            'px-8 py-4': size === 'large'
        },
        {
            'bg-black text-white hover:opacity-90': !secondary,
            [`${bgColor} text-black hover:opacity-80`]: secondary
        }
    );

    return (
        <Element
            className={className}
            type={Element === 'button' ? type : undefined}
            onClick={onClick}
            disabled={disabled}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
            {children}
        </Element>
    );
}
