function RecipeCard(props) {
    let recipe = props.recipe
    let url = `https://spoonacular.com/recipes/${recipe.title.split(" ").join("-").toLowerCase()}-${recipe.id}`
    return(
        <div className="card my-3 w-100">
            <img className="card-img-top" src={recipe.image} />
            <div className="card-body">
                <h6 className="card-title">{recipe.title}</h6>
            </div>
            <a href={url} target="_blank" className="btn btn-orange">View</a>
        </div>
    );
}

export default class Recipes extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let recipes = this.props.recipes
        if (!recipes) return <br></br>


        let ret = []

        // Create rows of cards 4 across
        for (var i = 0; i < recipes.length; i+=4) {
            
            let rowCards= []
            for(var j = 0; j < 4 && j + i < recipes.length; ++j) {
                rowCards.push(<div className="col-md-3 d-flex" key={i + j.toString()}><RecipeCard recipe={recipes[i+j]} /></div>)
            }

            ret.push(<div className="row my-2" key={i}>{rowCards}</div>)
        }

        return ret
    }

}