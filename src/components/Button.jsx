import React from 'react'

function Button({title, onClick}) {
  return (
    <div>
        <button className="w-full py-2 px-2" onClick={onClick}>
            {title}
        </button>
    </div>
  )
}

export default Button