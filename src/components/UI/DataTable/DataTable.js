import React from "react";

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
    const headings = props.headings.map(heading => heading.mapToProperty);
    const entityData = headings.map((heading, index) => {
      let cell = null;
      if (index === 0) {
        cell = (
          <th scope="row" key={`${heading}-${index}`}>
            {row[heading]}
          </th>
        );
      } else if (heading === "actions") {
        cell = (
          <td key={`${heading}-${index}`}>
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
        cell = <td key={`${heading}-${index}`}>{row[heading]}</td>;
      }
      return cell;
    });

    return <tr key={row.id}>{entityData}</tr>;
  };

  const tableHead = <tr>{props.headings.map(renderHeadingRow)}</tr>;
  const tableBody = props.rows.map(renderRow);

  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-light">{tableHead}</thead>
      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default dataTable;
