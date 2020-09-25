import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { DefaultPalette } from 'office-ui-fabric-react';
import { Text } from 'office-ui-fabric-react/lib/Text';
import {
  Stack,
  IStackStyles,
  IStackTokens,
  IStackItemStyles
} from 'office-ui-fabric-react/lib/Stack';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import './DropzoneDemo.scss';

export interface IDropzoneDemoProps {

}

export interface IDropzoneDemoState {
  files: File[];
}

export class DropzoneDemo extends React.Component<IDropzoneDemoProps, IDropzoneDemoState> {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  public render(): React.ReactElement<IDropzoneDemoProps> {
    const myProps = {
      files: this.state.files,
      onDrop: (files) => {
        console.log(files);
        const temp = this.state.files.concat(files);
        this.setState({ files: temp });
      }
    };
    return <Basic {...myProps} /> //</Basic>(myProps);
  }

}


function Basic(props) {
  console.log(props);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop: (files) => { props.onDrop(files) } });

  const files = props.files && props.files.length > 0 ? props.files.map((file: File) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      </li>
  )) : <li>no files</li>;

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}