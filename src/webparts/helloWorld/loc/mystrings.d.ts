declare interface IHelloWorldWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  CustomGroupName: string;
  DescriptionFieldLabel: string;
  NumberField_NaN: string;
  TextField_NotEmply: string;
  ListFieldLabel: string;
  ListItemFieldLabel: string;
}

declare module 'HelloWorldWebPartStrings' {
  const strings: IHelloWorldWebPartStrings;
  export = strings;
}
