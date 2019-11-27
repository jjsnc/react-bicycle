import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichText extends Component {
    constructor(props){
        super(props)
        this.state = {
            editorState:''
        }
    }
    onEditorStateChange(data){
        console.log(data,'data')
        this.setState({
            editorState:data 
        })
    }
    render() {
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        )
    }
}