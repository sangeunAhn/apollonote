import React from 'react';
import styled from 'styled-components';
import MarkdownRenderer from 'react-markdown-renderer';
import TextareaAutosize from 'react-textarea-autosize';
import save from '../../Image/save.png';

const TitleInput = styled(TextareaAutosize)`
	font-size: 50px;
	font-weight: 600;
	width: 90%;
	&::placeholder {
		font-weight: 600;
	}
    border: 0px;
    margin-right: 30px;
    resize: none;
`;

const ContentPreview = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
	font-size: 18px;
	margin-top: 15px;
	border: 0px;
	border: 0px;
    resize: none;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 50px;
`;

export default class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.title || '',
			content: props.content || '',
			id: props.id || null,
		};
	}
	render() {
		const { title, content } = this.state;
		return (
			<>
				<TitleContainer>
					<TitleInput
						value={title}
						onChange={this._onInputChange}
						placeholder={'Untitled...'}
						name={'title'}
					/>
					<img src={save} onClick={this._onSave} style={{ width: 35, height: 35, cursor: 'pointer' }} />
				</TitleContainer>
				<ContentPreview>
					<ContentInput
						value={content}
						onChange={this._onInputChange}
						placeholder={'# This supports markdown!'}
						name={'content'}
					/>
					<MarkdownRenderer markdown={content} className={'markdown'} />
				</ContentPreview>
			</>
		);
	}
	_onInputChange = event => {
		const {
			target: { value, name },
		} = event;
		this.setState({
			[name]: value,
		});
	};
	_onSave = () => {
		const { onSave } = this.props;
		const { title, content, id } = this.state;
		onSave(title, content, id);
	};
}
