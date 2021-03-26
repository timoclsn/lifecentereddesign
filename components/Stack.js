import clsx from 'clsx';

export default function Stack({
    children,
    as = 'div',
    orientation = 'vertical',
    align = 'start',
    justify = 'start',
    space = 'medium'
}) {
    const Element = as;
    const className = clsx(
        'flex',
        {
            'flex-col': orientation === 'vertical',
            'space-y-2': orientation === 'vertical' && space === 'xsmall',
            'space-y-4': orientation === 'vertical' && space === 'small',
            'space-y-8': orientation === 'vertical' && space === 'medium',
            'space-y-16': orientation === 'vertical' && space === 'large',
            'space-y-32': orientation === 'vertical' && space === 'xlarge'
        },
        {
            'flex-row': orientation === 'horizontal',
            'space-x-2': orientation === 'horizontal' && space === 'xsmall',
            'space-x-4': orientation === 'horizontal' && space === 'small',
            'space-x-8': orientation === 'horizontal' && space === 'medium',
            'space-x-16': orientation === 'horizontal' && space === 'large',
            'space-x-32': orientation === 'horizontal' && space === 'xlarge'
        },
        {
            'items-start': align === 'start',
            'items-center': align === 'center',
            'items-end': align === 'end'
        },
        {
            'justify-start': justify === 'start',
            'justify-center': justify === 'center',
            'justify-end': justify === 'end',
            'justify-between': justify === 'between'
        }
    );

    return <Element className={className}>{children}</Element>;
}
