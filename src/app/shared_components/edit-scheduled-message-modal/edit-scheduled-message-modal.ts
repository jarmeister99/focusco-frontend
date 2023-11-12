
import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { EditScheduledMessageAction } from 'src/app/state/scheduledMessages.state';
import { MessageCreatorFormPayload } from '../message-creator/message-creator.component';

export interface EditScheduledMessageFormPayload {
    messageId: number,
    body: string;
    mediaUrl: string;
    triggerAt: Date;
    receiverName: string,
}

@Component({
    selector: 'app-edit-scheduled-message-modal',
    templateUrl: './edit-scheduled-message-modal.html',
    styleUrls: ['./edit-scheduled-message-modal.scss']
})
export class EditScheduledMessageModalComponent {
    dateFormControl: FormControl;

    constructor(private dialog: DialogRef, private store: Store, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: EditScheduledMessageFormPayload) {
        this.dateFormControl = new FormControl(data.triggerAt);
    }

    onClick(payload: MessageCreatorFormPayload) {
        const editScheduledMessagePayload = {
            body: payload.body,
            mediaUrl: payload.mediaUrl,
            triggerAt: this.dateFormControl.value,
        }
        this.store.dispatch(new EditScheduledMessageAction(this.data.messageId, editScheduledMessagePayload)).subscribe(() => {
            this.dialog.close();
        });
    }
};
