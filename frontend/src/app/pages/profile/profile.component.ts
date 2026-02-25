import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  loading = true;
  saving = false;
  submitted = false;
  successMsg = '';
  errorMsg = '';
  memberSince = '';

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.userSvc.getProfile().subscribe({
      next: (res) => {
        this.form.patchValue({ name: res.user.name, email: res.user.email });
        this.memberSince = (res.user as any).created_at || '';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Failed to load profile.';
      },
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';
    if (this.form.invalid) return;

    this.saving = true;
    this.userSvc.updateProfile(this.form.value).subscribe({
      next: (res) => {
        this.successMsg = res.message;
        this.saving = false;
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Update failed.';
        this.saving = false;
      },
    });
  }
}
