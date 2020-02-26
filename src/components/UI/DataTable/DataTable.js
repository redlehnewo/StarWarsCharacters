import React from "react";
import Table from "../Table/Table";

/**
 * This is just a simple data table.
 *
 *
 * @param {} props
 */
const dataTable = props => {
  const renderHeadingRow = heading => {
    let sort = null;
    if (heading.canSort && heading.touched) {
      sort = (
        <i
          className={`ml-2 fa ${
            heading.sortAsc ? "fa-chevron-up" : "fa-chevron-down"
          }`}
        ></i>
      );
    }

    return (
      <th
        key={heading.mapToProperty}
        scope="col"
        onClick={() =>
          heading.canSort && props.headerClicked(heading.mapToProperty)
        }
      >
        {heading.label} {sort}
      </th>
    );
  };

  const renderRow = row => {
    const entityData = props.headings.map((heading, index) => {
      let propertyId = heading.mapToProperty;
      let cellStyle = heading.cellStyle;

      let cell = null;
      if (index === 0) {
        cell = (
          <th scope="row" key={`${propertyId}-${index}`}>
            {row[propertyId]}
          </th>
        );
      } else if (propertyId === "actions") {
        cell = (
          <td key={`${propertyId}-${index}`}>
            <div
              className="btn-group btn-group-sm"
              role="group"
              aria-label="Actions"
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  props.editClicked(row);
                }}
              >
                <i className="fa fa-pencil" aria-hidden="true" /> Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  props.deleteClicked(row);
                }}
              >
                <i className="fa fa-trash-o" aria-hidden="true" /> Remove
              </button>
            </div>
          </td>
        );
      } else {
        cell = (
          <td key={`${propertyId}-${index}`} style={cellStyle}>
            {row[propertyId]}
          </td>
        );
      }
      return cell;
    });

    return <tr key={row.id}>{entityData}</tr>;
  };

  const tableHead = <tr>{props.headings.map(renderHeadingRow)}</tr>;
  const tableBody = props.rows.map(renderRow);

  return (
    <Table bordered hover size="sm" responsive>
      <thead className="thead-light">{tableHead}</thead>
      <tbody>{tableBody}</tbody>
    </Table>
  );
};

export default dataTable;
