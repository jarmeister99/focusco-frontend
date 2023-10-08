import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

export type SendMessagePayload = {
  text: string;
  file: File | null | undefined;
  link?: string;
  sendVcf?: boolean;
}

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
  standalone: true,
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    EmojiModule,
    PickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class SendMessageComponent {
  emojiMartVisible: boolean;
  linkInputVisible: boolean;
  inputForm: FormGroup;
  sendMessagePayload: SendMessagePayload;

  @Input() placeholder: string;
  @Input() label: string;
  @Input() width: string;
  @Input() hasEmojiSelector: boolean;
  @Input() hasLinkSelector: boolean;
  @Input() hasMediaSelector: boolean;
  @Input() showMessageCount: boolean;
  @Input() showVcfSendButton: boolean;

  @Output() sendEventEmitter: EventEmitter<SendMessagePayload> = new EventEmitter<SendMessagePayload>();


  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.emojiMartVisible = false;
    this.linkInputVisible = false;
    this.inputForm = this.fb.group({
      inputText: [''],
      inputLink: ['']
    });
    this.sendMessagePayload = {
      text: '',
      file: null,
      link: undefined,
      sendVcf: false
    };
    this.placeholder = 'Type a message';
    this.label = 'Message';
    this.width = '100%'
    this.hasEmojiSelector = true;
    this.hasLinkSelector = true;
    this.hasMediaSelector = false;
    this.showMessageCount = true;
    this.showVcfSendButton = true;
  }

  send() {
    this.sendMessagePayload.text = this.inputForm.get('inputText')?.value;
    this.sendMessagePayload.link = this.inputForm.get('inputLink')?.value;

    this.inputForm.setValue({
      inputText: '',
      inputLink: ''
    });

    this.sendEventEmitter.emit(this.sendMessagePayload);
  }
  sendVcf() {
    const vcfPayload = {
      text: this.inputForm.get('inputText')?.value,
      file: null,
      link: undefined,
      sendVcf: true
    }
    this.inputForm.setValue({
      inputText: '',
      inputLink: ''
    });
    this.sendEventEmitter.emit(vcfPayload);
  }
  addEmoji($event: any) {
    const currentText = this.inputForm.get('inputText')?.value;
    this.inputForm.patchValue({
      inputText: currentText + $event.emoji.native
    });

  }
  onShowEmojiMartClick() {
    this.emojiMartVisible = !this.emojiMartVisible;
  }
  onFileSelected($event: Event) {
    this.sendMessagePayload.file = ($event.target as HTMLInputElement).files?.item(0);
  }
  onRemoveFileClick() {
    this.sendMessagePayload.file = null;
  }

  getNumberOfCharacters() {
    const currentText = this.inputForm.get('inputText')?.value;
    return currentText.length;
  }

  onLinkClick() {
    this.linkInputVisible = !this.linkInputVisible;
  }
}