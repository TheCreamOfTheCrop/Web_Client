import * as React from 'react';
import { FormGroup, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';
import { IPartFormPropsExtended } from './IPartFormExtended';

// Not exactly the same copypast, but a reference from the oneof Profil
export class PartFormPropsExtended extends React.Component<IPartFormPropsExtended, any> {
    constructor(props: IPartFormPropsExtended, context: any) {
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
          
          <InputGroup>
            <FormControl
              type={this.props.type}
              value={this.props.value}
              placeholder="Enter value"
              onChange={this.props.setValue}
            />
            {this.props.addOn !== undefined ? <InputGroup.Addon>{this.props.addOn}</InputGroup.Addon> : null}
          </InputGroup>

          <FormControl.Feedback />
        </FormGroup>
      );
    }
}
