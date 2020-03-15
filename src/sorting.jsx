



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

// function tableSortByPrice(mass, choose) {
//   if (choose == 1) {
//     return mass.filter(value => value.props.product.price >= 150 && value.props.product.price < 400);
//   } else if (choose == 2) {
//     return mass.filter(value => value.props.product.price >= 400 && value.props.product.price < 500);
//   } else if (choose == 3) { return mass.filter(value => value.props.product.price >= 500 && value.props.product.price < 600); }
//   return mass;


// }


function tableSearchByPrice(mass, choose,choose2) {
  if(choose=="" && choose2=="") {return mass;}
  else if (choose == "") {
    return mass.filter(value => value.props.product.price <= choose2);
  } else if (choose2 == "") {
    return mass.filter(value => value.props.product.price >= choose );
  } else  { return mass.filter(value => value.props.product.price >= choose && value.props.product.price <= choose2); }
  


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



class ProductRow extends React.Component {
  render() {
    let product = this.props.product;
    let name = product.name;
    let price = product.price;
    let type;
    let area = product.area;
    let stocked = product.stocked ? "Stocked" : "None";
    if (product.type == 1) { type = "Без скидки" }
    else if (product.type == 2) { type = "Скидка по программе" }
    else if (product.type == 3) { type = "Временная скидка" }
    else if (product.type == 4) { type = "Постоянная скидка" }




    return (

      <tr>
        <td>  {name} </td>
        <td>  {price}  </td>
        <td>  {type}  </td>
        <td>  {area}  </td>
        <td>  <div className={product.stocked ? 'alert-success' : 'alert-danger'}>{stocked} </div> </td>
      </tr>
    );

  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    const typeSort = this.props.typeSort;
    const discountSort = this.props.discountSort;
    //const priceSort = this.props.priceSort;
    const priceSearch = this.props.priceSearch;
    const priceSearch2 = this.props.priceSearch2;
    let rows = [];



    this.props.products.forEach((product) => {

      let i = 0, j = 0;
      while (i < product.name.length && j < filterText.length) {
        if (product.name.toLowerCase()[i] != filterText.toLowerCase()[j]) return;
        i++, j++;
      }
        if (inStockOnly && !product.stocked) {
        return;
      }

      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );

    });

    rows = tableSort(rows, typeSort);//sort by alphabet or price
    rows = tableSortByDiscount(rows, discountSort);
    //rows = tableSortByPrice(rows, priceSort);
    console.log(priceSearch2,priceSearch);
    rows=tableSearchByPrice(rows,priceSearch,priceSearch2)
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Type of Discount</th>
            <th>Area</th>
            <th>Stocked</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.handleTypeSortChange = this.handleTypeSortChange.bind(this);
    this.handleDiscountSortChange = this.handleDiscountSortChange.bind(this);
    this.handlePriceSearchChange = this.handlePriceSearchChange.bind(this);
    this.handlePriceSearch2Change = this.handlePriceSearch2Change.bind(this);
    //this.handlePriceSortChange = this.handlePriceSortChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  handleTypeSortChange(e) {
    this.props.onTypeSortChange(e.target.value);
  }

  // handlePriceSortChange(e) {
  //   this.props.onPriceSortChange(e.target.value);
  // }

  handlePriceSearchChange(e) {
    this.props.onPriceSearchChange(e.target.value);
  }
  handlePriceSearch2Change(e) {
    this.props.onPriceSearch2Change(e.target.value);
  }

  handleDiscountSortChange(e) {
    this.props.onDiscountSortChange(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search"
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
            Only show products in stock
          </p>

        <select onChange={this.handleTypeSortChange}>
          <option selected defaultValue="0" disabled value={this.props.typeSort}

          >Фильтр </option>
          <option value="1">По алфавиту</option>
          <option value="2">По цене</option>

        </select>


        <select name="type" onChange={this.handleDiscountSortChange}>
          <option selected disabled defaultValue="0" value={this.props.discountSort}>Фильтр Скидок</option>
          <option value="1">Без скидки</option>
          <option value="2">Скидка по программе</option>
          <option value="3">Временная скидка</option>
          <option value="4">Постоянная скидка</option>
        </select>


        <p>
          {/* <select name="price" onChange={this.handlePriceSortChange}>
            <option selected disabled defaultValue="0" value={this.props.priceSort}>Фильтр цен.</option>
            <option value="1">150 - 400</option>
            <option value="2">400 - 500</option>
            <option value="3">500 - 600</option>
          </select> */}
          Enter prices:
          <input
          type="text"
          placeholder="Minimal price"
          value={this.props.priceSearch}
          onChange={this.handlePriceSearchChange}
        />
        <input
          type="text"
          placeholder="Maximum price"
          value={this.props.priceSearch2}
          onChange={this.handlePriceSearch2Change}
        />
        </p>


      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      typeSort: '',
     // priceSort: '',
      priceSearch: '',
      priceSearch2: '',
      discountSort: '',
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.handleTypeSortChange = this.handleTypeSortChange.bind(this);
    //this.handlePriceSortChange = this.handlePriceSortChange.bind(this);
    this.handlePriceSearchChange = this.handlePriceSearchChange.bind(this);
    this.handlePriceSearch2Change = this.handlePriceSearch2Change.bind(this);
    this.handleDiscountSortChange = this.handleDiscountSortChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }
  handleTypeSortChange(typeSort) {
    this.setState({
      typeSort: typeSort
    })
  }
  // handlePriceSortChange(priceSort) {
  //   this.setState({
  //     priceSort: priceSort
  //   })
  // }
  handlePriceSearchChange(priceSearch) {
    this.setState({
      priceSearch: priceSearch
    })
  }
  handlePriceSearch2Change(priceSearch2) {
    this.setState({
      priceSearch2: priceSearch2
    })
  }
  handleDiscountSortChange(discountSort) {
    this.setState({
      discountSort: discountSort
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          typeSort={this.state.typeSort}
         // priceSort={this.state.priceSort}
          priceSearch={this.state.priceSearch}
          priceSearch2={this.state.priceSearch2}
          discountSort={this.state.discountSort}

          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
          onTypeSortChange={this.handleTypeSortChange}
          //onPriceSortChange={this.handlePriceSortChange}
          onPriceSearchChange={this.handlePriceSearchChange}
          onPriceSearch2Change={this.handlePriceSearch2Change}
          onDiscountSortChange={this.handleDiscountSortChange}

        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          typeSort={this.state.typeSort}
         // priceSort={this.state.priceSort}
          priceSearch={this.state.priceSearch}
          priceSearch2={this.state.priceSearch2}
          discountSort={this.state.discountSort}
        />
      </div>
    );
  }
}


const PRODUCTS = [
  { price: '$49.99', stocked: true, name: 'Football' },
  { price: '$9.99', stocked: true, name: 'Baseball' },
  { price: '$29.99', stocked: false, name: 'Basketball' },
  { price: '$99.99', stocked: true, name: 'iPod Touch' },
  { price: '$399.99', stocked: false, name: 'iPhone 5' },
  { price: '$199.99', stocked: true, name: 'Nexus 7' }
];

let data = [{
  price: 324,
  type: 2,
  area: 375,
  stocked: true,
  name: "Aria",
  id: 41098,
}, {
  price: 660,
  type: 4,
  area: 451,
  stocked: true,
  name: "Bayard",
  id: 48467
}, {
  price: 337,
  type: 4,
  area: 525,
  stocked: true,
  name: "Bellehurst",
  id: 49340
}, {
  price: 343,
  type: 4,
  area: 538,
  stocked: false,
  name: "Brookview",
  id: 52504
}, {
  price: 423,
  type: 2,
  area: 506,
  stocked: true,
  name: "Dumont Place",
  id: 41172,
}, {
  price: 257,
  type: 4,
  area: 379,
  stocked: false,
  name: "Halstead",
  id: 49952
}, {
  price: 230,
  type: 2,
  area: 468,
  stocked: true,
  name: "Hillgrove",
  id: 41166
}, {
  price: 183,
  type: 4,
  area: 451,
  stocked: true,
  name: "Kempston Place",
  id: 48471
}, {
  price: 674,
  type: 2,
  area: 522,
  stocked: true,
  name: "Overlook at Queen Creek",
  id: 48470
}, {
  price: 450,
  type: 2,
  area: 373,
  stocked: true,
  name: "Reserve at Wildwood",
  id: 50316
}, {
  price: 795,
  type: 1,
  area: 366,
  stocked: true,
  name: "Reverie on Cumberland",
  id: 48465
}, {
  price: 550,
  type: 4,
  area: 376,
  stocked: true,
  name: "Riverside",
  id: 41080
}, {
  price: 190,
  type: 1,
  area: 367,
  stocked: true,
  name: "Serenade",
  id: 41168
}, {
  price: 589,
  type: 4,
  area: 368,
  stocked: false,
  name: "The Grove",
  id: 40912
}, {
  price: 330,
  type: 2,
  area: 368,
  stocked: true,
  name: "Woodwinds at New Providence",
  id: 41086
}, {
  price: 299,
  type: 2,
  area: 455,
  stocked: true,
  name: "Canopy at Hudson Bend",
  id: 51105
}, {
  price: 263,
  type: 3,
  area: 481,
  stocked: true,
  name: "Carmel",
  id: 41193
}, {
  price: 169,
  type: 1,
  area: 454,
  stocked: true,
  name: "Estates of Flintrock",
  id: 41060
}, {
  price: 222,
  type: 1,
  area: 483,
  stocked: true,
  name: "Fairview Heights",
  id: 41192
}, {
  price: 385,
  type: 4,
  area: 448,
  stocked: false,
  name: "Headwaters",
  id: 53168
}, {
  price: 180,
  type: 2,
  area: 447,
  stocked: true,
  name: "Highlands at Mayfield Ranch ",
  id: 50235
}, {
  price: 570,
  type: 4,
  area: 448,
  stocked: true,
  name: "Highpointe",
  id: 41154,
}, {
  price: 690,
  type: 3,
  area: 480,
  stocked: true,
  name: "Lagos",
  id: 41198
}, {
  price: 280,
  type: 3,
  area: 446,
  stocked: false,
  name: "Mockingbird Park",
  id: 51381
}, {
  price: 133,
  type: 1,
  area: 447,
  stocked: true,
  name: "Mockingbird Park II",
  id: 51382,
}, {
  price: 530,
  type: 1,
  area: 448,
  stocked: true,
  name: "Saratoga Hills",
  id: 41019
}, {
  price: 577,
  type: 4,
  area: 455,
  stocked: true,
  name: "Summit at Lake Travis",
  id: 41061
}, {
  price: 290,
  type: 4,
  area: 481,
  stocked: false,
  name: "Vine Creek",
  id: 51382
}, {
  price: 150,
  type: 1,
  area: 443,
  stocked: true,
  name: "Vista Vera",
  id: 49408,
}, {
  price: 453,
  type: 3,
  area: 411,
  stocked: true,
  name: "Lake Castleberry",
  id: 49596
},
{
  price: 228,
  type: 2,
  area: 511,
  stocked: false,
  name: "Lake Walter",
  id: 49597
},
{
  price: 151,
  type: 3,
  area: 512,
  stocked: true,
  name: "Lake Walter2",
  id: 49598
}
];

ReactDOM.render(
  <FilterableProductTable products={data} />,
  document.getElementById('testing')
);