import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
  Optional,
  Self
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'uct-chip-list-control',
  templateUrl: './chip-list-control.component.html',
  styleUrls: ['./chip-list-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChipListControlComponent
implements OnDestroy, ControlValueAccessor {
  @Input() public placeholder: string = '';
  public focused: boolean = false;
  public inputControl: FormControl = new FormControl();
  public value: string[] = [];
  private onChange: any = noop;
  private onTouched: any = noop;

  public get control(): FormControl | null {
    return this.ngControl ? (this.ngControl.control as FormControl) : null;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private cd: ChangeDetectorRef
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.value = [];
  }

  public ngOnDestroy(): void {
    this.cd.detach();
  }

  public add(input: HTMLInputElement): void {
    const value = input.value;

    if ((value || '').trim()) {
      this.value.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
    this.updateValue(this.value);
  }

  public removeTag(tag: string): void {
    const index = this.value.indexOf(tag);

    if (index >= 0) {
      this.value.splice(index, 1);
    }

    this.updateValue(this.value);
  }

  public removeAll(): void {
    this.value = [];
    this.inputControl.reset('');
    this.updateValue(this.value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: string[]): void {
    if (value && value.length > 0) {
      this.value = value;
    } else {
      this.value = [];
      this.inputControl.reset('');
    }
    this.updateValue(this.value);
  }

  public changeFocus(value: boolean): void {
    if (value !== this.focused) {
      this.focused = value;
    }
  }

  private updateValue(value: string[]): void {
    this.onChange(value);
    this.onTouched();
    this.cd.markForCheck();
  }
}
