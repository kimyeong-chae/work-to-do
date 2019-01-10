import React, {Component} from 'react';
import PropTypes from 'prop-type';
import TimeAgo from 'react-timeago';

class Memo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            value: this.props.data.contents
        };

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    toggleEdit() {
        if(this.state.editMode) {
            let id = this.props.data._id;
            let index = this.props.index;
            let contents = this.state.value;

            this.props.onEdit(id, index, contents).then(() => {
                this.setState({
                    editMode: !this.state.editMode
                });
            })
        } else {
            this.setState({
                editMode: !this.state.editMode
            });
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleRemove() {
        let id = this.props.data._id;
        let index = this.props.index;
        this.props.onRemove(id, index);
    }

    componentDidUpdate() {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        // $('#dropdown-button-'+this.props.data._id).dropdown({
        //     // belowOrigin: true // Displays dropdown below the button
        // });
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
        M.textareaAutoResize($('#textarea-'+this.props.data._id));
    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
        M.textareaAutoResize($('#textarea-'+this.props.data._id));
    }


    render() {
        const {data, ownership} = this.props;

        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button'
                   id={`dropdown-button-${data._id}`}
                   data-target={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a onClick={this.toggleEdit}>Edit</a></li>
                    <li><a onClick={this.handleRemove}>Remove</a></li>
                </ul>
            </div>
        );


        const memoView = (
            <div className="container memo">
                <div className="card">
                    <div className="info">
                        <a className="username">{data.writer}</a> wrote a log · <TimeAgo date={data.date.created}/>
                        { ownership ? dropDownMenu : undefined }
                    </div>
                    <div className="card-content">
                        {data.contents}
                    </div>
                    <div className="footer">
                    </div>
                </div>
            </div>
        );

        const editView = (
            <div className="write">
                <div className="card">
                    <div className="card-content">
                        <textarea
                            id={`textarea-${data._id}`}
                            className="materialize-textarea"
                            value={this.state.value}
                            onChange={this.handleChange}></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.toggleEdit}>OK</a>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="container memo">
                { this.state.editMode ? editView : memoView }
            </div>
        );
    }
}

Memo.propTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool,
    index: React.PropTypes.number,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
};

Memo.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    ownership: true,
    onEdit: (id, index, contents) => {
        console.error('onEdit function not defined');
    },
    onRemove: (id, index, contents) => {
        console.error('onRemove function not defined');
    },
    index: -1
}

export default Memo;