import * as React from 'react';
import Dropzone from 'react-dropzone'
import { escape, find } from '@microsoft/sp-lodash-subset'
import {
    Dropdown,
    DropdownMenuItemType,
    IDropdownStyles,
    IDropdownOption
} from 'office-ui-fabric-react/lib/Dropdown';

import { TextField, MaskedTextField } from "office-ui-fabric-react/lib/TextField";
import { Text } from "office-ui-fabric-react/lib/Text";
import {
    DatePicker,
    DayOfWeek,
    IDatePickerStrings,
    IPersonaProps,
    Label
} from 'office-ui-fabric-react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Stack, IStackProps } from "office-ui-fabric-react/lib/Stack";
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
////////////////////////////////////////////////////////////
import * as strings from "HelloWorldWebPartStrings";
import { PeoplePicker } from "../../../controls/peoplepicker/PeoplePickerComponent";
import { TaxonomyPicker } from "../../../controls/taxonomyPicker/TaxonomyPicker";
import { IPickerTerms } from "../../../controls/taxonomyPicker/ITermPicker";
import SharePointUtility from "../../../common/SharePointUtility";
import {
    ISPList,
    ISPContentType,
    ISPField,
    ISPListItem
} from '../../../common/ISharePointUtilityProps';
import {
    ICustomFormProps,
    ICustomFormState,
    IListFormProps,
    IListFormState
} from './ICustomFormProps';
//import { Fields } from '@pnp/sp/fields/types';

class ListForm extends React.Component<IListFormProps, IListFormState> {
    constructor(props: IListFormProps) {
        super(props);

        // set initial state
        // this.state = {
        //   isLoadingSchema: false,
        //   isLoadingData: false,
        //   isSaving: false,
        //   data: {},
        //   originalData: {},
        //   errors: [],
        //   notifications: [],
        //   fieldErrors: {}
        // };

    }

    _getErrorMessage(value) {
        return value.length == 0 ? "Please enter text here" : "";
    };

    _onChangeTextField(fieldName: string, newValue?: string): void {

        const f = this.props.fields.filter((item) => item.StaticName === fieldName)[0];
        if (newValue) {
            this.props.onChange(fieldName, newValue);
        }
        else {
            console.log('invalid: ' + newValue);
        }

    }

    _onChangeURLField(fieldName: string, isDescription: boolean, newValue?: string): void {

        this.props.onChange(fieldName, { Description: "My blog", Url: "http://www.baidu.com" });

    }

    _onChangeNoteField(fieldName: string, newValue?: string): void {

        const f = this.props.fields.filter((item) => item.StaticName === fieldName)[0];
        if (newValue) {
            this.props.onChange(fieldName, newValue);
        }
        else {
            console.log('invalid: ' + newValue);
        }

    }

    _onChangeNumberField(fieldName: string, newValue?: string): void {
        const f = this.props.fields.filter((item) => item.StaticName === fieldName)[0];
        const newNumber: number = Number(newValue);
        if (newValue && !isNaN(newNumber)) {
            if (f.MaximumValue && newNumber <= f.MaximumValue) {

            }
            else {

            }
            if (f.MinimumValue && newNumber >= f.MinimumValue) {

            }
            else {

            }
            this.props.onChange(fieldName, newValue);
        }
        else {
            console.log('invalid: ' + newValue);
        }
    }

    _onChangeChoiceField(fieldName: string, option?: IDropdownOption, index?: number): void {
        const f = this.props.fields.filter((item) => item.StaticName === fieldName)[0];
        const newValue = option.key;
        if (newValue) {
            this.props.onChange(fieldName + "Id", newValue);
        }
        else {
            console.log('invalid: ' + newValue);
        }
    }

