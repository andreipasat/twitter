import React from "react";
import ContentEditable from "react-contenteditable";
import s from './Hashtags.module.css'

const Hashtags = (props) => {

    const onTextType = (e) => {
        props.onTextType(e.target.value)
    }
    const putSelectedTag = (tag) => {
        props.putSelectedTag(tag)
    }

    const sanitizeText = () => {
        props.sanitizeText()
    }

    const onKeyUp = (e) => {
        if (e.which === 8 && e.target.innerText.trim().length === 0) {
            props.sanitizeText();
        }
    }

    const selectTag = (e) => {
        props.putSelectedTag(e.target.textContent)
    }

    return (
        <div>
            <div>
                <ContentEditable
                    onKeyUp={onKeyUp}
                    html={props.text}
                    disabled={false}
                    onChange={onTextType}
                    onBlur={sanitizeText}
                    className={s.content}
                    tagName={'div'}
                    id={'post'}
                />

            </div>
            {
                props.tags.length > 0 &&
                <ul className={s.list}>
                    {
                        props.tags.map(tag => <li key={tag} className={s.item} onClick={selectTag}>{tag}</li>)
                    }
                </ul>
            }

        </div>
    )
}

export default Hashtags