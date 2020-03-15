var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  }return mass;
}

// function tableSortByPrice(mass, choose) {
//   if (choose == 1) {
//     return mass.filter(value => value.props.product.price >= 150 && value.props.product.price < 400);
//   } else if (choose == 2) {
//     return mass.filter(value => value.props.product.price >= 400 && value.props.product.price < 500);
//   } else if (choose == 3) { return mass.filter(value => value.props.product.price >= 500 && value.props.product.price < 600); }
//   return mass;


// }


function tableSearchByPrice(mass, choose, choose2) {
  if (choose == "" && choose2 == "") {
    return mass;
  } else if (choose == "") {
    return mass.filter(function (value) {
      return value.props.product.price <= choose2;
    });
  } else if (choose2 == "") {
    return mass.filter(function (value) {
      return value.props.product.price >= choose;
    });
  } else {
    return mass.filter(function (value) {
      return value.props.product.price >= choose && value.props.product.price <= choose2;
    });
  }
}

function tableSortByDiscount(mass, choose) {
  if (choose == 1) {
    return mass.filter(function (value) {
      return value.props.product.type == 1;
    });
  } else if (choose == 2) {
    return mass.filter(function (value) {
      return value.props.product.type == 2;
    });
  } else if (choose == 3) {
    return mass.filter(function (value) {
      return value.props.product.type == 3;
    });
  } else if (choose == 4) {
    return mass.filter(function (value) {
      return value.props.product.type == 4;
    });
  }
  return mass;
}

var ProductRow = function (_React$Component) {
  _inherits(ProductRow, _React$Component);

  function ProductRow() {
    _classCallCheck(this, ProductRow);

    return _possibleConstructorReturn(this, (ProductRow.__proto__ || Object.getPrototypeOf(ProductRow)).apply(this, arguments));
  }

  _createClass(ProductRow, [{
    key: "render",
    value: function render() {
      var product = this.props.product;
      var name = product.name;
      var price = product.price;
      var type = void 0;
      var area = product.area;
      var stocked = product.stocked ? "Stocked" : "None";
      if (product.type == 1) {
        type = "Без скидки";
      } else if (product.type == 2) {
        type = "Скидка по программе";
      } else if (product.type == 3) {
        type = "Временная скидка";
      } else if (product.type == 4) {
        type = "Постоянная скидка";
      }

      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          "  ",
          name,
          " "
        ),
        React.createElement(
          "td",
          null,
          "  ",
          price,
          "  "
        ),
        React.createElement(
          "td",
          null,
          "  ",
          type,
          "  "
        ),
        React.createElement(
          "td",
          null,
          "  ",
          area,
          "  "
        ),
        React.createElement(
          "td",
          null,
          "  ",
          React.createElement(
            "div",
            { className: product.stocked ? 'alert-success' : 'alert-danger' },
            stocked,
            " "
          ),
          " "
        )
      );
    }
  }]);

  return ProductRow;
}(React.Component);

var ProductTable = function (_React$Component2) {
  _inherits(ProductTable, _React$Component2);

  function ProductTable() {
    _classCallCheck(this, ProductTable);

    return _possibleConstructorReturn(this, (ProductTable.__proto__ || Object.getPrototypeOf(ProductTable)).apply(this, arguments));
  }

  _createClass(ProductTable, [{
    key: "render",
    value: function render() {
      var filterText = this.props.filterText;
      var inStockOnly = this.props.inStockOnly;
      var typeSort = this.props.typeSort;
      var discountSort = this.props.discountSort;
      //const priceSort = this.props.priceSort;
      var priceSearch = this.props.priceSearch;
      var priceSearch2 = this.props.priceSearch2;
      var rows = [];

      this.props.products.forEach(function (product) {

        var i = 0,
            j = 0;
        while (i < product.name.length && j < filterText.length) {
          if (product.name.toLowerCase()[i] != filterText.toLowerCase()[j]) return;
          i++, j++;
        }
        if (inStockOnly && !product.stocked) {
          return;
        }

        rows.push(React.createElement(ProductRow, {
          product: product,
          key: product.name
        }));
      });

      rows = tableSort(rows, typeSort); //sort by alphabet or price
      rows = tableSortByDiscount(rows, discountSort);
      //rows = tableSortByPrice(rows, priceSort);
      console.log(priceSearch2, priceSearch);
      rows = tableSearchByPrice(rows, priceSearch, priceSearch2);
      return React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              null,
              "Name"
            ),
            React.createElement(
              "th",
              null,
              "Price"
            ),
            React.createElement(
              "th",
              null,
              "Type of Discount"
            ),
            React.createElement(
              "th",
              null,
              "Area"
            ),
            React.createElement(
              "th",
              null,
              "Stocked"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          rows
        )
      );
    }
  }]);

  return ProductTable;
}(React.Component);

