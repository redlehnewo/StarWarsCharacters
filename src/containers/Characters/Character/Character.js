import React, { Component } from "react";
import Page from "../../../components/UI/Page/Page";
import Input from "../../../components/UI/Input/Input";
import characterService from "../../../core/services/characterService";

export class Character extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = {
      name: React.createRef(),
      species: React.createRef(),
      gender: React.createRef(),
      homeworld: React.createRef()
    };
  }

  state = {
    isCreateNew: true,
    isLoading: false,
    saving: false,
    formIsValid: false,
    characterForm: {
      name: {
        elementType: "input",
        label: "Name",
        elementConfig: {
          id: "characterName",
          type: "text",
          placeholder: "Enter name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ""
      },
      species: {
        elementType: "select",
        label: "Species",
        elementConfig: {
          options: [],
          id: "species"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ""
      },
      gender: {
        elementType: "radio",
        label: "Gender",
        elementConfig: {
          options: [],
          id: "gender",
          name: "gender"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ""
      },
      homeworld: {
        elementType: "input",
        label: "Homeworld",
        elementConfig: {
          id: "homeworld",
          type: "text",
          placeholder: "Enter homeworld"
        },
        value: "",
        validation: {},
        valid: true,
        touched: false,
        errorMessage: ""
      }
    }
  };

  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.setState({ isLoading: true, isCreateNew: false });
      characterService
        .getCharacter(this.props.match.params.id)
        .then(response => {
          const updatedCharacterForm = { ...this.state.characterForm };
          Object.keys(updatedCharacterForm).forEach(inputId => {
            const updatedInputConfig = { ...updatedCharacterForm[inputId] };
            updatedInputConfig.value = response[inputId];
            updatedInputConfig.valid = true;
            updatedCharacterForm[inputId] = updatedInputConfig;
          });

          this.setState(prevState => {
            const updatedState = { ...prevState };
            updatedState.isLoading = false;
            updatedState.characterForm = updatedCharacterForm;
            updatedState.formIsValid = true;

            return updatedState;
          });
        })
        .catch(err => {
          this.setState({ isLoading: false });
        });
    }

    // Get Species Options
    characterService.getSpecies().then(response => {
      const options = response.map(item => {
        return { value: item, label: item };
      });
      this.setState(this._updateFormElementConfigOptions("species", options));
    });

    // Get Gender Options
    characterService.getGenders().then(response => {
      this.setState(this._updateFormElementConfigOptions("gender", response));
    });

    // Focus on the name input field
    this.inputRefs.name.current.focus();
  }

  submitChangesHandler = event => {
    event && event.preventDefault();

    if (!this.state.formIsValid) {
      let firstInvalidField = null;
      let updatedCharacterForm = { ...this.state.characterForm };

      Object.keys(updatedCharacterForm).forEach(inputId => {
        let inputConfig = { ...updatedCharacterForm[inputId] };
        inputConfig.touched = true;
        inputConfig.valid = this.checkValidity(
          inputConfig.value,
          inputConfig.validation
        );
        inputConfig.errorMessage = "This field is required.";
        updatedCharacterForm[inputId] = inputConfig;

        if (!inputConfig.valid && !firstInvalidField) {
          firstInvalidField = true;
          this.inputRefs[inputId] && this.inputRefs[inputId].current.focus();
        }
      });
      this.setState({ characterForm: updatedCharacterForm });
      return;
    }

    const formData = Object.keys(this.state.characterForm).reduce(
      (acc, inputKey) => {
        acc[inputKey] = this.state.characterForm[inputKey].value;
        return acc;
      },
      {}
    );
    formData.id = this.state.isCreateNew ? null : this.props.match.params.id;

    this.setState({ saving: true });
    characterService
      .saveCharacter(formData)
      .then(response => {
        this.setState({ saving: false });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ saving: false });
      });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) return true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (event, inputId) => {
    const updatedCharacterForm = { ...this.state.characterForm };
    const updatedCharacterFormElement = { ...updatedCharacterForm[inputId] };
    updatedCharacterFormElement.value = event.target.value;
    updatedCharacterFormElement.touched = true;
    updatedCharacterFormElement.valid = this.checkValidity(
      updatedCharacterFormElement.value,
      updatedCharacterFormElement.validation
    );
    updatedCharacterFormElement.errorMessage = "This field is required.";

    // Check if form is valid
    let formIsValid = true;
    Object.keys(this.state.characterForm).forEach(inputId => {
      formIsValid = this.state.characterForm[inputId].valid && formIsValid;
    });

    updatedCharacterForm[inputId] = updatedCharacterFormElement;
    this.setState({
      characterForm: updatedCharacterForm,
      formIsValid: formIsValid
    });
  };

  /**
   *
   * @param {*} inputId
   * @param {Array} options Array of objects with label and value
   */
  _updateFormElementConfigOptions(inputId, options) {
    return prevState => {
      const updatedState = { ...prevState };
      const updatedCharacterForm = { ...updatedState.characterForm };
      const updatedInputConfig = { ...updatedCharacterForm[inputId] };
      const updatedInputElementConfig = {
        ...updatedInputConfig.elementConfig
      };
      updatedInputElementConfig.options = options;
      updatedInputConfig.elementConfig = updatedInputElementConfig;
      updatedInputConfig.value = options[0] && options[0].value;
      updatedInputConfig.valid = true;
      updatedCharacterForm[inputId] = updatedInputConfig;
      updatedState.characterForm = updatedCharacterForm;

      return updatedState;
    };
  }

  render() {
    const formElementInputs = Object.keys(this.state.characterForm).map(key => {
      const formElementConfig = this.state.characterForm[key];
      return (
        <Input
          key={key}
          label={formElementConfig.label}
          elementType={formElementConfig.elementType}
          elementConfig={formElementConfig.elementConfig}
          value={formElementConfig.value}
          ref={this.inputRefs[key]}
          invalid={!formElementConfig.valid}
          touched={formElementConfig.touched}
          shouldValidate={formElementConfig.validation}
          validationErrorMessage={formElementConfig.errorMessage}
          validation={formElementConfig.validation}
          changed={event => this.inputChangeHandler(event, key)}
        />
      );
    });

    const action = this.state.isCreateNew ? "Add" : `Edit`;

    let page = <p>Loading ....</p>;
    if (!this.state.isLoading) {
      page = (
        <Page title={`${action} Character`}>
          <form onSubmit={this.submitChangesHandler}>
            {formElementInputs}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={this.state.saving}
            >
              {`${action} Character`}
            </button>
            <button
              className="btn btn-default"
              disabled={this.state.saving}
              onClick={() => this.props.history.push("/")}
            >
              Cancel
            </button>
          </form>
        </Page>
      );
    }

    return page;
  }
}

export default Character;
