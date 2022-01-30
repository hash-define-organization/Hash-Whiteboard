import React from 'react';
import './AllScroll.scss'

class AllScroll extends React.Component {
    render() {
        return (
        <img 
            src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNOSA1bDMtMyAzIDNNNSAxNWwtMy0zIDMtM00xNSAxOWwtMyAzLTMtM00xOSA5bDMgMy0zIDNNMjEgMTJIM00xMiAzdjE4Ii8+PC9nPjwvc3ZnPg=="
            className={`${this.props.className} all-scroll`} 
            onClick={this.props.onClick}
        />)
    }
}

export default AllScroll;