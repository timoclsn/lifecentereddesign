export default function Button({
    text,
    Icon,
    fullWith,
    size = 's',
    secondary,
    bgColor = 'bg-oak',
    type = 'button',
    onClick,
    disabled,
    href,
    target
}) {
    const Tag = href ? 'a' : 'button';
    const className = [
        'flex',
        'items-center',
        'justify-center',
        'space-x-2',
        'rounded-full',
        'font-bold',
        'disabled:opacity-50',
        ...(size === 's' ? ['px-6 py-2'] : ['px-8 py-4']),
        ...(!secondary
            ? ['bg-black text-white hover:opacity-90']
            : [`${bgColor} text-black hover:opacity-80`]),
        ...(fullWith ? ['w-full'] : [''])
    ].join(' ');

    return (
        <Tag
            className={className}
            type={Tag === 'button' ? type : undefined}
            aria-label={Tag === 'button' ? text : undefined}
            onClick={onClick}
            disabled={disabled}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
            {Icon && <Icon size={20} />}
            {text && <span>{text}</span>}
        </Tag>
    );
}
