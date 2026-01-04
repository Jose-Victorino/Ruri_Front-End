import cn from 'classnames'

import s from './Button.module.scss'

const Button = ({
  btnType = 'primary',  // 'primary', 'secondary', 'tertiary'
  btnSize = 'md',       // 'sm', 'md', 'lg'
  text = 'no input',
  type = 'button',      // 'button', 'submit', 'reset'
  icon = null,
  iconPos = 'left',     // 'left', 'right'
  color = 'blue',       // 'blue', 'red', 'yellow', 'green', 'light', 'dark'
  corners = 'curved',   // 'curved', 'sharp', 'rounded'
  title,
  disabled = false,
  classNames = {},
  style={},
  onClick = () => {},
}) => {
  if(!['primary', 'secondary', 'tertiary'].includes(btnType.toLowerCase()))
    throw new Error("btnType must only be: 'primary', 'secondary', 'tertiary'");
  if(!['sm', 'md', 'lg'].includes(btnSize.toLowerCase()))
    throw new Error("btnType must only be: 'sm', 'md', 'lg'");
  if(!['button', 'submit', 'reset'].includes(type))
    throw new Error("type must only be: 'button', 'submit', 'reset'");
  if(!['left', 'right'].includes(iconPos.toLowerCase()))
    throw new Error("iconPos must only be: 'left', 'right'");
  if(!['curved', 'sharp', 'rounded'].includes(corners.toLowerCase()))
    throw new Error("corners must only be: 'curved', 'sharp', 'rounded'");

  return (
    <button
      className={cn(
        s[`btn-${btnType.toLowerCase()}`],
        s[`sz-${btnSize.toLowerCase()}`],
        s[`color-${color.toLowerCase()}`],
        'j-center',
        'a-center',
        {
          ...classNames,
          ['flex-row']: icon && iconPos.toLowerCase() === 'left',
          ['flex-row-reverse']: icon && iconPos.toLowerCase() === 'right',
        },
      )}
      style={{
        ...style,
        borderRadius: corners.toLowerCase() === 'curved' ? '5px' : corners.toLowerCase() === 'rounded' && '1.25em',
      }}
      title={title}
      type={type}
      disabled={disabled}
      onClick={() => onClick()}
      aria-label={title || text}
      aria-disabled={disabled}
      role="button"
    >
      {icon}
      {!["", null, undefined].includes(text) && <p>{text}</p>}
    </button>
  );
}

export default Button