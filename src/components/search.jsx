export default class Search extends React.Component {

    constructor(props) {
        super(props)

        this.state = {searchQuery : ""}

        this.handleClick = this.handleClick.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(e) {
        this.setState({searchQuery : e.target.value})
    }

    handleClick() {
        let searchQuery = this.state.searchQuery
        if (searchQuery != "") {
            this.props.onSearch(searchQuery)
        }
    }

    render() {

        return(
            <div className="input-group my-5">
                <input type="text" className="form-control" placeholder="Search Recipes" onChange={this.handleSearch} aria-label="Search" />
                <div className="input-group-append">
                    <button className="btn btn-orange" onClick={this.handleClick} type="button">Search</button>
                </div>
            </div>
        );
    }
}