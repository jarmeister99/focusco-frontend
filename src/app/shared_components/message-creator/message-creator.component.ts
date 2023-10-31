import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message-creator',
  templateUrl: './message-creator.component.html',
  styleUrls: ['./message-creator.component.scss']
})
export class MessageCreatorComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;

  // create a ref for a html element within this component named emojiMart
  @ViewChild('emojiMart', { static: false, read: ElementRef }) emojiMart: any;

  public linkInputVisible: boolean;
  public emojiMartVisible: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      body: '',
      mediaUrl: '',
    });
    this.linkInputVisible = false;
    this.emojiMartVisible = false;
  }

  isFormValid() {
    return !!this.formGroup.value.body || !!this.formGroup.value.mediaUrl;
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.onClick.emit(this.formGroup.value);
      this.formGroup.reset();
    }
  }

  addEmoji($event: any) {
    const currentText = this.formGroup.get('body')?.value;
    this.formGroup.patchValue({
      body: currentText + $event.emoji.native
    });

  }
  onShowEmojiMartClick() {
    this.emojiMartVisible = !this.emojiMartVisible;
  }
  onLinkClick() {
    this.linkInputVisible = !this.linkInputVisible;
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (this.emojiMartVisible && this.emojiMart && !this.emojiMart.nativeElement.contains(event.target)) {
      // clicked outside => close dropdown list
      this.emojiMartVisible = false;
    }
  }
};
