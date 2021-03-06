import * as React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { IPartFormProps } from './IPartForm';

// Warning, it's the frist copy past, if i had to do it a second time i would need to refacto ;)

export default class PartForm extends React.Component<IPartFormProps, any> {
    constructor(props: IPartFormProps, context: any) {
      super(props, context);

      this.state = {
        controlId : 'Register' + props.name
      };
    }
   
    render() {
     return (
        <FormGroup
          controlId={this.state.controlId}
          validationState={this.props.validation()}
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
