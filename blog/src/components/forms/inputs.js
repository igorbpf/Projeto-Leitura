import React from 'react';


export const createRenderer = render => ({ input, meta, label, ...rest }) => (
    <div className={ [
        meta.error && meta.touched ? 'error' : '',
        meta.active ? 'active' :  ''
    ].join(' ') }>
        <div className='form-group'>

        <label><strong>{label}</strong></label>
            {render(input, label, rest)}
        {meta.error &&
            meta.touched &&
            <span className='error-message'>
                {meta.error}
            </span>}
        </div>
    </div>
)

export const RenderInput = createRenderer((input, label) =>
    <input className='form-control' {...input} placeholder={label} />
)

export const RenderTextArea = createRenderer((input, label) =>
    <textarea className='form-control' {...input} placeholder={label} />
)

export const RenderSelect = createRenderer((input, label, { children }) =>
    <select className='form-control' {...input}>
        {children}
    </select>
)
