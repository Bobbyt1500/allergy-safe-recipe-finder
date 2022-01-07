import Filter from "./components/filter.js"
import Search from "./components/search.js"
import Recipes from "./components/recipes.js"

export default class App extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = { ingredients : [], selectedFilters : new Set(), recipeData : {}, shown : 0, pastQuery : ""}
        this.handleSearch = this.handleSearch.bind(this)
        this.modifySelectedFilters = this.modifySelectedFilters.bind(this)
        this.showMore = this.showMore.bind(this)
        this.getRecipeData = this.getRecipeData.bind(this)
    }

    showMore() {
        this.getRecipeData(this.state.pastQuery)
    }

    handleSearch(searchQuery) {
        // On search button press

        // Reset saved states from the last search
        this.setState({shown : 0, pastQuery : "", recipeData : {}}, () => {
            // Get the compatible recipes from the server
            this.getRecipeData(searchQuery)
        })
    }
    
    getRecipeData(searchQuery) {
        let url = `/recipes?page=${this.state.shown}&query=${searchQuery.split(" ").join("-").toLowerCase()}`

        let selectedFilters = this.state.selectedFilters
        if (selectedFilters.size > 0) {
            let allergies = Array.from(selectedFilters).join(',')
            url += `&allergies=${allergies}` 
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // Add number of gotten recipes to the number shown
                let shown = this.state.shown
                shown += data.number

                // Add past recipes to new data
                let pastResults = this.state.recipeData.results
                if (pastResults) {
                    for (var i = 0; i < data.results.length; ++i) {
                        pastResults.push(data.results[i])
                    }
                    data.results = pastResults
                }

                this.setState({recipeData : data, shown : shown, pastQuery : searchQuery})
            })
    }

    modifySelectedFilters(checked, ingredient) {
        // Add or remove an ingredient from the selectedFilters set
        let selectedFilters = this.state.selectedFilters

        if (checked) selectedFilters.add(ingredient);
        else selectedFilters.delete(ingredient);

        this.setState({selectedFilters: selectedFilters, recipeData : {}})
    }

    componentDidMount() {
        // Get the supported intolerances from a static json
        fetch("/intolerances.json")
            .then((res) => res.json())
            .then((data) => {
                this.setState({ingredients : data["ingredients"]})
            })
    }

    render() {

        return (
            <div>
                <div className="purplegrad-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg d-flex justify-content-lg-end justify-content-center align-items-center mt-4">
                                <h1 className="fw-bold display-4 text-center">Allergy-Safe Recipe Finder</h1>
                            </div>

                            <div className="col-lg d-flex justify-content-lg-start justify-content-center mt-4">
                                <Filter ingredients={this.state.ingredients} modifyFilters={this.modifySelectedFilters} />
                            </div>
                        </div>

                        <Search onSearch={this.handleSearch} />
                    </div>

                </div>

                <div className="container">
                    <Recipes recipes={this.state.recipeData.results} />
                    {this.state.recipeData.results && this.state.recipeData.totalResults > this.state.shown && <button type="button" onClick={this.showMore} className="my-3 btn btn-orange btn-lg btn-block w-100">Show More</button>}
                </div>
            </div>
        );
    }
}