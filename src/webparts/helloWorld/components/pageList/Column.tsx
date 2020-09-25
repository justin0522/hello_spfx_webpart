import * as React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IBeforeAndAfterContext } from "mocha";
import AveDocumentCard, {IAveDocumentCardProps} from '../aveDocumentCard/aveDocumentCard';
import { mergeStyles, mergeStyleSets, Label, Text, FontSizes } from 'office-ui-fabric-react';

export interface IColumnProps {
    items: IAveDocumentCardProps[];
    dragOverHandler(event: any): void;
    dropHandler(event: any): void;
    onCheckboxChange: (itemId: string, checked: boolean) => void;
}

export default class Column extends React.Component<IColumnProps, {}> {
    constructor(props: IColumnProps) {
        super(props);
    }

    public render() {
        const style = {
            border: '2px solid #ccc',
            height: '500px'
        };

        // const element = this.props.children.map(item => {
        //     return <AveDocumentCard itemId={item.itemId} category={item.category} previewImageSrc={item.previewImageSrc} description={item.description} modifiedon={item.modifiedon} />
        // });
        const headerClass = mergeStyles({
            backgroundColor: 'goldenrod',
            color: 'white',
            padding: '10px'
        });

        return (
            <div style={this.getColumnStyle()}>
                <Label className={headerClass}>The Selected Content</Label>
                <DragDropContext onDragEnd={this.props.dropHandler}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}
                                style={this.getListStyle(snapshot.isDraggingOver)}
                            >
                                {this.props.items.map((item, index) => (
                                    <Draggable key={item.itemId.toString()} draggableId={item.itemId.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            // style={getItemStyle(
                                            //     snapshot.isDragging,
                                            //     provided.draggableProps.style
                                            // )}
                                            >
                                                <AveDocumentCard itemId={item.itemId} category={item.category} previewImageSrc={item.previewImageSrc} description={item.description} modifiedon={item.modifiedon}
                                                    onCheckboxChange={this.props.onCheckboxChange} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
    private reorder = (list, startIndex, endIndex) => {
        const result = list; //Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    private onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        // const items = this.reorder(
        //     this.state.items,
        //     result.source.index,
        //     result.destination.index
        // );

        // this.setState({
        //     items
        // });
    }

    private getColumnStyle = () => {
        return {

            border: '1px solid grey'
        }
    }

    private getListStyle = (isDraggingOver: boolean) => {
        return {
            //background: isDraggingOver ? "lightblue" : "lightgrey",
            padding: 8,
            //border: '1px solid grey'
        }
    }

}

export interface IColumnLeftProps {
    items: any[];
    onCheckboxChange: (itemId: string, checked: boolean) => void;
}

export class ColumnLeft extends React.Component<IColumnLeftProps, {}>{
    constructor(props: IColumnLeftProps) {
        super(props);
    }

    public render() {
        const headerClass = mergeStyles({
            backgroundColor: 'goldenrod',
            color: 'white',
            padding: '10px'
        });

        return (
            <div style={this.getColumnStyle()}>
                <Label className={headerClass}>User to Select Content from this Panel</Label>
                <div style={this.getListStyle()} >
                    {this.props.items.map((item, index) => (
                        <div
                        // style={getItemStyle(
                        //     snapshot.isDragging,
                        //     provided.draggableProps.style
                        // )}
                        >
                            <AveDocumentCard itemId={item.itemId} category={item.category} previewImageSrc={item.previewImageSrc} description={item.description} modifiedon={item.modifiedon}
                                onCheckboxChange={this.props.onCheckboxChange} />
                        </div>
                    ))}

                </div>
            </div>
        )
    }

    private getColumnStyle = () => {
        return {

            border: '1px solid grey'
        }
    }

    private getListStyle = () => {
        return {
            //background: isDraggingOver ? "lightblue" : "lightgrey",
            padding: 8,
            //border: '1px solid grey'
        }
    }
}