import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Selectors, State } from '../../state';
import { BlogActions } from '../../state/actions';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent {

  @ViewChild('content')
  private content!: TemplateRef<ElementRef>;

  isLogin!: boolean;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fullname: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  private _modal!: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private store: Store<State>,
  ) {
    this.store.select(Selectors.isModalOpen).subscribe(({ status, isLogin }) => {
      if (status) {
        this.isLogin = isLogin;

        if (isLogin) {
          this.userForm.controls['fullname'].setValidators([]);
        } else {
          this.userForm.controls['fullname'].setValidators([Validators.required, Validators.minLength(4)]);
        }
        this.userForm.controls['fullname'].updateValueAndValidity();



        this._modal = this.modalService.open(this.content, { size: 'lg', centered: true });
        this._modal.dismissed.subscribe(() => {
          this.userForm.reset();
          this.store.dispatch(BlogActions.toggleUserModal({ isLogin }));
        })
      }
    });

    this.store.select(Selectors.getToken).subscribe((token: string | null) => {
      if (!!token) {
        this._modal.dismiss('');
      }
    });

  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  /* ngAfterViewInit() {
    this.store.select(Selectors.isModalOpen).subscribe(({ status, isLogin }) => {
      if (status) {
        this.isLogin = isLogin;
        const modal = this.modalService.open(this.content, { size: 'lg' });
        modal.dismissed.subscribe(() => {
          this.store.dispatch(BlogActions.toggleUserModal({ isLogin }));
        })
      }
    });
  }
 */
  // QUITAR
  openLg(content: TemplateRef<ElementRef>) {
    console.log('cont', content);
		this.modalService.open(content, { size: 'lg' });
	}

  onSubmit() {
    if (!this.userForm.valid) return;

    if (this.isLogin) {
      // console.log(this.userForm.value);
      this.store.dispatch(BlogActions.login({ email: this.userForm.value.email! , password: this.userForm.value.password!}));
    } else {

    }
  }

}
