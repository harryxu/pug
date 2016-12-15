import React from 'react'

class ApiListPane extends React.Comment {



    render() {
        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups: state.groups
    }
}

export default connect(mapStateToProps)(ApiListPane)
