import React from 'react';
import { connect} from 'react-redux'
import Hashtags from "../components/Hashtags";
import {detectTags, textChange} from "../redux/app-reducer";
import sanitizeHtml from 'sanitize-html'
import {getCaretPosition} from "../caret/caret";

class HashtagsContainer extends React.Component {

    onTextType = (text) => {
        const plainText = document.getElementById('post').innerText
        let caretPosition = getCaretPosition();
        let substring = plainText.substring(0, caretPosition)
        let lastHashIndex = substring.lastIndexOf('#')
        let latsWord = plainText.substring(lastHashIndex, caretPosition)
        if (latsWord.length > 0) this.props.detectTags(latsWord)

        this.lastWord = latsWord
        this.props.textChange(text)
    }

    putSelectedTag = (tag) => {
        let lastWordIndex = this.props.text.lastIndexOf(this.lastWord)
        let firstChunk = this.props.text.substring(0, lastWordIndex)
        let newText = firstChunk + '<strong>' + tag + '</strong>' + '&nbsp;'

        this.props.textChange(newText)
        this.props.detectTags(null)
        document.getElementById('post').focus()
    }

    sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
        allowedAttributes: { a: ["href"] }
    };

    sanitizeText = () => {
        this.props.textChange(sanitizeHtml(this.props.text, this.sanitizeConf))
    }

    render() {
        return (
            <div>
                <p>Enter text:</p>
                <Hashtags
                    tags={this.props.tags}
                    text={this.props.text}
                    onTextType={this.onTextType}
                    putSelectedTag={this.putSelectedTag}
                    sanitizeText={this.sanitizeText}
                />
            </div>
        )
    }

}

let mapStateToProps = (state) => {
    return {
        tags: state.app.tags,
        text : state.app.text
    }
}

export default connect(mapStateToProps,{detectTags, textChange})(HashtagsContainer);
