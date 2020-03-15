


function tableSort(mass, choose) {


    if (choose == 1) {

        return mass.sort(function (a, b) {
            if (a.props.product.name > b.props.product.name) {
                return 1;
            }
            if (a.props.product.name < b.props.product.name) {
                return -1;
            }
            return 0;
        });




    } else if (choose == 2) {
        return mass.sort(function (a, b) {
            if (a.props.product.price > b.props.product.price) {
                return 1;
            }
            if (a.props.product.price < b.props.product.price) {
                return -1;
            }
            return 0;
        });




    } return mass;
}

function tableSortByPrice(mass, choose) {
    if (choose == 1) {
        return mass.filter(value => value.props.product.price >= 150 && value.props.product.price < 400);
    } else if (choose == 2) {
        return mass.filter(value => value.props.product.price >= 400 && value.props.product.price < 500);
    } else if (choose == 3) { return mass.filter(value => value.props.product.price >= 500 && value.props.product.price < 600); }
    return mass;


}

function tableSortByDiscount(mass, choose) {
    if (choose == 1) {
        return mass.filter(value => value.props.product.type == 1);
    } else if (choose == 2) {
        return mass.filter(value => value.props.product.type == 2);
    } else if (choose == 3) {
        return mass.filter(value => value.props.product.type == 3);
    } else if (choose == 4) { return mass.filter(value => value.props.product.type == 4); }
    return mass;


}

export { tableSort, tableSortByPrice, tableSortByDiscount };