var SearchBar = function (_React$Component3) {
  _inherits(SearchBar, _React$Component3);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this3 = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    _this3.handleFilterTextChange = _this3.handleFilterTextChange.bind(_this3);
    _this3.handleInStockChange = _this3.handleInStockChange.bind(_this3);
    _this3.handleTypeSortChange = _this3.handleTypeSortChange.bind(_this3);
    _this3.handleDiscountSortChange = _this3.handleDiscountSortChange.bind(_this3);
    _this3.handlePriceSearchChange = _this3.handlePriceSearchChange.bind(_this3);
    _this3.handlePriceSearch2Change = _this3.handlePriceSearch2Change.bind(_this3);
    //this.handlePriceSortChange = this.handlePriceSortChange.bind(this);
    return _this3;
  }

  _createClass(SearchBar, [{
    key: "handleFilterTextChange",
    value: function handleFilterTextChange(e) {
      this.props.onFilterTextChange(e.target.value);
    }
  }, {
    key: "handleInStockChange",
    value: function handleInStockChange(e) {
      this.props.onInStockChange(e.target.checked);
    }
  }, {
    key: "handleTypeSortChange",
    value: function handleTypeSortChange(e) {
      this.props.onTypeSortChange(e.target.value);
    }

    // handlePriceSortChange(e) {
    //   this.props.onPriceSortChange(e.target.value);
    // }

  }, {
    key: "handlePriceSearchChange",
    value: function handlePriceSearchChange(e) {
      this.props.onPriceSearchChange(e.target.value);
    }
  }, {
    key: "handlePriceSearch2Change",
    value: function handlePriceSearch2Change(e) {
      this.props.onPriceSearch2Change(e.target.value);
    }
  }, {
    key: "handleDiscountSortChange",
    value: function handleDiscountSortChange(e) {
      this.props.onDiscountSortChange(e.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        null,
        React.createElement("input", {
          type: "text",
          placeholder: "Search",
          value: this.props.filterText,
          onChange: this.handleFilterTextChange
        }),
        React.createElement(
          "p",
          null,
          React.createElement("input", {
            type: "checkbox",
            checked: this.props.inStockOnly,
            onChange: this.handleInStockChange
          }),
          ' ',
          "Only show products in stock"
        ),
        React.createElement(
          "select",
          { onChange: this.handleTypeSortChange },
          React.createElement(
            "option",
            { selected: true, defaultValue: "0", disabled: true, value: this.props.typeSort

            },
            "\u0424\u0438\u043B\u044C\u0442\u0440 "
          ),
          React.createElement(
            "option",
            { value: "1" },
            "\u041F\u043E \u0430\u043B\u0444\u0430\u0432\u0438\u0442\u0443"
          ),
          React.createElement(
            "option",
            { value: "2" },
            "\u041F\u043E \u0446\u0435\u043D\u0435"
          )
        ),
        React.createElement(
          "select",
          { name: "type", onChange: this.handleDiscountSortChange },
          React.createElement(
            "option",
            { selected: true, disabled: true, defaultValue: "0", value: this.props.discountSort },
            "\u0424\u0438\u043B\u044C\u0442\u0440 \u0421\u043A\u0438\u0434\u043E\u043A"
          ),
          React.createElement(
            "option",
            { value: "1" },
            "\u0411\u0435\u0437 \u0441\u043A\u0438\u0434\u043A\u0438"
          ),
          React.createElement(
            "option",
            { value: "2" },
            "\u0421\u043A\u0438\u0434\u043A\u0430 \u043F\u043E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0435"
          ),
          React.createElement(
            "option",
            { value: "3" },
            "\u0412\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u0441\u043A\u0438\u0434\u043A\u0430"
          ),
          React.createElement(
            "option",
            { value: "4" },
            "\u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u0430\u044F \u0441\u043A\u0438\u0434\u043A\u0430"
          )
        ),
        React.createElement(
          "p",
          null,
          "Enter prices:",
          React.createElement("input", {
            type: "text",
            placeholder: "Minimal price",
            value: this.props.priceSearch,
            onChange: this.handlePriceSearchChange
          }),
          React.createElement("input", {
            type: "text",
            placeholder: "Maximum price",
            value: this.props.priceSearch2,
            onChange: this.handlePriceSearch2Change
          })
        )
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var FilterableProductTable = function (_React$Component4) {
  _inherits(FilterableProductTable, _React$Component4);

  function FilterableProductTable(props) {
    _classCallCheck(this, FilterableProductTable);

    var _this4 = _possibleConstructorReturn(this, (FilterableProductTable.__proto__ || Object.getPrototypeOf(FilterableProductTable)).call(this, props));

    _this4.state = {
      filterText: '',
      inStockOnly: false,
      typeSort: '',
      // priceSort: '',
      priceSearch: '',
      priceSearch2: '',
      discountSort: ''
    };

    _this4.handleFilterTextChange = _this4.handleFilterTextChange.bind(_this4);
    _this4.handleInStockChange = _this4.handleInStockChange.bind(_this4);
    _this4.handleTypeSortChange = _this4.handleTypeSortChange.bind(_this4);
    //this.handlePriceSortChange = this.handlePriceSortChange.bind(this);
    _this4.handlePriceSearchChange = _this4.handlePriceSearchChange.bind(_this4);
    _this4.handlePriceSearch2Change = _this4.handlePriceSearch2Change.bind(_this4);
    _this4.handleDiscountSortChange = _this4.handleDiscountSortChange.bind(_this4);
    return _this4;
  }

  _createClass(FilterableProductTable, [{
    key: "handleFilterTextChange",
    value: function handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }
  }, {
    key: "handleInStockChange",
    value: function handleInStockChange(inStockOnly) {
      this.setState({
        inStockOnly: inStockOnly
      });
    }
  }, {
    key: "handleTypeSortChange",
    value: function handleTypeSortChange(typeSort) {
      this.setState({
        typeSort: typeSort
      });
    }
    // handlePriceSortChange(priceSort) {
    //   this.setState({
    //     priceSort: priceSort
    //   })
    // }

  }, {
    key: "handlePriceSearchChange",
    value: function handlePriceSearchChange(priceSearch) {
      this.setState({
        priceSearch: priceSearch
      });
    }
  }, {
    key: "handlePriceSearch2Change",
    value: function handlePriceSearch2Change(priceSearch2) {
      this.setState({
        priceSearch2: priceSearch2
      });
    }
  }, {
    key: "handleDiscountSortChange",
    value: function handleDiscountSortChange(discountSort) {
      this.setState({
        discountSort: discountSort
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(SearchBar, {
          filterText: this.state.filterText,
          inStockOnly: this.state.inStockOnly,
          typeSort: this.state.typeSort
          // priceSort={this.state.priceSort}
          , priceSearch: this.state.priceSearch,
          priceSearch2: this.state.priceSearch2,
          discountSort: this.state.discountSort,

          onFilterTextChange: this.handleFilterTextChange,
          onInStockChange: this.handleInStockChange,
          onTypeSortChange: this.handleTypeSortChange
          //onPriceSortChange={this.handlePriceSortChange}
          , onPriceSearchChange: this.handlePriceSearchChange,
          onPriceSearch2Change: this.handlePriceSearch2Change,
          onDiscountSortChange: this.handleDiscountSortChange

        }),
        React.createElement(ProductTable, {
          products: this.props.products,
          filterText: this.state.filterText,
          inStockOnly: this.state.inStockOnly,
          typeSort: this.state.typeSort
          // priceSort={this.state.priceSort}
          , priceSearch: this.state.priceSearch,
          priceSearch2: this.state.priceSearch2,
          discountSort: this.state.discountSort
        })
      );
    }
  }]);

  return FilterableProductTable;
}(React.Component);

var PRODUCTS = [{ price: '$49.99', stocked: true, name: 'Football' }, { price: '$9.99', stocked: true, name: 'Baseball' }, { price: '$29.99', stocked: false, name: 'Basketball' }, { price: '$99.99', stocked: true, name: 'iPod Touch' }, { price: '$399.99', stocked: false, name: 'iPhone 5' }, { price: '$199.99', stocked: true, name: 'Nexus 7' }];

var data = [{
  price: 324,
  type: 2,
  area: 375,
  stocked: true,
  name: "Aria",
  id: 41098
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
  id: 41172
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
  id: 41154
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
  id: 51382
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
  id: 49408
}, {
  price: 453,
  type: 3,
  area: 411,
  stocked: true,
  name: "Lake Castleberry",
  id: 49596
}, {
  price: 228,
  type: 2,
  area: 511,
  stocked: false,
  name: "Lake Walter",
  id: 49597
}, {
  price: 151,
  type: 3,
  area: 512,
  stocked: true,
  name: "Lake Walter2",
  id: 49598
}];

ReactDOM.render(React.createElement(FilterableProductTable, { products: data }), document.getElementById('testing'));