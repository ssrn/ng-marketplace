import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-product-actions',
  templateUrl: './my-product-actions.component.html',
  styleUrls: ['./my-product-actions.component.scss']
})
export class MyProductActionsComponent {
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() publish: EventEmitter<any> = new EventEmitter();
  @Output() unpublish: EventEmitter<any> = new EventEmitter();
  @Input() productId: string;
  @Input() isPublished: boolean;

  constructor(private toastr: ToastrService) {}

  get publishBtnText(): string {
    return this.isPublished ? 'Снять с публикации' : 'Опубликовать';
  }

  handleRemove() {
    if (confirm('Вы уверены, что хотите удалить товар?')) {
      this.remove.emit(null);
    }
  }

  unpublishHandle() {
    this.unpublish.emit(null);
  }

  publishHandle() {
    this.publish.emit(null);
  }

  handlePublish() {
    return this.isPublished ? this.unpublishHandle() : this.publishHandle();
  }
}
