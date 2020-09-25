import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IKanbanBoardProps {
    context: WebPartContext;
    listTitle: string;
    webUrl: string;
}
