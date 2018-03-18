import * as React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { IPartFormProps } from './Interfaces/IPartForm';

export class RegisterPartForm extends React.Component<IPartFormProps, any> {
    constructor(props: IPartFormProps, context: any) {
      super(props, context);

      this.state = {
        controlId : 'Register' + props.name
      };
    }
    getValidationState() {
      const length: number = this.props.value.length;
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length > 0) return 'error';
      return null;
    }
    render() {
     return (
        <FormGroup
          controlId={this.state.controlId}
          validationState={this.getValidationState()}
        >
          <ControlLabel>{this.props.name} :</ControlLabel>
          <FormControl
            type={this.props.type}
            value={this.props.value}
            placeholder="Enter text"
            onChange={this.props.setValue}
          />
          <FormControl.Feedback />
        </FormGroup>
      );
    }
}
