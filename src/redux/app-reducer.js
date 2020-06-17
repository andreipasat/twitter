import {tags} from "../tags/tags";

const MATCH_TAGS = 'MATCH_TAGS'
const TEXT_CHANGE = 'TEXT_CHANGE'

let initialState = {
    tags : [],
    text : ''
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {

        case MATCH_TAGS :{
            let matchedTags = []
            if (action.textTag !== null) {
                matchedTags = tags.filter((tag) => {
                    return tag.toLowerCase().indexOf(action.textTag.toLowerCase()) === 0
                })
            }
            return {...state, tags: matchedTags}
        }

        case TEXT_CHANGE : {
            return {...state, text: action.newText}
        }

        default : {
            return state
        }
    }
}

const matchTagsCreator = (textTag) => ({type : MATCH_TAGS, textTag})
const textChangeCreator = (newText) => ({type : TEXT_CHANGE, newText})

export const detectTags = (text = null) => (dispatch) => {
        dispatch(matchTagsCreator(text))
}

export const textChange = (newText) => (dispatch) => {
    dispatch(textChangeCreator(newText))
}

export default appReducer