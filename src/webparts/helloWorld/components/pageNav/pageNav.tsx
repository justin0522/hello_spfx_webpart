import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem, IDividerAsProps } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class PageNav extends React.Component<{}, {}>{

    public render() {
        const itemsWithHeading: IBreadcrumbItem[] = [
            { text: 'FEOnet', key: 'FEOnet', onClick: this._onBreadcrumbItemClicked },
            { text: 'Social and Community', key: 'social', onClick: this._onBreadcrumbItemClicked },
            // Generally, only the last item should ever be a heading.
            // It would typically be h1 or h2, but we're using h4 here to better fit the structure of the page.
            { text: 'Email a news digest', key: 'digest', isCurrentItem: true },
        ];

        return (<div style={{ marginBottom: '30px' }}>
            <Breadcrumb
                items={itemsWithHeading}
                maxDisplayedItems={3}
                ariaLabel="With custom rendered divider and overflow icon"
                dividerAs={this._getCustomDivider}
                onRenderOverflowIcon={this._getCustomOverflowIcon}
                overflowAriaLabel="More links"
            />
        </div>)
    }

    private _onBreadcrumbItemClicked = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void => {
        console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
    }

    private _getCustomDivider = (dividerProps: IDividerAsProps): JSX.Element => {
        const tooltipText = dividerProps.item ? dividerProps.item.text : '';
        return (
            <TooltipHost content={`Show ${tooltipText} contents`} calloutProps={{ gapSpace: 0 }}>
                <span aria-hidden="true" style={{ cursor: 'pointer', padding: 5 }}>
                    /
            </span>
            </TooltipHost>
        );
    }

    private _getCustomOverflowIcon = (): JSX.Element => {
        return <Icon iconName={'ChevronDown'} />;
    }
}