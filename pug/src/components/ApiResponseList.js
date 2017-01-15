import React, { Component, PropTypes } from 'react'
import Sortable from 'react-sortablejs';


export  default class ApiResponseList extends Component {
    static defaultProps = {
        responses: [],
        activeResponse: null
    }

    static propTypes = {
        responses: PropTypes.array,
        activeResponse: PropTypes.object,
        onChange: PropTypes.func,
        onOrderChange:PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            responses: props.responses,
            activeResponse: props.activeResponse
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            responses: nextProps.responses,
            activeResponse: nextProps.activeResponse
        })
    }

    handleMenuClick(event, activeResponse) {
        this.setState({activeResponse})
        this.props.onChange(event, activeResponse)
    }

    handleChangeOrder(order, sortable, event) {
        var oldResponses = this.state.responses

        var responses = order.map(id => {
            let index = oldResponses.findIndex(resp => resp.id == id)
            let response = oldResponses[index]
            return response
        })

        this.setState({responses})

        this.props.onOrderChange(order, event)
    }

    render() {
        var items = this.state.responses.map((response, i) => {
            var classes = 'item'
            var activeId = this.state.activeResponse ? this.state.activeResponse.id : null;
            if (activeId == response.id) {
                classes += ' active'
            }

            return <a key={response.id} data-id={response.id}
                      className={classes} name={response.name}
                      onClick={e => this.handleMenuClick(e, response)}>
                {response.name}
            </a>
        })

        return (
            <Sortable className="ui vertical pointing menu fluid"
                      options={{
                          animation: 150
                      }}
                      onChange={this.handleChangeOrder.bind(this)}
            >
                {items}
            </Sortable>

        )
    }

}
