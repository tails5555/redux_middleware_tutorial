import React, { Fragment } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageUpload }  from 'quill-image-upload';
import { Badge } from 'reactstrap';

import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageUpload', ImageUpload); 

const _quillModules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }, 'image', 'video'],
        [{ 'font': [] }],
        [{ 'align': [] }]
    ]
}

const _quillFormats = [
    "header",
    "bold", "italic", "underline", "strike", "blockquote", "code-block",
    "list", "script", "bullet", "indent", "direction", "size", "color", "background", "font", "align", "image", "video"
]

const WysiwygInputRender = ({ input, meta : { error } }) => (
    <Fragment>
        <ReactQuill
            theme="snow"
            {...input}
            modules={_quillModules}
            formats={_quillFormats}
            onChange={(newValue, delta, source) => {
                if(source === 'user'){
                    input.onChange(newValue);
                }
            }}
            onBlur={(range, source, quill) => {
                input.onBlur(quill.getHTML());
            }}
            placeholder="게시물 내용을 입력하세요."
        />
        <br/>
        {
            error && <Badge color="danger" pill><i className="fas fa-exclamation-triangle" /> {error}</Badge>
        }
    </Fragment>
);

export default WysiwygInputRender;