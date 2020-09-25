import * as React from 'react';
import {
    PrimaryButton,
    getTheme,
    ITheme,
    DatePicker,
    IDatePickerStyles,
    IDatePickerStyleProps,
    DayOfWeek,
    IDatePickerStrings,
    Stack,
    IStackProps,
    Text, Label
} from 'office-ui-fabric-react';
import {format} from 'date-fns';

export interface IDatePickerDemoProps {
    onChange(date: Date): void;
    text: string;
}

export interface IDatePickerDemoState {
    startDateValue: Date;
    endDateValue: Date;
}

export class DatePickerDemo extends React.Component<IDatePickerDemoProps, IDatePickerDemoState>{
    constructor(props) {
        super(props);

        this.state = {
            startDateValue: null,
            endDateValue: null
        }
    }

    public render() {
        const theme: ITheme = getTheme();
        console.log(theme);

        const columnProps: Partial<IStackProps> = {
            tokens: { childrenGap: 50 },
            styles: { root: { margin: '0 0 15px 0' } }
        };

        const dateStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
            let styles: Partial<IDatePickerStyles> = {}
            if (props.label) {

            }
            return styles;
        }

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
            //isRequiredErrorMessage: 'Field is required.',
            invalidInputErrorMessage: 'Invalid date format.'
        };

        return (
            <div>
                <Stack {...columnProps}>
                    <>
                        <Stack horizontal>
                            <Label style={{ width: "30%" }}>{"Start Date"}</Label>
                            <DatePicker
                                //label={"Start Date"}
                                isRequired={true}
                                value={this.state.startDateValue ? this.state.startDateValue : undefined}
                                firstDayOfWeek={DayOfWeek.Sunday}
                                strings={DayPickerStrings}
                                showMonthPickerAsOverlay={true}
                                placeholder="Select a date"
                                ariaLabel="Select a date"
                                formatDate={newDate => format(newDate, 'yyyy-MM-dd')}
                                onSelectDate={(date) => this.setState({
                                    startDateValue: date
                                })}
                                style={{ width: "70%" }}
                            />
                        </Stack>
                    </>
                    <DatePicker label={'End Date'}
                        className={'dateField-cssStyled'}
                        isRequired
                        value={this.state.endDateValue ? this.state.endDateValue : undefined}
                        onSelectDate={(date: Date) => this.setState({
                            endDateValue: date
                        })}
                        firstDayOfWeek={DayOfWeek.Sunday}
                        strings={DayPickerStrings}
                        showMonthPickerAsOverlay={true}
                        showGoToToday={false}
                        placeholder="Select a date"
                        ariaLabel="Select a date"
                    />
                </Stack>
                <Label>start date json</Label>
                <Text>{JSON.stringify(this.state.startDateValue)}</Text>
                <Label>end date json</Label>
                <Text>{JSON.stringify(this.state.endDateValue)}</Text>
            </div>
        )
    }
}