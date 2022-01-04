function IngredientCheckBox(props) {

    let id = "intoleranceCheckbox" + props.ingredient;

    // Capitalize each first letter of the ingredient name
    let ingredientNameSplit = props.ingredient.split(" ")
    for (let i = 0; i < ingredientNameSplit.length; ++i) {
        ingredientNameSplit[i] = ingredientNameSplit[i][0].toUpperCase() + ingredientNameSplit[i].substring(1)
    }
    let displayName = ingredientNameSplit.join(" ")

    return (
        <div className="form-check ing-check">

            <input className="form-check-input" type="checkbox" name={props.ingredient} value={props.ingredient} onChange={props.changeCallback} id={id} />
            <label className="form-check-label" htmlFor={id}>
                {displayName}
            </label>

        </div>
    );

}

export default class Filter extends React.Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.createTableRow = this.createTableRow.bind(this)
    }

    createTableRow(row, row_key) {
        let ret = []
        for (var i = 0; i < row.length; ++i) {
            ret.push(<td key={row_key + i.toString()}><IngredientCheckBox ingredient={row[i]} changeCallback={this.handleChange}/></td>)
        }

        return ret
    }

    handleChange(e) {
        this.props.modifyFilters(e.target.checked, e.target.value)
    }

    runCallback(callback, param1) {
        return callback(param1)
    }

    render() {
        
        return (
            <div>
                <h2 className="border-bottom d-inline p-1" id="filterTitle" >Allergies:</h2>

                <table className="my-3">
                    <tbody>
                        {this.runCallback((ingredients) => {

                            let ret = []
                            
                            // Iterate through ingredients 3 at a time
                            for (let i = 0; i < ingredients.length; i += 3) {
                                
                                // Create an array of these 3 ingredients to be put into the table row
                                let row_data = []
                                for (let j = 0; j < 3; ++j) {
                                    row_data.push(ingredients[i + j])
                                }
                                
                                // Create a table row and add it to the return array
                                ret.push(<tr key={i}>{this.createTableRow(row_data, i)}</tr>)
                            }
                            

                            return ret

                        }, this.props.ingredients)}
                    </tbody>
                </table>
            </div>
        );
    }
}