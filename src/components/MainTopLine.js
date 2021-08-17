import React from 'react'
import { connect } from 'react-redux';
import { setSearchTerm } from '../actions/filters'


class MainTopLine extends React.Component {
    
    onChange = (e) => {
        e.preventDefault()
        this.props.dispatch(setSearchTerm(e.target.value))
    }

    onSubmit = (e) => e.preventDefault() 


    render() {

        return (

            <div className="mainTopLine">

                <div className="search-logo"> </div>
        
        
                <form name="search" className="search-bar" onChange={this.onChange} onSubmit={this.onSubmit}>
                    <input type="text" name="search" id="search-text" placeholder="Search" spellCheck="false" autoComplete="off" autoFocus />
                </form>
            </div>

        )
    }
}

// export default MainTopLine;


export default connect()(MainTopLine)