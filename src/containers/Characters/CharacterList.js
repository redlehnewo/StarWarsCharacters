import React, { Component, Fragment } from "react";
import characterService from "../../core/services/characterService";

import Page from "../../components/UI/Page/Page";
import DataTable from "../../components/UI/DataTable/DataTable";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";

export class CharacterList extends Component {
  state = {
    headerConfig: {
      id: {
        label: "Id",
        canSort: true,
        sortAsc: false,
        touched: false,
        mapToProperty: "id"
      },
      name: {
        label: "Name",
        canSort: true,
        sortAsc: false,
        touched: false,
        mapToProperty: "name"
      },
      species: {
        label: "Species",
        canSort: true,
        sortAsc: false,
        touched: false,
        mapToProperty: "species"
      },
      gender: {
        label: "Gender",
        canSort: true,
        sortAsc: false,
        touched: false,
        mapToProperty: "gender",
        cellStyle: {
          textTransform: "capitalize"
        }
      },
      homeworld: {
        label: "Homeworld",
        canSort: true,
        sortAsc: false,
        touched: false,
        mapToProperty: "homeworld"
      },
      actions: {
        label: "Actions",
        canSort: false,
        mapToProperty: "actions"
      }
    },
    characters: [],
    searchString: "",
    searchDebounceDelay: 200,
    pagination: {
      page: 1,
      pageSize: 10,
      totalItems: 0
    }
  };

  componentDidMount() {
    this.fetchCharacterList(1, "");
  }

  fetchCharacterList = (page, searchString, sort = "id", isAscOrder = true) => {
    const params = {
      page: page,
      pageSize: this.state.pagination.pageSize,
      search: searchString,
      sort: sort,
      isAscOrder: isAscOrder
    };
    characterService.getCharacters(params).then(response => {
      const characters = response.data;
      const totalItems = +response.totalItems;

      this.setState({
        characters: characters,
        searchString: searchString,
        pagination: {
          ...this.state.pagination,
          page: page,
          totalItems: totalItems
        }
      });
    });
  };

  onPageChanged = page => {
    this.fetchCharacterList(page, this.state.searchString);
  };

  onSearchChanged = searchString => {
    this.fetchCharacterList(1, searchString);
  };

  onAddCharacterHandler = () => {
    this.props.history.push("/new");
  };

  onEditCharacterHandler = character => {
    this.props.history.push(`/${character.id}`);
  };

  onHeaderClickHandler = headerId => {
    const updatedHeaderConfig = { ...this.state.headerConfig };
    Object.keys(updatedHeaderConfig).forEach(headerKey => {
      const updatedHeaderElement = { ...updatedHeaderConfig[headerKey] };
      updatedHeaderElement.touched = headerKey === headerId;
      updatedHeaderElement.sortAsc =
        headerKey === headerId ? !updatedHeaderElement.sortAsc : true;
      updatedHeaderConfig[headerKey] = updatedHeaderElement;
    });

    this.setState({ headerConfig: updatedHeaderConfig });
    this.fetchCharacterList(
      this.state.pagination.page,
      this.state.searchString,
      headerId,
      updatedHeaderConfig[headerId].sortAsc
    );
  };

  onDeleteCharacterHandler = character => {
    characterService.removeCharacter(character).then(response => {
      this.fetchCharacterList(
        this.state.pagination.page,
        this.state.searchString
      );
    });
  };

  render() {
    const headers = Object.keys(this.state.headerConfig).map(headerKey => {
      return { ...this.state.headerConfig[headerKey] };
    });
    let resultsTable = (
      <Fragment>
        <DataTable
          headings={headers}
          rows={this.state.characters}
          headerClicked={this.onHeaderClickHandler}
          editClicked={this.onEditCharacterHandler}
          deleteClicked={this.onDeleteCharacterHandler}
        />

        <nav aria-label="Data grid navigation">
          <Pagination
            page={this.state.pagination.page}
            pageSize={this.state.pagination.pageSize}
            totalItems={this.state.pagination.totalItems}
            pageChanged={this.onPageChanged}
          />
        </nav>
      </Fragment>
    );

    if (this.state.pagination.totalItems === 0) {
      resultsTable = <p>No Results Found</p>;
    }

    return (
      <Page title="List View">
        <div className="row">
          <div className="col-sm-6">
            <SearchBox
              value={this.state.searchString}
              searchChanged={this.onSearchChanged}
              delay={this.state.searchDebounceDelay}
            />
          </div>
          <div className="col-sm-6 text-sm-right">
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={this.onAddCharacterHandler}
            >
              Add New
            </button>
          </div>
        </div>
        {resultsTable}
      </Page>
    );
  }
}

export default CharacterList;
