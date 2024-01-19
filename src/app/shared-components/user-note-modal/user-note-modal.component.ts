import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/prisma.models';
import { EditUserAction } from 'src/app/state/users.actions';

export interface UserNoteModalComponentData {
  user: User;
}

@Component({
  selector: 'app-user-note-modal',
  templateUrl: './user-note-modal.component.html',
  styleUrls: ['./user-note-modal.component.scss']
})
export class UserNoteModalComponent implements OnInit {

  noteForm?: FormGroup;

  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public data: UserNoteModalComponentData, private dialogRef: DialogRef<UserNoteModalComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      note: [this.data.user.adminNote || '']
    });
  }

  submitNote() {
    if (!this.noteForm) return;
    this.store.dispatch(new EditUserAction(this.data.user.id, { adminNote: this.noteForm.value.note })).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
