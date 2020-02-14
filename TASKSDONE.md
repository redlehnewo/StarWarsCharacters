# Sonalake Task Features Implemented

### Pagination

As a user I want to be able to change currenly visible page of results by using pagination buttons.

- [x] Pagination should be done [server-side](https://github.com/typicode/json-server#paginate).
- [x] Results should be displayed in pages of 10.
- [x] Clicking on a page button should change currently visible page to the one selected.
- [x] Previous and Next buttons are present and working. Previous button should be disabled when the first page is selected. Next button should be disabled when the last page is selected.

### Searching

As a user I want to filter results by using the search box above the data grid.

- [x] Searching should use the [full-text search api endpoint](https://github.com/typicode/json-server#full-text-search).
- [x] When there are no results matching the current query a "No Results Found" message is shown.
- [x] Search requests to API are debounced by 200 ms.
- [x] A regular list of items is shown when the search query input is empty.

### New entity form

As a user I want to be able to add new characters by using a new form.

- [x] A new Add Character route should be added.
- [x] Clicking on Add Character button on the List View should navigate to the new route.
- [x] Form should consist of the following form fields:
  - Name - text input, required
  - Species - select input, required, options from [/species](http://localhost:3000/species) api
  - Gender - radio input, required
    - value: male, label: Male
    - value: female, label: Female
    - value: n/a, label: n/a
  - Homeworld - text input, optional
- [x] Required form fields should be marked by a blue \* next to their label.
- [x] Relevant error messages should be displayed for form controls with validation errors:
  - required - This field is required.
- [x] Invalid form fields should be styled using `.is-invalid` [bootstrap css class](https://getbootstrap.com/docs/4.1/components/forms/#server-side). A field should be styled as invalid only if it is invald and form field has been touched or user has tried to submit an invalid form. Similiar logic should be applied to the visibility of error messages - an error message should be displayed only if a form field is styled as invalid.
- [x] Add Character form submit button should only be disabled when the request creating a new item is in progress.
- [x] If a user tries to submit the form but the form is invalid, the top-most invalid form field should get focused.
- [x] Submitting a valid form should send a POST request to ([http://localhost:3000/characters](http://localhost:3000/characters)).
- [x] Successfully creating a new item should navigate the user to the main list view.

## Bonus Tasks (implement only if you want to)

- [x] Add working Delete button for each item.
- [x] Add working Edit button for each item.
- [x] Add sorting by clicking on the data grid row headers.