    private _onChangeMultiChoiceField(fieldName: string, option?: IDropdownOption): void {
        if (option) {
            let oldValue = this.props.data[fieldName];
            oldValue = oldValue ? oldValue : [];
            if (option.selected) {
                oldValue.push(option.key.toString());
            } else {
                if (oldValue) {
                    oldValue = oldValue.filter((f) => f != option.key.toString());
                }
            }
            this.props.onChange(fieldName, oldValue);
        } else {

        }
    }

    _onChangeDateTimeField(fieldName: string, newValue: Date): void {
        if (newValue) {
            this.props.onChange(fieldName, newValue);
        }
        else {
            console.log('invalid: ' + newValue);
        }
    }

    _onChange(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    };

    public render(): React.ReactElement<IListFormProps> {

        const columnProps = {
            tokens: { childrenGap: 15 },
            styles: { root: { width: 300 } }
        };

        const listItems = this.props.fields.map((v: ISPField) => {
            switch (v.TypeAsString) {
                case 'Text': return (
                    <TextField
                        label={v.Title}
                        required={v.Required}
                        //onGetErrorMessage={_getErrorMessage}
                        onChange={(event, newValue) => this._onChangeTextField(v.StaticName, newValue)}
                        validateOnFocusIn
                        validateOnFocusOut
                        validateOnLoad={v.Required}
                        //deferredValidationTime={200}
                        errorMessage={this.props.error[v.StaticName]}
                        defaultValue={v.DefaultValue}
                        maxLength={v.MaxLength}
                    />
                );
                    break;
                case 'Note': return (
                    <TextField
                        label={v.Title}
                        required={v.Required}
                        //onGetErrorMessage={_getErrorMessage}
                        onChange={(event, newValue) => this._onChangeNoteField(v.StaticName, newValue)}
                        validateOnFocusIn
                        validateOnFocusOut
                        validateOnLoad={v.Required}
                        //deferredValidationTime={200}
                        //errorMessage="override the validete"
                        multiline
                        resizable={false}
                        rows={v.NumberOfLines}
                    />
                );
                    break;
                case 'Number': return (
                    <TextField
                        label={v.Title}
                        required={v.Required}
                        //onGetErrorMessage={_getErrorMessage}
                        onChange={(event, newValue) => this._onChangeNumberField(v.StaticName, newValue)}
                        validateOnFocusIn
                        validateOnFocusOut
                        validateOnLoad={v.Required}
                    //deferredValidationTime={200}
                    //errorMessage="override the validete"

                    />
                );
                    break;
                case 'Currency': return (
                    <TextField
                        label={v.Title}
                        required={v.Required}
                        //onGetErrorMessage={_getErrorMessage}
                        onChange={(event, newValue) => this._onChangeTextField(v.StaticName, newValue)}
                        validateOnFocusIn
                        validateOnFocusOut
                        validateOnLoad={v.Required}
                        //deferredValidationTime={200}
                        errorMessage={this.props.error[v.StaticName]}
                        defaultValue={v.DefaultValue}
                        maxLength={v.MaxLength}
                    />
                );
                case 'Choice':
                    let options: IDropdownOption[] = v.Choices.map((vv) => {
                        return { key: escape(vv), text: vv }
                    });
                    let value = this.props.data[v.StaticName]
                    return (
                        <Dropdown
                            placeholder="Select options"
                            label={v.Title}
                            selectedKey={value ? escape(value) : undefined}
                            //defaultSelectedKey={escape(v.DefaultValue)}
                            //selectedKey={selectedItem ? selectedItem.key : undefined}
                            onChange={(event, option, index) => this._onChangeChoiceField(v.StaticName, option, index)}
                            //multiSelect
                            options={options}
                            required={v.Required}
                            styles={{ dropdown: { width: 300 } }}
                        />
                    );
                    break;
                // Multi 
                case 'MultiChoice':
                    let optionsM: IDropdownOption[] = v.Choices.map((vv) => {
                        return { key: vv, text: vv };
                    });
                    let valueM = this.props.data[v.StaticName];

                    return (
                        <Dropdown
                            placeholder="Select options"
                            label={v.Title}
                            selectedKeys={value ? value : undefined}
                            //defaultSelectedKey={escape(v.DefaultValue)} 
                            onChange={(event, option, index) => this._onChangeMultiChoiceField(v.StaticName, option)}
                            multiSelect={true}
                            options={options}
                            required={v.Required}
                            errorMessage={this.props.error[v.StaticName]}
                        //styles={dropdownStyles}
                        />
                    );
                    break;
                case 'DateTime':
                    const DayPickerStrings: IDatePickerStrings = {
                        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        goToToday: 'Go to today',
                        prevMonthAriaLabel: 'Go to previous month',
                        nextMonthAriaLabel: 'Go to next month',
                        prevYearAriaLabel: 'Go to previous year',
                        nextYearAriaLabel: 'Go to next year',
                        closeButtonAriaLabel: 'Close date picker',
                        isRequiredErrorMessage: 'Field is required.',
                        invalidInputErrorMessage: 'Invalid date format.'
                    };
                    const controlClass = mergeStyleSets({
                        control: {
                            margin: '0 0 15px 0',
                            maxWidth: '300px'
                        }
                    });

                    return (
                        <DatePicker
                            className={controlClass.control}
                            label={v.Title}
                            isRequired={v.Required}
                            value={this.props.data[v.StaticName]}
                            onSelectDate={(date) => this._onChangeDateTimeField(v.StaticName, date)}
                            firstDayOfWeek={DayOfWeek.Sunday}
                            strings={DayPickerStrings}
                            showMonthPickerAsOverlay={true}
                            placeholder="Select a date"
                            ariaLabel="Select a date"
                        />
                    );
                    break;
                case 'LookupMulti':
                case 'Lookup':
                    let isLookupMulti = false;
                    if (v.TypeAsString === 'LookupMulti') {
                        isLookupMulti = true;
                    } else {
                        isLookupMulti = false;
                    }
                    const defaultValue = this.props.data[v.StaticName];
                    const lookupOptions: IDropdownOption[] = this.props.lookupOptions[v.StaticName]
                    return (
                        <Dropdown
                            placeholder="Select options"
                            label={v.Title}
                            selectedKey={defaultValue ? defaultValue : undefined}
                            //defaultSelectedKey={escape(v.DefaultValue)}
                            //selectedKey={selectedItem ? selectedItem.key : undefined}
                            onChange={(event, option, index) => this._onChangeChoiceField(v.StaticName, option, index)}
                            multiSelect={isLookupMulti}
                            options={lookupOptions ? lookupOptions : []}
                            required={v.Required}
                            styles={{ dropdown: { width: 300 } }}
                        />
                    );

                    break;
                case 'URL':
                    return (
                        <div>
                            <Label required={v.Required}>{v.Title}</Label>
                            <TextField
                                label={'type the web address'}
                                required={v.Required}
                                //onGetErrorMessage={_getErrorMessage}
                                onChange={(event, newValue) => this._onChangeTextField(v.StaticName, newValue)}
                                validateOnFocusIn
                                validateOnFocusOut
                                //validateOnLoad={v.Required}
                                //deferredValidationTime={200}
                                //errorMessage={this.props.error[v.StaticName]}
                                //defaultValue={v.DefaultValue}
                                maxLength={v.MaxLength}
                            />
                            <TextField
                                label={'type the description'}
                                required={v.Required}
                                //onGetErrorMessage={_getErrorMessage}
                                onChange={(event, newValue) => this._onChangeTextField(v.StaticName, newValue)}
                                validateOnFocusIn
                                validateOnFocusOut
                                //validateOnLoad={v.Required}
                                //deferredValidationTime={200}
                                //errorMessage={this.props.error[v.StaticName]}
                                //defaultValue={v.DefaultValue}
                                maxLength={v.MaxLength}
                            />
                        </div>
                    );
                    break;
                case 'User':
                case 'UserMulti':
                    let isUserMulti = false;
                    if (v.TypeAsString === 'UserMulti') {
                        isUserMulti = true;
                    } else {
                        isUserMulti = false;
                    }
                    let principalTypes = [1, 4]; //people only
                    if (v.SelectionMode == 1) //people and group
                        principalTypes = [1, 4, 8];
                    if (v.SelectionMode == 2) //group only
                        principalTypes = [8];
                    //let emails = this.props.emails[v.EntityPropertyName];

                    return (
                        <div>
                            <PeoplePicker
                                titleText={v.Title}
                                isRequired={v.Required}
                                //errorMessage={}
                                ensureUser={true}
                                principalTypes={principalTypes}
                                suggestionsLimit={20}
                                //defaultSelectedUsers={emails ? emails : []}
                                //webAbsoluteUrl={this.props.siteUrl}
                                context={this.props.context}
                                personSelectionLimit={isUserMulti ? 10 : 1}
                                selectedItems={(items: IPersonaProps[]) => {
                                    if (items && items.length > 0) {
                                        if (isUserMulti) {
                                            this.props.onChange(v.EntityPropertyName + 'Id', items.map((i) => i.id));
                                        } else {
                                            this.props.onChange(v.EntityPropertyName + 'Id', items[0].id);
                                        }
                                    } else {
                                        this.props.onChange(v.EntityPropertyName + 'Id', null);
                                    }
                                }}
                            //peoplePickerWPclassName={PeoplePickerClassName.control}
                            />

                        </div>
                    );
                    break;
                case 'TaxonomyFieldType':
                case 'TaxonomyFieldTypeMulti':
                    let isTaxonomyMulti = false;
                    if (v.TypeAsString == 'TaxonomyFieldTypeMulti') {
                        isTaxonomyMulti = true;
                    }

                    let fieldName = this.props.termSetMapping[v.StaticName];
                    return (
                        <TaxonomyPicker
                            label={v.Title}
                            panelTitle={v.Title}
                            //initialValues={this.props.terms[fieldNames.YFunctions] ? this.props.terms[fieldNames.YFunctions] : []}
                            termsetNameOrID={v.TermSetId}
                            context={this.props.context}
                            allowMultipleSelections={isTaxonomyMulti}
                            onChange={(newValue: IPickerTerms) => {
                                if (newValue.length > 0) {
                                    let fieldValue = newValue.map(element => element.name + '|' + element.key).join(';');
                                    this.props.onChange(fieldName, fieldValue);
                                }
                                else {
                                    this.props.onChange(fieldName, '')
                                }

                            }}
                        />
                    );
                    break;
                default:
                    console.log(v.Title);
                    return <Text>{v.Title} + "---" + {v.TypeAsString}</Text>
            };
        });

        return <Stack {...columnProps}>{listItems}</Stack>;
    }
}

