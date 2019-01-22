import React from 'react'
import RichEditor from 'components/RichEditor/index';

const EditorPage = () => {

    const onChange = (name, data) => {
        console.log(name, data)
    }

    return (
        <div>
            EditorPage
            <RichEditor initData="" onChange={onChange} name="test" rows={5} />
        </div>
    )
}

export default EditorPage
