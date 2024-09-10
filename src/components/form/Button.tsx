import clsx from 'clsx'

interface IButtonProps {
  children: React.ReactNode
  color?: 'black' | 'white'
  padding?: 'dense' | 'margin'
  className?: string
  onClick?: () => void
}

export default function Button({
  children,
  color = 'black',
  padding = 'margin',
  className = '',
  onClick = () => {}
}: IButtonProps) {
  const colors =
    color === 'black'
      ? 'bg-slate-950 hover:bg-zinc-800 text-white'
      : color === 'white'
        ? 'bg-white border-1 border-gray-100 text-gray-600 hover:border-gray-400'
        : ''
  const paddings = padding === 'margin' ? 'px-3 py-2.5' : 'py-1.5 px-2.5'
  const animation = 'transition transition-all duration-300'

  return (
    <button
      className={clsx(
        'shrink-0 rounded-md text-[14px] font-medium',
        colors,
        paddings,
        animation,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