export default class CustomForm extends React.Component<ICustomFormProps, ICustomFormState> {

    constructor(props: ICustomFormProps) {
        super(props);

        this.state = {
            listId: undefined,
            contentTypes: [],
            selectedItem: undefined,
            fields: [],
            data: {},
            errors: {},
            lookupOptions: {},
            termSetMapping: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.initGui();
    }

    public componentDidMount() {
        this.initGui();
    }

    private initGui = () => {
        const self = this;
        SharePointUtility.GetListInfo(this.props.context, this.props.listTitle).then((list) => {

            self.setState({ listId: list.Id });
            SharePointUtility.GetListContentTypes(self.props.context, list.Id).then((cts) => {

                let tempOptions = cts.map((v) => {
                    return { key: v.StringId, text: v.Name };
                });
                self.setState({ contentTypes: tempOptions });
            })
        })
    }

    handleSubmit() {
        console.log('submit click');
        SharePointUtility.CreateListItem(this.props.context, this.props.context.pageContext.web.absoluteUrl,
            this.props.listTitle, this.state.data).then((item: ISPListItem) => {
                console.log(item.Id + "/" + item.GUID + "/" + item.Title + "/" + item.ContentTypeId);
                alert(item.Id);
            });
    }
    // before submit
    validateFields() {
        let flag = true
        this.state.fields.map((field) => {
            if (field.Required && !this.state.data[field.StaticName]) {
                this.setState((prevState, props) => {
                    return {
                        ...prevState,
                        errors: { ...prevState.errors, [field.StaticName]: strings.TextField_NotEmply },
                    };
                });
                flag = false;
                return;
            }

            switch (field.TypeAsString) {
                case '':
                    break;
                case '':
                    break;
                default:
                    flag = true;
                    break;
            }

        });
    }

    dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 }
    };

    render(): React.ReactElement<ICustomFormProps> {
        const { selectedItem } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <Dropzone onDrop={files => console.log(files)}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="container">
                            <div
                                {...getRootProps({
                                    className: 'dropzone',
                                    onDrop: event => event.stopPropagation()
                                })}
                            >
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </div>
                    )}
                </Dropzone>
                <p>please enter the following text fields</p>
                <Dropdown placeholder="Select an option" label="List ContentTypes"
                    selectedKey={selectedItem ? selectedItem.key : undefined}
                    onChange={this._onChange}
                    options={this.state.contentTypes}
                    styles={this.dropdownStyles} />
                <ListForm context={this.props.context}
                    fields={this.state.fields}
                    data={this.state.data}
                    lookupOptions={this.state.lookupOptions}
                    termSetMapping={this.state.termSetMapping}
                    error={this.state.errors} onChange={this._valueChanged} />
                <br />
                <input type="submit" value="Submit" />

            </form>
        );
    }

    private _valueChanged = (fieldName: string, newValue: any): void => {
        console.log(fieldName + '**' + newValue);
        this.setState((prevState, props) => {
            return {
                ...prevState,
                data: { ...prevState.data, [fieldName]: newValue },
            };
        });
    }

    private _onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        console.log(`Selection change: ${item.text} ${item.selected ? 'selected' : 'unselected'}`);
        this.setState({ selectedItem: item });
        let ctId: string = item.key.toString();
        SharePointUtility.GetFieldsOfListContentType(this.props.context, this.props.context.pageContext.web.absoluteUrl,
            this.props.listTitle, ctId).then((fields: ISPField[]) => {
                let data = fields.reduce((newData, f) => { if (f.DefaultValue) newData[f.StaticName] = f.DefaultValue; return newData; }, {});

                this.setState({ fields: fields, data: data });
                this._loadLookupOptions(fields).catch(error => console.log(error));
                this._loadTermSetInternalName(fields).catch(error => console.log(error));
            });
    }

    private _loadLookupOptions = async (fields: ISPField[]): Promise<void> => {
        let options = {};
        var promises = fields.filter(f => f.TypeAsString === "Lookup" || f.TypeAsString === "LookupMulti").map(async f => {
            const data = await SharePointUtility.GetLookupListItem(this.props.context, this.props.context.pageContext.web.absoluteUrl,
                f.LookupList, f.LookupField);

            options[f.StaticName] = data.map((vv: any) => { return { key: vv.Id, text: vv[f.LookupField] } });
        });

        Promise.all(promises).then(() => {
            this.setState({ lookupOptions: options });
        });
    }

    private _loadTermSetInternalName = async (fields: ISPField[]): Promise<void> => {
        let mappings = {};
        var promises = fields.filter(f => f.TypeAsString === "TaxonomyFieldType").map(async f => {
            let noteField = await SharePointUtility.GetListFieldByGuid(this.props.context, this.props.context.pageContext.web.absoluteUrl, this.props.listTitle, f.TextField);
            let internalName = noteField.InternalName;
            mappings[f.StaticName] = internalName;
        });

        Promise.all(promises).then(() => {
            this.setState({ termSetMapping: mappings });
        });
    }
}

