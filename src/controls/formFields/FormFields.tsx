import * as React from 'react';

import {
    DatePicker,
    DayOfWeek,
    IDatePickerStrings
} from 'office-ui-fabric-react/lib/DatePicker';
import {
    Dropdown,
    DropdownMenuItemType,
    IDropdownStyles,
    IDropdownOption
} from 'office-ui-fabric-react/lib/Dropdown';
import {
    Stack,
    IStackProps
} from "office-ui-fabric-react/lib/Stack";
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Text } from "office-ui-fabric-react/lib/Text";
import {
    TextField,
    MaskedTextField
} from "office-ui-fabric-react/lib/TextField";
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
//////////////////////////////////
import { PeoplePicker, IPeoplePickerProps } from '../../PeoplePicker';
import { TaxonomyPicker, ITaxonomyPickerProps } from '../../TaxonomyPicker';
import { ISPField } from '../../common/ISharePointUtilityProps';
import { IFormFieldsProps } from './IFormFieldsProps';
import * as styles from './FormFields.module.scss';
import './FormFields.fabric.scss';

export class FormFields extends React.Component<IFormFieldsProps, {}> {
    constructor(props: IFormFieldsProps) {
        super(props);
    }

    _getErrorMessage(value) {
        return value.length == 0 ? "Please enter text here" : "";
    };

    _onChangeTextField(fieldName: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {

        const f = this.props.fields.filter((item) => item.StaticName === fieldName)[0];
        if (newValue && f.MaxLength) {
            if (newValue.length <= f.MaxLength)
                this.props.onChange(fieldName, newValue);
            else
                console.log('invalid length: ' + newValue);
        }
        else {
            console.log('invalid: ' + newValue);
        }
    }

    _onChangeNoteField(fieldName: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {

        const f = this.props.fields.filter((item) => item.StaticName === fieldName)[0];
        if (newValue) {
            this.props.onChange(fieldName, newValue);
        }
        else {
            console.log('invalid: ' + newValue);
        }
    }

    _onChangeNumberField(fieldName: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
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

    _onChangeChoiceField(fieldName: string, event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void {
        const f = this.props.fields.filter((item) => item.StaticName === fieldName)[0];
        const newValue = option.key;
        if (newValue) {
            this.props.onChange(fieldName, newValue);
        }
        else {
            console.log('invalid: ' + newValue);
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

    public render(): React.ReactElement<IFormFieldsProps> {

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
                        onChange={(event, newValue) => this._onChangeTextField(v.StaticName, event, newValue)}
                        validateOnFocusIn
                        validateOnFocusOut
                        validateOnLoad={v.Required}
                        //deferredValidationTime={200}
                        errorMessage={this.props.error[v.StaticName]}
                        defaultValue={v.DefaultValue}
                        maxLength={v.MaxLength}
                        className="textField-cssStyled"
                    //styles={}
                    />
                );
                    break;
                case 'Note': return (
                    <TextField
                        label={v.Title}
                        required={v.Required}
                        //onGetErrorMessage={_getErrorMessage}
                        onChange={(event, newValue) => this._onChangeNoteField(v.StaticName, event, newValue)}
                        validateOnFocusIn
                        validateOnFocusOut
                        validateOnLoad={v.Required}
                        //deferredValidationTime={200}
                        //errorMessage="override the validete"
                        multiline
                        resizable={false}
                        rows={v.NumberOfLines}
                        className='noteField-cssStyled'
                    />
                );
                    break;
                case 'Number': return (
                    <TextField
                        label={v.Title}
                        required={v.Required}
                        //onGetErrorMessage={_getErrorMessage}
                        onChange={(event, newValue) => this._onChangeNumberField(v.StaticName, event, newValue)}
                        validateOnFocusIn
                        validateOnFocusOut
                        validateOnLoad={v.Required}
                    //deferredValidationTime={200}
                    //errorMessage="override the validete"
                        className='numberField-cssStyled'
                    />
                );
                    break;
                case 'Choice':
                    const options: IDropdownOption[] = v.Choices.map((vv) => {
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
                            onChange={(event, option, index) => this._onChangeChoiceField(v.StaticName, event, option, index)}
                            //multiSelect
                            options={options}
                            required={v.Required}
                            styles={{ dropdown: { width: 300 } }}
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
                            onSelectDate={(date) => this._onChangeDateTimeField(v.StaticName, date)}
                            firstDayOfWeek={DayOfWeek.Sunday}
                            strings={DayPickerStrings}
                            showMonthPickerAsOverlay={true}
                            placeholder="Select a date"
                            ariaLabel="Select a date"

                        />
                    );
                    break;
                case 'Lookup':
                    // add placeholder for options
                    // SharePointUtility.GetLookupListItem(this.props.context, v.LookupList, v.LookupField).then((data) => {
                    //     const lookupItems = data.value;
                    // });
                    // const lookupOptions: IDropdownOption[] = lookupItems.map((vv) => {
                    //     return { key: vv.Id, text: vv[v.LookupField] }
                    // });
                    const defaultValue = this.props.data[v.StaticName];
                    const lookupOptions: IDropdownOption[] = this.props.lookupOptions[v.StaticName];
                    return (
                        <Dropdown
                            placeholder="Select options"
                            label={v.Title}
                            selectedKey={defaultValue ? defaultValue : undefined}
                            //defaultSelectedKey={escape(v.DefaultValue)}
                            //selectedKey={selectedItem ? selectedItem.key : undefined}
                            onChange={(event, option, index) => this._onChangeChoiceField(v.StaticName, event, option, index)}
                            //multiSelect
                            options={lookupOptions ? lookupOptions : []}
                            required={v.Required}
                            styles={{ dropdown: { width: 300 } }}
                        />
                    );
                    break;
                case 'User':
                    return (
                        <PeoplePicker
                            titleText={v.Title}
                            isRequired={v.Required}
                            context={this.props.context}
                            selectedItems={(items: IPersonaProps[]) => { console.log(items) }}
                        />
                    );
                    break;
                case 'UserMulti':
                    return (
                        <PeoplePicker
                            titleText={v.Title}
                            isRequired={v.Required}
                            context={this.props.context}
                            personSelectionLimit={5}
                            selectedItems={(items: IPersonaProps[]) => { console.log(items) }}
                        />
                    );
                    break;
                case 'TaxonomyFieldType':
                    return (
                        <TaxonomyPicker
                            label={v.Title}
                            panelTitle={v.Title}
                            termsetNameOrID={v.Title}
                            context={this.props.context}
                            
                        />
                    );
                    break;
                default:
                    console.log(v.Title);
                    return <Text>{v.Title}</Text>
            };
        });


        return <Stack {...columnProps}>{listItems}</Stack>;
    }
}