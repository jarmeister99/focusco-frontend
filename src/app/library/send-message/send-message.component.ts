import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';



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
    MatButtonModule
  ]
})

export class SendMessageComponent {
  emojiMartVisible: boolean;
  inputForm: FormGroup;
  fileSelected: File | null | undefined;

  @Input() placeholder: string;
  @Input() label: string;
  @Input() width: string;
  @Input() hasEmojiSelector: boolean;
  @Input() hasMediaSelector: boolean;


  constructor(private fb: FormBuilder) {
    this.emojiMartVisible = false;
    this.inputForm = this.fb.group({
      inputText: ['']
    });
    this.fileSelected = null;
    this.placeholder = 'Type a message';
    this.label = 'Message';
    this.width = '50em'
    this.hasEmojiSelector = true;
    this.hasMediaSelector = true;
  }

  send() {
    const currentText = this.inputForm.get('inputText')?.value;
    this.inputForm.setValue({
      inputText: ''
    });
    console.log(currentText);
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
    this.fileSelected = ($event.target as HTMLInputElement).files?.item(0);
    console.log(this.fileSelected);
  }
  onRemoveFileClick() {
    this.fileSelected = null;
  }
}
